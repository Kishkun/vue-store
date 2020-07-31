<template>
  <v-app style="background: #f8f8f8">
    <Navbar/>
    <template v-if="error">
      <v-snackbar
          :multi-line="true"
          :timeout="5000"
          color="error"
          v-model="snackbar"
      >
        {{ error }}
        <template v-slot:action="{ attrs }">
          <v-btn
              dark
              text
              v-bind="attrs"
              @click="closeError"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  data: () => ({
    snackbar: false,
  }),
  components: {
    Navbar
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    }
  },
  computed: {
    error() {
      this.snackbar = true;
      return this.$store.getters.error
    }
  }
};
</script>
