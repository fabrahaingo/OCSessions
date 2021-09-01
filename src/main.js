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

async function main(anchor, lang) {
  addGlobalStyle();
  let h1 = document.createElement('h1');
  h1.classList.add('secondTitle', 'customTitle');
  h1.innerText = configText[lang].title;
  anchor.insertBefore(h1, null);

  let APIToken = await findAPIToken();
  let userId = await findUserId(APIToken);

  const sessionsList = await fetch(
    `https://api.openclassrooms.com/users/${userId}/sessions`,
    {
      headers: new Headers({
        Authorization: APIToken
      })
    }
  ).then((response) => response.json());
  createSessionsTable(sessionsList, anchor, lang);
}

// Indicator if table has already been built
let done = false;

// Check URL changing and launch main() if we're on Sessions & done == false, i.e. not build yet
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
    if (document.location.href.includes('dashboard/sessions') && document.getElementById('dashboard-sessions') && !done) {
      const anchor = document.getElementById('dashboard-sessions');
      const lang = document.location.href.includes('/fr/') ? "fr" : "en";
      main(anchor, lang);
      done = true;
    }
  }
})