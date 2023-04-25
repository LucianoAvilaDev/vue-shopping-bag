import axios from 'axios';
import { createStore } from 'vuex';

//dados que saem da store não podem ir para o data do componente, e sim para o computed
export default createStore({
  
  //propriedade de dados
  state: {
    products: []
  },

  //são síncronas
  mutations: {
    loadProducts(state, products){
      state.products = products
    }
  },

  //são assíncronas
  actions: {

    loadProducts({ commit }) {
      axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        commit('loadProducts', response.data);
      })
    },

  },
  modules: {
  }
})
