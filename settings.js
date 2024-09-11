document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('settings-form');
  const settingsToggle = document.getElementById('settings-toggle');
  const settingsContent = document.getElementById('settings-content');

  // フォームの初期値を設定
  document.getElementById('username').value = localStorage.getItem('username') || 'フィットレ 太郎';
  document.getElementById('basicInfo').value = localStorage.getItem('basicInfo') || '';

  // プロフィール画像の初期表示
  const savedProfileImage = localStorage.getItem('profileImage');
  if (savedProfileImage) {
      document.getElementById('profile-image').src = savedProfileImage;
  }

  // 名前の初期表示
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
      document.getElementById('profile-name').textContent = savedUsername;
  }

  // フォームの送信処理
  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const basicInfo = document.getElementById('basicInfo').value;

      localStorage.setItem('username', username);
      localStorage.setItem('basicInfo', basicInfo);

      if (password) {
          localStorage.setItem('password', password);
          alert('パスワードが変更されました。');
      }

      // 名前の変更を反映
      document.getElementById('profile-name').textContent = username;

      // プロフィール画像の変更を反映
      const profileImageInput = document.getElementById('profileImage');
      if (profileImageInput.files && profileImageInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
              localStorage.setItem('profileImage', e.target.result);
              document.getElementById('profile-image').src = e.target.result;
          };
          reader.readAsDataURL(profileImageInput.files[0]);
      }

      alert('設定が保存されました。');
  });

  settingsToggle.addEventListener('click', function () {
      if (settingsContent.style.display === 'none') {
          settingsContent.style.display = 'block';
          settingsToggle.textContent = '▲';
      } else {
          settingsContent.style.display = 'none';
          settingsToggle.textContent = '▼';
      }
  });
});
