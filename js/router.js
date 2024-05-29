class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event.preventDefault()
    window.history.pushState({ page: event.target.dataset.page }, "", event.target.href)
    this.render()
  }

  async render() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    const response = await fetch(route)
    const content = await response.text()
    const main = document.querySelector("#content")
    main.innerHTML = content

    const [, , fullname] = route.split("/")
    const [pagename,] = fullname.split(".")

    if (route === this.routes[404]) return
    this.setActiveLink(pagename)
    this.setBackground(pagename)
  }

  setBackground(image) {
    const divWrapper = document.querySelector(".wrapper")
    const divBackground = document.createElement("div")
    divBackground.classList.add("background")
    divBackground.style.background = `url(images/${image}.webp) 0% 0% / cover no-repeat`
    divWrapper.innerHTML = divBackground.outerHTML
  }

  setActiveLink(page) {
    const links = document.querySelectorAll(".link")

    for (const link of links) {
      link.classList.remove("active")
    }

    const activeLink = document.querySelector(`.${page}`)
    activeLink?.classList.add("active")
  }
}

export default Router
