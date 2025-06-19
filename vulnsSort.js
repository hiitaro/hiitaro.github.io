const sortDate = document.getElementById('sort-date');
const sortVulns = document.getElementById('sort-vulns');
const sortDomain = document.getElementById('sort-domain');
const worksGrid = document.querySelector('.works-grid');
const clearVulns = document.getElementById('clear-vulns');

function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function getVulns(card) {
  const vulnsEl = card.querySelector('#vulns');
  if (!vulnsEl) return 0;
  const match = vulnsEl.textContent.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function getDomain(card) {
  const domainEl = card.querySelector('#domen');
  return domainEl ? domainEl.textContent.trim().toLowerCase() : '';
}

function getDate(card) {
  const dateEl = card.querySelector('#workDate');
  return dateEl ? parseDate(dateEl.textContent.trim()) : new Date(0);
}

// Собираем все уникальные домены и заполняем выпадающий список
function fillDomainSelect() {
  const cards = Array.from(worksGrid.children);
  const domains = new Set();
  cards.forEach(card => {
    const domain = getDomain(card);
    if (domain) domains.add('.' + domain);
  });
  // Очистить и добавить "All domains"
  sortDomain.innerHTML = '<option value="all">All domains</option>';
  Array.from(domains).sort().forEach(domain => {
    const opt = document.createElement('option');
    opt.value = domain;
    opt.textContent = domain;
    sortDomain.appendChild(opt);
  });
}

function sortAndFilterWorks() {
  let cards = Array.from(worksGrid.children);

  // Фильтрация по домену
  const selectedDomain = sortDomain.value;
  cards.forEach(card => {
    const domain = getDomain(card);
    card.style.display = (selectedDomain === 'all' || domain === selectedDomain) ? '' : 'none';
  });

  // Сортировка: только одна активна (date или vuln)
  if (sortVulns.value !== 'none') {
    cards.sort((a, b) => {
      if (sortVulns.value === 'vulns-desc') {
        return getVulns(b) - getVulns(a);
      } else {
        return getVulns(a) - getVulns(b);
      }
    });
  } else if (sortDate.value !== 'none') {
    cards.sort((a, b) => {
      if (sortDate.value === 'date-desc') {
        return getDate(b) - getDate(a);
      } else {
        return getDate(a) - getDate(b);
      }
    });
  }

  // Перерисовать карточки (только видимые)
  cards.forEach(card => worksGrid.appendChild(card));
}

// Сброс сортировки по vuln
clearVulns.onclick = () => {
  sortVulns.value = 'none';
  if (sortDate.value === 'none') sortDate.value = 'date-desc';
  sortAndFilterWorks();
};

// Взаимное отключение сортировок
sortDate.onchange = () => {
  if (sortDate.value !== 'none') sortVulns.value = 'none';
  sortAndFilterWorks();
};
sortVulns.onchange = () => {
  if (sortVulns.value !== 'none') sortDate.value = 'none';
  sortAndFilterWorks();
};
sortDomain.onchange = sortAndFilterWorks;

// Инициализация
if (sortDate && sortVulns && sortDomain && worksGrid) {
  fillDomainSelect();
  // По умолчанию: сортировка по последней дате, без сортировки по vuln, фильтр all domains
  sortDate.value = 'date-desc';
  sortVulns.value = 'none';
  sortDomain.value = 'all';
  sortAndFilterWorks();
}
