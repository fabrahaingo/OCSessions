function addGlobalStyle() {
  const style = document.createElement('style');
  style.innerHTML = `
      .see-session-button {
        background-color: #7451eb !important;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        text-transform: uppercase;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 20%);
        text-decoration: none;
        transition: all 0.3s;
      }
      .see-session-button:hover {
        box-shadow: 0 6px 6px 0 rgb(0 0 0 / 26%), 0 10px 20px 0 rgb(0 0 0 / 19%);
        color: white;
        transition: all 0.3s;
      }
      .customTitle {
        margin-top: 40px;
      }
    `;
  document.head.appendChild(style);
}

function createTitle(anchor, lang) {
  let h1 = document.createElement('h1');
  h1.classList.add('secondTitle', 'customTitle');
  h1.innerText = lang.title;
  anchor.insertBefore(h1, null);
}

function createTableHead(table, lang) {
  const headContent = `
    <thead>
      <tr>
        <td>${lang.date}</td>
        <td>${lang.status}</td>
        <td>${lang.actions}</td>
      </tr>
    </thead>
  `;
  table.innerHTML = headContent;
}

function createTableBody(table, lang, sessions) {
  let bodyContent = '<tbody>';
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  for (let elem of sessions) {
    let sessionDate = new Date(elem.sessionDate);
    let dayMonthYear = sessionDate.toLocaleDateString(lang.localLang, dateOptions);
    let time = sessionDate.toLocaleTimeString(lang.localLang, timeOptions);
    let sessionContent = `<tr>
      <td>${dayMonthYear} ${lang.hour} ${time}</td>
      <td>${lang.statusText[elem.status] ?? elem.status}</td>
      <td><a href="/fr/mentorship/sessions/${elem.id}" class="see-session-button">${lang.consult}</a></td>
      </tr>
    `;
    bodyContent += sessionContent;
  }
  bodyContent += '</tbody>'
  table.innerHTML += bodyContent
}

function createSessionsTable(sessions, anchor, lang) {
  let table = document.createElement('table')
  table.classList.add('crud-list')
  anchor.insertBefore(table, null)
  createTableHead(table, lang)
  createTableBody(table, lang, sessions)
}
