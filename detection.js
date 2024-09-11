async function showMealOptions(mealType) {
    const optionsElement = document.getElementById(`${mealType}-options`);
    optionsElement.innerHTML = '読み込み中...';

    const API_KEY = 'bzzWtOJdGQC45cvejQoVlkrr167QZYP5xVkcXYrK'; // 取得したAPIキーをここに記入
    const query = mealType; // クエリとして食事タイプを使用

    try {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=10&api_key=${API_KEY}`);
        const data = await response.json();

        if (data.foods) {
            optionsElement.innerHTML = data.foods.map(item => {
                const energy = item.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy');
                const protein = item.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein');
                const fat = item.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)');
                
                return `
                    <div class="meal-option">
                        <p>食品名: ${item.description}</p>
                        <p>カロリー: ${energy ? energy.value + ' ' + energy.unitName : 'N/A'}</p>
                        <p>タンパク質: ${protein ? protein.value + ' ' + protein.unitName : 'N/A'}</p>
                        <p>脂質: ${fat ? fat.value + ' ' + fat.unitName : 'N/A'}</p>
                        <button type="button" onclick="selectMeal('${mealType}', '${item.description}', ${energy ? energy.value : 'N/A'}, ${protein ? protein.value : 'N/A'}, ${fat ? fat.value : 'N/A'})">選択</button>
                    </div>
                `;
            }).join('');
        } else {
            optionsElement.textContent = 'データが見つかりません';
        }
    } catch (error) {
        console.error('Error:', error);
        optionsElement.textContent = 'エラーが発生しました';
    }
}

function selectMeal(mealType, name, calories, protein, fat) {
    const optionsElement = document.getElementById(`${mealType}-options`);
    optionsElement.innerHTML = `
        食品名: ${name}<br>
        カロリー: ${calories} kcal<br>
        タンパク質: ${protein} g<br>
        脂質: ${fat} g
    `;
}

document.getElementById('meal-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const breakfastCalories = parseFloat(document.getElementById('breakfast-options').querySelector('.meal-option p').innerText.split(': ')[1]) || 0;
    const lunchCalories = parseFloat(document.getElementById('lunch-options').querySelector('.meal-option p').innerText.split(': ')[1]) || 0;
    const dinnerCalories = parseFloat(document.getElementById('dinner-options').querySelector('.meal-option p').innerText.split(': ')[1]) || 0;

    const totalCalories = breakfastCalories + lunchCalories + dinnerCalories;

    // ローカルストレージに保存
    localStorage.setItem('totalCalories', totalCalories);

    // ダッシュボードにリダイレクト
    window.location.href = 'index.html';
});
