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

function createTableHead(table) {
  const headContent = `
    <thead>
      <tr>
        <td>Date de session</td>
        <td>Statut</td>
        <td>Actions</td>
      </tr>
    </thead>
  `
  table.innerHTML = headContent
}

function createTableBody(table, sessions) {
  let bodyContent = '<tbody>'
  let dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  for (let elem of sessions) {
    let sessionDate = new Date(elem.sessionDate)
    let dayMonthYear = sessionDate.toLocaleDateString('fr-FR', dateOptions)
    let hour = sessionDate.getHours()
    let minute = sessionDate.getMinutes() || '00'
    let sessionContent = `<tr>
      <td>${dayMonthYear} à ${hour}:${minute}</td>
      <td>${elem.status}</td>
      <td><a href="/fr/mentorship/sessions/${elem.id}" class="see-session-button">Consulter</a></td>
      </tr>
    `
    bodyContent += sessionContent
  }
  bodyContent += '</tbody>'
  table.innerHTML += bodyContent
}

function createSessionsTable(sessions, anchor) {
  let h1 = document.createElement('h1')
  let table = document.createElement('table')

  h1.classList.add('secondTitle', 'customTitle')
  table.classList.add('crud-list')
  h1.innerText = 'Historique de mes sessions de mentorat'

  anchor.insertBefore(h1, null)
  anchor.insertBefore(table, null)

  createTableHead(table)
  createTableBody(table, sessions)
  addGlobalStyle()
}
