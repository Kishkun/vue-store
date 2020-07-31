import firebase from "firebase/app";

export default {
  state: () => ({
    products: []
  }),
  mutations: {
    createProduct(state, product) {
      state.products.push(product);
    },
    loadProducts(state, payload) {
      state.products = payload
    },
    updatedProduct(state, payload) {
      let product = state.products.find(item => {
        return item.id === payload.id
      });
      product.title = payload.title;
      product.description = payload.description;
    }
  },
  actions: {
    async createProduct({commit, dispatch}, {product, userId}) {
      commit("clearError");
      commit("setLoading", true);
      const image = product.image;
      try {
        const {...newProduct} = {
          ...product,
          ownerId: userId.user,
          imageSrc: ""
        };
        const createdProduct = await firebase.database().ref("products").push(newProduct);
        const imageExt = image.name.slice(image.name.lastIndexOf("."));
        const fileData = await firebase.storage().ref(`products/${createdProduct.key}.${imageExt}`).put(image);
        const imageSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL();
        await firebase.database().ref("products").child(createdProduct.key).update({imageSrc});
        commit("setLoading", false);
        commit("createProduct", {
          ...newProduct,
          id: createdProduct.key,
          imageSrc
        })
      } catch (e) {
        commit("setError", e.message);
        throw e
      }
      commit("setLoading", false);
    },
    async fetchProducts({commit}) {
      commit("clearError");
      commit("setLoading", true);
      const resultProduct = [];
      try {
        const productsVal = await firebase.database().ref("products").once("value");
        const products = productsVal.val();
        !products || Object.keys(products).forEach(key => {
          const product = products[key];
          resultProduct.push({
            ...product,
            id: key
          });
          commit("loadProducts", resultProduct);
        });
      } catch (e) {
        commit("setError", e.message);
        throw e
      }
      commit("setLoading", false);
    },
    async updateProduct({commit}, product) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await firebase.database().ref("products").child(product.id).update(product);
        commit("updatedProduct", product);
      } catch (e) {
        commit("setError", e.message);
        throw e
      }
      commit("setLoading", false);
    }
  },
  getters: {
    products(state) {
      return state.products;
    },
    promoProducts(state) {
      return state.products.filter(product => product.promo)
    },
    myProducts(state, getters) {
      return state.products.filter(product => {
        return product.ownerId === getters.user
      })
    },
    productById(state) {
      return productId => {
        return state.products.find(product => product.id === productId)
      }
    }
  }
}
