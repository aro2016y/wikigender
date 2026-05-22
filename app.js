const data = window.SITE_DATA;

function fmt(value, digits = 1) {
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  if (Math.abs(n) >= 1000) return Math.round(n).toLocaleString('en-US');
  return n.toFixed(digits).replace(/\.0$/, '');
}

function shortNumber(value) {
  const n = Number(value);
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return String(n);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function renderResultsTable() {
  const tbody = document.querySelector('#resultTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  data.bonferroni.forEach(row => {
    const tr = document.createElement('tr');
    const sig = row.significant_bonferroni;
    tr.innerHTML = `
      <td>${row.category}</td>
      <td>${String(row.metric).replaceAll('_', ' ')}</td>
      <td>${fmt(row.observed_women_minus_men, 2)}<br><small>${row.direction}</small></td>
      <td>${Number(row.p_value_two_sided).toFixed(4)}</td>
      <td><span class="badge ${sig ? 'hit' : ''}">${sig ? 'passes' : 'no'}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function boot() {
  setText('statArticles', data.summary.articles);
  setText('statFields', data.summary.fields);
  setText('statPerGroup', data.summary.perFieldGender);
  setText('womenArticles', data.summary.womenArticles);
  setText('menArticles', data.summary.menArticles);
  setText('womenWords', shortNumber(data.theme.find(r => r.gender === 'women')?.cleanWords || data.summary.wordsByGender.women));
  setText('menWords', shortNumber(data.theme.find(r => r.gender === 'men')?.cleanWords || data.summary.wordsByGender.men));
  renderResultsTable();
}

document.addEventListener('DOMContentLoaded', boot);