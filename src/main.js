function isAPIToken(property) {
  if (property.endsWith('__oc-sdk-access-token')) {
    if (property.split('__')[0].length === 16) {
      return true
    }
  }
  return false
}

function findAPIToken() {
  const localValues = { ...localStorage }
  for (const property in localValues) {
    if (isAPIToken(property)) {
      return localValues[property]
    }
  }
  return false
}

async function findUserId(token) {
  return fetch('https://api.openclassrooms.com/me', {
    headers: new Headers({
      Authorization: token
    })
  })
    .then((response) => response.json())
    .then((userInfo) => userInfo.id)
}

async function main() {
  // check first if dashboard-sessions div is on page
  // if not, do nothing (not even API call)
  const anchor = document.getElementById('dashboard-sessions')
  if (!anchor) return

  let APIToken = await findAPIToken()
  let userId = await findUserId(APIToken)

  const sessionsList = await fetch(
    `https://api.openclassrooms.com/users/${userId}/sessions`,
    {
      headers: new Headers({
        Authorization: APIToken
      })
    }
  ).then((response) => response.json())
  createSessionsTable(sessionsList, anchor)
}

main()
