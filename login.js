document.addEventListener('DOMContentLoaded', function() {
  console.log('Script loaded successfully');  // デバッグメッセージ

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
      loginForm.addEventListener('submit', function(event) {
          event.preventDefault();
          console.log('Form submitted');  // デバッグメッセージ

          // メールアドレスとパスワードを取得
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          // 簡単な検証 (必要に応じてサーバーサイドの認証を追加してください)
          if (email === 'test@example.com' && password === 'password') {
              // 認証に成功した場合、index.htmlにリダイレクト
              console.log('Authentication successful');  // デバッグメッセージ
              window.location.href = '/';
          } else {
              // 認証に失敗した場合、エラーメッセージを表示
              console.log('Authentication failed');  // デバッグメッセージ
              alert('メールアドレスまたはパスワードが正しくありません。');
          }
      });
  } else {
      console.error('Login form not found');  // デバッグメッセージ
  }
});
