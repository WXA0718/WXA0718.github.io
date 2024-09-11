document.getElementById('more-btn').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  document.querySelector('.hero-overlay').style.display = 'none';
  document.querySelector('.hero-content').style.background = 'none';
});

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// フェードインアニメーションを適用する関数
function checkFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(element => {
      if (isElementInViewport(element)) {
          element.classList.add('visible');
      }
  });
}

// スクロールイベントリスナーを追加
window.addEventListener('scroll', checkFadeIn);
window.addEventListener('resize', checkFadeIn);

// 初期表示のためにページロード時にもチェック
window.addEventListener('load', checkFadeIn);

// ロゴの表示
window.addEventListener('load', function() {
  $("#splash").delay(1500).fadeOut('slow'); // ローディング画面を1.5秒待機してからフェードアウト
  $("#splash_logo").delay(1200).fadeOut('slow'); // ロゴを1.2秒待機してからフェードアウト
});

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 100) { // 上から100pxスクロールしたら
      $('#page-top').removeClass('DownMove'); // #page-topについているDownMoveというクラス名を除く
      $('#page-top').addClass('UpMove'); // #page-topについているUpMoveというクラス名を付与
  } else {
      if ($('#page-top').hasClass('UpMove')) { // すでに#page-topにUpMoveというクラス名がついていたら
          $('#page-top').removeClass('UpMove'); // UpMoveというクラス名を除き
          $('#page-top').addClass('DownMove'); // DownMoveというクラス名を#page-topに付与
      }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime(); // スクロールした際の動きの関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  PageTopAnime(); // スクロールした際の動きの関数を呼ぶ
});

// #page-topをクリックした際の設定
$('#page-top a').click(function () {
  $('body,html').animate({
      scrollTop: 0
  }, 500); // スクロールの速さ。数字が大きくなるほど遅くなる
  return false; // リンク自体の無効化
});