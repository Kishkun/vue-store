import firebase from "firebase/app";

export default {
  state: () => ({
    user: null
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({commit, dispatch}, {email, password}) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        dispatch("getUiId");
      } catch (e) {
        commit("setError", e.message);
      }
      commit("setLoading", false);
    },
    async loginUser({commit, dispatch}, {email, password}) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch("getUiId");
      } catch (e) {
        commit("setError", e.message);
      }
      commit("setLoading", false);
    },
    autoLoginUser({commit}, payload) {
      commit("setUser", payload.uid)
    },
    logoutUser({commit}) {
      firebase.auth().signOut();
      commit("setUser", null)
    },
    getUiId({commit}) {
      const user = firebase.auth().currentUser || null;
      commit("setUser", user.uid);
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedIn(state) {
      return state.user !== null
    }
  }
}
