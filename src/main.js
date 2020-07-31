import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import 'firebase/storage';
import BuyDialog from "./components/Common/BuyDialog";

Vue.component("BuyDialog", BuyDialog);

Vue.config.productionTip = false;

const apiKey = process.env.VUE_APP_FIREBASE_KEY;
const authDomain = process.env.VUE_APP_FIREBASE_DOMAIN;
const databaseURL = process.env.VUE_APP_FIREBASE_URL;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: "vue-store-e7a6b",
  storageBucket: "vue-store-e7a6b.appspot.com",
  messagingSenderId: "882355646123",
  appId: "1:882355646123:web:f9ef422960767d626551ee"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
    this.$store.dispatch("fetchProducts");
  }
}).$mount("#app");
