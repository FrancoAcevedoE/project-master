import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import BuyView from "@/views/BuyView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    children: [
      { path: "", redirect: "comprar" },
      { path: "comprar", name: "comprar", component: BuyView },
      { path: "historial", name: "historial", component: AboutView }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("userId");
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
