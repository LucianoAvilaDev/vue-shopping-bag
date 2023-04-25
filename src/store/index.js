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

    loadBag(state, products){
      state.productsInBag = products
    },

    addToBag(state, product){
      state.productsInBag.push(product)
      
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))
    },

    removeFromBag(state, productId){
      var updatedBag =  state.productsInBag.filter(item => item.id != productId)
      
      state.productsInBag = updatedBag
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))

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

    loadBag({ commit }) {
      if(localStorage.getItem('productsInBag')){
        commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')));
      }
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
