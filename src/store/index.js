import Vue from 'vue'
import Vuex from 'vuex'
import * as images from '@/store/modules/images.js'
import * as lightbox from '@/store/modules/lightbox.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    images,
    lightbox
  },
  state: {
    countries: ['France', 'Japan', 'South Korea', 'Germany', 'Belgium', 'USA', 'Australia', 'New Zealand', 'UAE', 'Czech Republic', 'Sweden', 'Denmark'],
  },
  mutations: {

  },
  actions: {

  }
})