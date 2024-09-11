document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('data-input-form');

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const date = document.getElementById('date').value;
      const weight = parseFloat(document.getElementById('weights').value);
      const bodyFat = parseFloat(document.getElementById('bodyFats').value);
      const steps = parseInt(document.getElementById('steps').value);
      const calories = parseFloat(document.getElementById('calories').value);

      const data = JSON.parse(localStorage.getItem('healthData')) || {};

      data[date] = {
          weight: weight,
          bodyFat: bodyFat,
          steps: steps,
          calories: calories
      };

      localStorage.setItem('healthData', JSON.stringify(data));

      alert('データが保存されました。マイページに戻ってデータを確認してください。');
  });
});
