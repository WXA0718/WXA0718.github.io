from flask import Flask, render_template, request, redirect, url_for, flash
import json
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = 'your_secret_key'
data_file = 'data.json'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    detail = db.Column(db.String(100))
    due = db.Column(db.DateTime, nullable=False)

# データを保存する関数
def save_data(data):
    with open(data_file, 'w') as f:
        json.dump(data, f)

# データを読み込む関数
def load_data():
    if os.path.exists(data_file):
        with open(data_file, 'r') as f:
            return json.load(f)
    return {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/input')
def input_page():
    return render_template('input.html')

@app.route('/detection',methods=['GET', 'POST'])
def detection_page():
    data = load_data()
    return render_template('detection.html', data=data)

@app.route('/HB')
def HB_page():
    return render_template('HB.html')

@app.route('/contact')
def contact_page():
    return render_template('contact.html')

@app.route('/service')
def service_page():
    return render_template('service.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/history')
def history_page():
    data = load_data()
    return render_template('history.html', data=data)

@app.route('/recruitment')
def recruitment_page():
    data = load_data()
    return render_template('recruitment.html', data=data)

@app.route('/save', methods=['POST'])
def save():
    date = request.form['date']
    meal_type = request.form['mealType']
    description = request.form['description']
    calories = request.form['calories']
    protein = request.form['protein']
    fat = request.form['fat']

    data = load_data()
    if date not in data:
        data[date] = {}
    data[date][meal_type] = {
        'description': description,
        'calories': calories,
        'protein': protein,
        'fat': fat
    }

    save_data(data)
    flash('データが保存されました。')
    return redirect(url_for('detection_page'))

if __name__ == '__main__':
    app.run(debug=True)
