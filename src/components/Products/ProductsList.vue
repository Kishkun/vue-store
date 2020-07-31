<template>
  <v-row class="ma-0">
    <v-flex v-if="!loading && myProducts.length !== 0" xs12 sm6 offset-sm3>
      <h1 class="text--secondary mb-3">My products</h1>
      <v-card
          class="elevation mb-2 pa-5"
          v-for="product in myProducts"
          :key="product.id"
      >
        <v-row>
          <v-flex xs4>
            <v-img
                :src="product.imageSrc"
            />
          </v-flex>
          <v-flex xs8>
            <v-card-text class="py-0">
              <h2 class="text--primary">{{ product.title }}</h2>
              <p>{{ product.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  text
                  class="info"
                  link
                  :to="`/product/${product.id}`"
              >Open</v-btn>
            </v-card-actions>
          </v-flex>
        </v-row>
      </v-card>
    </v-flex>
    <v-flex v-else-if="!loading && myProducts.length === 0" class="text-center">
      <h1 class="text--primary mb-3">You have no products</h1>
    </v-flex>
    <v-flex v-else class="text-center pt-16">
      <v-progress-circular
          :size="100"
          :width="4"
          color="purple"
          indeterminate
      ></v-progress-circular>
    </v-flex>
  </v-row>
</template>
<script>
  export default {
    name: "Products",
    computed: {
      myProducts() {
        return this.$store.getters.myProducts
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
