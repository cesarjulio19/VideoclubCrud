import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/peliculas",
      name: "peliculas",
      component: () => import("./components/ListaPeliculas")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddPeliculas")
    }
  ]
});