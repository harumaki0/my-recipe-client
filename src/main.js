import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import VueCookie from "vue-cookie";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
