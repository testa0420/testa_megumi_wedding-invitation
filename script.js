document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  const heroTitle = document.getElementById('heroTitle');
  const heroDate = document.getElementById('heroDate');
  // const scrollHint = document.getElementById('scrollHint'); // 削除
  const contentScreen = document.getElementById('contentScreen');
  const toggleInvert = document.getElementById('toggle-invert');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const sections = document.querySelectorAll('.section'); // 全てのコンテンツセクションを取得

  // ヒーロータイトルと日付の文字を分割してアニメーション用にspanで囲む
  heroTitle.innerHTML = heroTitle.textContent.split('').map(char => `<span class="char">${char === ' ' ? ' ' : char}</span>`).join('');
  heroDate.innerHTML = heroDate.textContent.split('').map(char => `<span class="char">${char === ' ' ? ' ' : char}</span>`).join('');


  // ヒーロークリック時にフェードアウト → コンテンツ表示 → 色反転ボタンを表示
  hero.addEventListener('click', () => {
    // ヒーロー要素にクリックされたことを示すクラスを追加
    // これによりCSSのtransitionが発火し、ヒーローが非表示になるアニメーションが始まる
    hero.classList.add('clicked');

    // スクロールヒントを非表示にする処理は不要になったため削除
    // if (scrollHint) { //念のためチェック
    //   scrollHint.style.opacity = '0';
    // }

    // ヒーローのトランジションが完了するのを待つ (CSSのtransition durationに合わせる)
    setTimeout(() => {
      hero.style.display = 'none'; // ヒーローを完全に非表示にする

      // コンテンツ画面を表示
      contentScreen.style.display = 'block';
      setTimeout(() => {
        contentScreen.style.opacity = '1'; // フェードイン
        toggleInvert.style.display = 'block'; // 色反転ボタンを表示
      }, 50); // 微妙な遅延でスムーズな表示
    }, 1500); // heroのopacityとfilterのtransitionが完了する時間 (1.5秒)
  });

  // Intersection Observer でセクションの表示を制御
  const observerOptions = {
    root: null, // ビューポートをルートとする
    rootMargin: '0px',
    threshold: 0.1 // 10%が見えたら発火
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 一度表示されたら監視を停止
      }
    });
  }, observerOptions);

  // 各セクションを監視対象に追加
  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  // 白黒反転ボタン
  toggleInvert.addEventListener('click', (e) => {
    e.stopPropagation(); // イベントのバブリングを防ぐ
    document.body.classList.toggle('inverted');
  });

  // BACK TO TOP ボタン
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});