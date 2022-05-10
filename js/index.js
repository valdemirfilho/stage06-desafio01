const routeLinks = document.querySelectorAll("nav a")

const routes = {
  '/': '../pages/home.html',
  '/universe': '../pages/universe.html',
  '/exploration': '../pages/exploration.html'
}

function removeActives() {
  for (routeLink of routeLinks) {
    routeLink.classList.remove('active')
  }
}

async function renderContent(img) {
    const image = img ? img : 'home' 
    const { pathname } = window.location
    const page = routes[pathname]
    const data = await fetch(page)
    const html = await data.text()
    document.querySelector('#content').innerHTML = html
    const bg = document.querySelector('div.bg')
    bg.style.background = `url(images/${image}.png) 0% 0% / cover no-repeat`
  bg.classList.remove('fade')
  setTimeout(() => {
    bg.classList.add('fade')
  }, 100)
}

for (routeLink of routeLinks) {
  routeLink.addEventListener('click', (event) => {
    event.preventDefault()
    removeActives()
    event.target.classList.add('active')
    window.history.pushState({}, "", event.target.href)
    const img = event.target.dataset.image
    console.log(img)
    renderContent(img)
  })
}

renderContent()


