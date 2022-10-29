const routeLinks = document.querySelectorAll("nav a")

const routes = {
  '/': '../pages/home.html',
  '/universe': '../pages/universe.html',
  '/exploration': '../pages/exploration.html'
}

function removeActives() {
  for (const routeLink of routeLinks) {
    routeLink.classList.remove('active')
  }
}

async function loadImg(img) {
  const image = img ? img : 'home'
  const loadimg = document.querySelector('div.loadimg')
  loadimg.style.background = `url(images/${image}.webp) 0% 0% / cover no-repeat`
}

async function renderContent(img) {
  const image = img ? img : 'home'
  const { pathname } = window.location
  const page = routes[pathname]
  const data = await fetch(page)
  const html = await data.text()
  document.querySelector('#content').innerHTML = html
  const bg = document.querySelector('div.bg')
  bg.style.background = `url(images/${image}.webp) 0% 0% / cover no-repeat`
  bg.classList.remove('fade')
  setTimeout(() => {
    bg.classList.add('fade')
  }, 100)
}

for (const routeLink of routeLinks) {
  routeLink.addEventListener('mouseover', (event) => {
    const img = event.target.dataset.image
    loadImg(img)
  })

  routeLink.addEventListener('click', (event) => {
    event.preventDefault()
    removeActives()
    event.target.classList.add('active')
    const img = event.target.dataset.image
    renderContent(img)
    window.history.pushState({ id: img }, "", event.target.href)
  })
}

window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('body').classList.add('fadein')
  console.log('OK!')
});

window.addEventListener('popstate', (event) => {
  console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
  renderContent(event.state?.id)
  removeActives()

  if (event.state) {
    document.querySelector(`[data-image=${event.state.id}]`).classList.add('active')
  } else {
    document.querySelector(`[data-image="home"]`).classList.add('active')
  }
});

renderContent()



