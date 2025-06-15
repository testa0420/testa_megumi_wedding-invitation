document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  const heroTitle = document.getElementById('heroTitle');
  const heroDate = document.getElementById('heroDate');
  const enterButton = document.getElementById('enterButton'); // 「押」ボタン要素
  const contentScreen = document.getElementById('contentScreen');
  const toggleInvert = document.getElementById('toggle-invert');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const sections = document.querySelectorAll('.section'); // 全てのコンテンツセクションを取得

  // ヒーロータイトルは引き続き各文字をspanで囲む
  heroTitle.innerHTML = heroTitle.textContent.split('').map(char => `<span class="char">${char === ' ' ? ' ' : char}</span>`).join('');
  // heroDateは単一要素として扱うため、span.charで囲む処理は引き続き不要


  // ヒーローセクション全体をクリック可能にする
  hero.addEventListener('click', () => {
    hero.classList.add('clicked'); // ヒーロー要素にクリックされたことを示すクラスを追加

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