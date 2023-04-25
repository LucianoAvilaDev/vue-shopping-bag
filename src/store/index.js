import axios from 'axios';
import { createStore } from 'vuex';

//dados que saem da store não podem ir para o data do componente, e sim para o computed
export default createStore({
  
  //propriedade de dados
  state: {
    products: [],
    productsInBag: []
  },

  //são síncronas
  mutations: {
    loadProducts(state, products){
      state.products = products
    },

    addToBag(state, product){
      state.productsInBag.push(product)
    },

    removeFromBag(state, productId){
      var updatedBag =  state.productsInBag.filter(item => item.id != productId)
      
      state.productsInBag = updatedBag
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

    addToBag({ commit }, product){
      commit("addToBag", product)
    },

    removeFromBag({ commit }, productId){
      if(confirm('Tem certeza que deseja remover o item do carrinho?')){
        commit("removeFromBag", productId)
      }
    }

  },
  modules: {
  }
})
