import Vue from "vue"
import VueRouter from "vue-router"
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {auth: true},
    component: () => import("../components/Home.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {isLogin: true},
    component: () => import("../components/Auth/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {isLogin: true},
    component: () => import("../components/Auth/Register.vue")
  },
  {
    path: "/checkout",
    name: "Cart",
    meta: {auth: true},
    component: () => import("../components/User/Cart.vue")
  },
  {
    path: "/product/:id",
    props: true,
    name: "Product",
    meta: {auth: true},
    component: () => import("../components/Products/Product.vue")
  },
  {
    path: "/new",
    name: "NewProduct",
    meta: {auth: true},
    component: () => import("../components/Products/NewProduct.vue")
  },
  {
    path: "/list",
    name: "ProductsList",
    meta: {auth: true},
    component: () => import("../components/Products/ProductsList.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const currentUser = await firebase.auth().onAuthStateChanged(user => {
    const currentUserId = !!user;
    const requireAuth = to.matched.some(record => record.meta.auth);
    const isLogin = to.matched.some(record => record.meta.isLogin);
    if (requireAuth && !currentUserId) {
      next("/login?loginError=true")
    } else if (isLogin && currentUserId) {
      next("/")
    }
    next()
  });
});

export default router
