const routes = {
  '/': '../pages/home.html',
  '/universe': '../pages/universe.html',
  '/exploration': '../pages/exploration.html',
  'home': '../pages/home.html',
  'universe': '../pages/universe.html',
  'exploration': '../pages/exploration.html'
}

const routeLinks = document.querySelectorAll("nav .link")

function removeActives() {
  for (const routeLink of routeLinks) {
    routeLink.classList.remove('active')
  }
}

function setActive(link) {
  const linkActive = document.querySelector(`.link[data-image=${link}]`)
  linkActive.classList.add("active")
}

function renderContent(event) {
  console.log(event)
  if (event.type === 'click') event.preventDefault()
  window.history.pushState({ id: event.target.href }, "", event.target.href)
  const data = window.location.pathname.replace("/", "")

  console.log(data)
  removeActives()
  setActive(data)
}

window.addEventListener('popstate', (event) => {
  console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
  console.log(event)
  renderContent(event.state?.id)
  // removeActives()

  // if (event.state) {
  //   document.querySelector(`[data-image=${event.state.id}]`).classList.add('active')
  // } else {
  //   document.querySelector(`[data-image="home"]`).classList.add('active')
  // }
});
