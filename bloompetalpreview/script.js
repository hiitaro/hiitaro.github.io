const FLAGS = {en:{flag:'🇷🇺',label:'RU'},ru:{flag:'🇺🇸',label:'EN'}};
  let lang='en';
  const langBtn=document.getElementById('langBtn');
  function applyLang(){
    document.querySelectorAll('.t').forEach(el=>{const v=el.getAttribute('data-'+lang);if(v)el.innerHTML=v});
    document.getElementById('langFlag').textContent=FLAGS[lang].flag;
    document.getElementById('langLabel').textContent=FLAGS[lang].label;
    document.documentElement.lang=lang;
  }
  langBtn.addEventListener('click',()=>{lang=lang==='en'?'ru':'en';applyLang()});

  const nav=document.getElementById('mainNav');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const pGrid=document.querySelector('.pricing-grid');
  const pCards=document.querySelectorAll('.price-card');
  let pDone=false;
  new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting&&!pDone){
        pDone=true;
        pCards.forEach((c,i)=>setTimeout(()=>c.classList.add('visible'),i*150));
      }
    });
  },{threshold:.15}).observe(pGrid);

  async function handleSubmit(){
    const n = document.getElementById('fname').value.trim();
    const c = document.getElementById('fcontact').value.trim();
    const msg = document.getElementById('fmsg').value.trim();

    if(!n || !c){
      alert(lang==='en' ? 'Please fill in name and contact.' : 'Заполните имя и контакт.');
      return;
    }

    const btn = document.getElementById('fsubmit');
    btn.disabled = true;
    btn.textContent = lang==='en' ? 'Sending...' : 'Отправляем...';
    document.getElementById('ferror').style.display = 'none';

    const res = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.web3forms.com/submit');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = () => reject();
      xhr.send(JSON.stringify({
        access_key: '51874093-cf73-4121-b46b-9413ee52859a',
        name: n,
        email: c,
        message: msg
      }));
    });

    const data = res;

    if(data.success){
      btn.style.display = 'none';
      const conf = document.getElementById('fconfirm');
      conf.style.display = 'block';
      conf.innerHTML = lang==='en' ? "✓ Got it! I'll be in touch soon." : '✓ Получил! Скоро свяжусь с вами.';
    } else {
      btn.disabled = false;
      btn.textContent = lang==='en' ? 'Send message' : 'Отправить';
      const err = document.getElementById('ferror');
      const isSpam = data.message && data.message.toLowerCase().includes('spam');
      if(lang === 'en') {
        err.innerHTML = isSpam
          ? '<span class="form-error-icon">🚫</span>Your message was flagged as spam by the server.<span class="form-error-hint">Try rephrasing your message, or reach out directly via email or Telegram.</span>'
          : '<span class="form-error-icon">⚠️</span>Something went wrong. Please try again.<span class="form-error-hint">If the issue persists, contact me directly.</span>';
      } else {
        err.innerHTML = isSpam
          ? '<span class="form-error-icon">🚫</span>Сервер пометил сообщение как спам.<span class="form-error-hint">Попробуйте перефразировать текст или напишите напрямую — через email или Telegram.</span>'
          : '<span class="form-error-icon">⚠️</span>Что-то пошло не так. Попробуйте ещё раз.<span class="form-error-hint">Если проблема не исчезнет — напишите напрямую.</span>';
      }
      err.style.display = 'block';
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}
    });
  });

  function animateCountUp(el) {
    const raw = el.textContent.trim();
    const prefix = raw.match(/^[^0-9]*/)[0];
    const suffix = raw.match(/[^0-9]*$/)[0];
    const target = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    if (!target) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    }
    requestAnimationFrame(tick);
  }
  const statSection = document.querySelector('.stat-grid');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(animateCountUp);
        statObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statObserver.observe(statSection);