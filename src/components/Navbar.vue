<template>
  <div>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Online store
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
          v-for="link in links"
          :key="link.title"
          link
          :to="link.url"
      >
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
          @click="onLogout"
          v-if="isUserLoggedIn"
      >
        <v-list-item-icon>
          <v-icon>exit_to_app</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="pa-0">
        <router-link
            tag="span"
            exact
            :to="'/'"
            class="pointer"
        >
          Online Store
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text
               v-for="link in links"
               :key="link.title"
               link
               :to="link.url"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          <span>{{ link.title }}</span>
        </v-btn>
        <v-btn
            text
            @click="onLogout"
            v-if="isUserLoggedIn"
        >
          <v-icon left>exit_to_app</v-icon>
          <span>Logout</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>
<script>
  export default {
    name: "Navbar",
    data: () => ({
      drawer: false
    }),
    computed: {
      isUserLoggedIn() {
        return this.$store.getters.isUserLoggedIn
      },
      links() {
        if (this.isUserLoggedIn) {
          return [
            {title: "Cart", icon: "shopping_cart", url: "/checkout"},
            {title: "New product", icon: "add", url: "/new"},
            {title: "My Products", icon: "list", url: "/list"}
          ]
        }
        return [
          {title: "Login", icon: "account_box", url: "/login"},
          {title: "Register", icon: "face", url: "/register"}
        ]
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch("logoutUser");
        this.$router.push("/login")
      }
    }
  };
</script>
<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
