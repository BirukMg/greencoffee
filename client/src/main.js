// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import 'hooper/dist/hooper.css'
import store from './store'
import VueGlide from 'vue-glide-js'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import FileUpload from 'v-file-upload'
import './assets/css2/style.css';
// import './assets/css/linearicons.css';
// import './assets/css/font-awesome.min.css';
import './assets/css/bootstrap.css';
import './assets/css/magnific-popup.css';
import './assets/css/nice-select.css';
import './assets/css/animate.min.css';
import './assets/css/owl.carousel.css';
import './assets/css/main.css'; 
import FlagsDropdown from 'flags-dropdown-vue'
import FlagIcon from 'vue-flag-icon'
import LangFlag from 'vue-lang-code-flags'
import CountryFlag from 'vue-country-flag'
import {
  CarouselCard,
  CarouselCardItem
} from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css'
import * as VueGoogleMaps from "vue2-google-maps";
import VueCarousel from 'vue-carousel';
import VueMCarousel from 'vue-m-carousel';


Vue.use(VueCarousel);
Vue.use(VueMCarousel);

var VueTruncate = require('vue-truncate-filter')
Vue.use(VueTruncate)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCusFRGzAAhaR3aFN4DxfLLhN60Yn80TVg",
    libraries: "places" // necessary for places input
  }
});

Vue.component(CarouselCard.name, CarouselCard)
Vue.component(CarouselCardItem.name, CarouselCardItem)

Vue.component('vue-country-flag', CountryFlag)

Vue.component('lang-flag', LangFlag)

Vue.use(FlagIcon);
Vue.component('flags-dropdown', FlagsDropdown);

Vue.use(Vuetify)
Vue.use(VueGlide)
Vue.use(FileUpload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    country_iso: "mm"
  },
  router,
  store,
  components: { App },
  template: '<App/>'
})
