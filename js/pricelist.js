(function(){
  const SHEET_JSON = 'https://docs.google.com/spreadsheets/d/1dGgeaCOek04YqBndKAIeCTmKdtSUPH_-kwb0TWIx09Y/gviz/tq?tqx=out:json&gid=588667145';
  const table = document.getElementById('price-table');
  if(!table) return;
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');
  const searchInput = document.getElementById('price-search');
  const updatedEl = document.getElementById('price-updated');

  function parseGViz(jsonText){
    const prefix = '/*O_o*/\ngoogle.visualization.Query.setResponse(';
    const suffix = ');';
    const s = jsonText.trim();
    const data = s.substring(prefix.length, s.length - suffix.length);
    return JSON.parse(data);
  }

  function createCell(html){
    const td = document.createElement('td');
    td.innerHTML = html == null ? '' : html;
    return td;
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  function render(json){
    const cols = json.table.cols.map(c => (c.label || c.id || '').trim());
    const headRow = document.createElement('tr');
    cols.forEach(label => {
      const th = document.createElement('th');
      th.textContent = label || '';
      headRow.appendChild(th);
    });
    thead.innerHTML = '';
    thead.appendChild(headRow);

    const rows = json.table.rows.map(r => (r.c || []).map(c => c ? (c.f || c.v) : ''));
    tbody.innerHTML = '';

    rows.forEach(r => {
      const tr = document.createElement('tr');
      r.forEach((val, idx) => {
        if(idx === 0){
          const v = val || '';
          let html = '';
          if(/^https?:\/\//i.test(v)){
            html = `<a href="${escapeHtml(v)}" target="_blank" rel="noopener">ссылка</a>`;
          }else{
            html = escapeHtml(v);
          }
          tr.appendChild(createCell(html));
        } else {
          tr.appendChild(createCell(escapeHtml(val || '')));
        }
      });
      tbody.appendChild(tr);
    });

    if(updatedEl){
      const d = new Date();
      updatedEl.textContent = `Прайс загружен и обновлён: ${d.toLocaleDateString('ru-RU')} ${d.toLocaleTimeString('ru-RU')}`;
    }

    if(searchInput){
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        const trs = tbody.querySelectorAll('tr');
        trs.forEach(tr => {
          const text = tr.textContent.toLowerCase();
          tr.style.display = text.includes(q) ? '' : 'none';
        });
      });
    }
  }

  fetch(SHEET_JSON)
    .then(r => r.text())
    .then(t => render(parseGViz(t)))
    .catch(err => {
      console.error('Ошибка загрузки прайса:', err);
      if(updatedEl){
        updatedEl.textContent = 'Не удалось загрузить прайс. Попробуйте обновить страницу.';
      }
    });
})();