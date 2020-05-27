import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import Gallery from '../views/Gallery.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: {
      name: 'country-gallery',
      params: {
        country: 'All'
      }
    }
  },
  {
    path: '/:country',
    props: true,
    name: 'country-gallery',
    component: Gallery,
    beforeEnter(to, from, next) {
      if (to.params.country === 'All') {
        store.dispatch("images/fetchAll")
          .then(() => {
            next();
          });
      } else {
        store.dispatch("images/fetchByCountry", to.params.country)
          .then(() => {
            next();
          });
      }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router