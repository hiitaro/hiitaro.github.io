const btn = document.getElementById('theme-toggle');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
  btn.textContent = '☀️';
}
btn.onclick = () => {
  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    btn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    btn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
};