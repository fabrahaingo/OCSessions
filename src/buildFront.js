function addGlobalStyle() {
  const style = document.createElement('style')
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
    `
  document.head.appendChild(style)
}

function createTableHead(table, lang) {
  const headContent = `
    <thead>
      <tr>
        <td>${configText[lang].date}</td>
        <td>${configText[lang].status}</td>
        <td>${configText[lang].actions}</td>
      </tr>
    </thead>
  `
  table.innerHTML = headContent
}

function createTableBody(table, lang, sessions) {
  let bodyContent = '<tbody>'
  let dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  let localLang = `${lang}-${lang.toUpperCase()}`;
  for (let elem of sessions) {
    let sessionDate = new Date(elem.sessionDate)
    let dayMonthYear = sessionDate.toLocaleDateString(localLang, dateOptions)
    let hour = sessionDate.getHours()
    let minute = sessionDate.getMinutes() || '00'
    let sessionContent = `<tr>
      <td>${dayMonthYear} ${configText[lang].hour} ${hour}:${minute}</td>
      <td>${configText[lang][elem.status]}</td>
      <td><a href="/fr/mentorship/sessions/${elem.id}" class="see-session-button">${configText[lang].consult}</a></td>
      </tr>
    `
    bodyContent += sessionContent
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
