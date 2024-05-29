import Router from "./router.js"

const router = new Router()

// routes = {
//   "/": "/pages/home.html",
//   "/exploration": "/pages/exploration.html",
//   "/universe": "/pages/universe.html",
//   404: "/pages/404.html"
// }

router.add("/", "/pages/home.html")
router.add("/exploration", "/pages/exploration.html")
router.add("/universe", "/pages/universe.html")
router.add(404, "/pages/404.html")

document.addEventListener("DOMContentLoaded", (event) => {
});

router.render()

// window.onpopstate = (event) => router.render(event.state?.id)
window.addEventListener('popstate', (event) => {
  // console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
  router.render()
})

window.route = (event) => router.route(event)
