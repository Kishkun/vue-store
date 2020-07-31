import firebase from "firebase/app";

export default {
  state: () => ({
    orders: []
  }),
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async crateOrder({commit}, {name, phone, productId, ownerId}) {
      const order = {
        name,
        phone,
        productId,
        done: false,
        id: null
      };
      commit("clearError");
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (e) {
        commit("setError", e.message);
        throw e
      }
    },
    async fetchOrders({commit, getters}) {
      commit("clearError");
      commit("setLoading", true);
      const resultOrders = [];
      try {
        const fbVal = await firebase.database().ref(`/users/${getters.user}/orders`).once("value");
        const orders = fbVal.val();
        !orders || Object.keys(orders).forEach(key => {
          const order = orders[key];
          resultOrders.push({
            name: order.name,
            phone: order.phone,
            productId: order.productId,
            done: order.done,
            id: key
          });
        });
        commit("loadOrders", resultOrders);
      } catch (e) {
        commit("setError", e.message);
        throw e
      }
      commit("setLoading", false);
    },
    async markOrderDone({commit, getters}, payload) {
      commit("clearError");
      try {
        await firebase.database().ref(`/users/${getters.user}/orders`).child(payload).update({
          done: true
        })
      } catch (e) {
        commit("setError", e.message);
        throw e
      }
    }
  },
  getters: {
    orders(state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    },
    undoneOrders(state) {
      return state.orders.filter(order => !order.done)
    },
    doneOrders(state) {
      return state.orders.filter(order => order.done)
    }
  }
}
