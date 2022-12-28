import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Favorite from "@/views/Favorite.vue";
import Calendar from "@/views/Calendar.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import RecipeEdit from "@/views/RecipeEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recipe",
    name: "Recipe",
    component: () => import("@/views/Recipe.vue"),
  },
  {
    path: "/recipe/:id",
    name: "RecipePage",
    component: () => import("@/views/RecipePage.vue"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: Favorite,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/recipeEdit/:id",
    name: "recipeEdit",
    component: RecipeEdit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
