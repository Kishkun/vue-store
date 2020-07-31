<template>
  <div v-if="!loading && products.length !== 0">
    <v-row class="ma-0">
      <v-flex xs12>
        <v-carousel
            hide-delimiter-background
            show-arrows-on-hover
        >
          <v-carousel-item
              v-for="(product,i) in promoProducts"
              :key="i"
              :src="product.imageSrc"
              contain
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-row>
    <v-container>
      <v-row class="ma-0">
        <v-flex xs12 sm6 md6 lg4
                v-for="(product,i) in products"
                :key="i"
                class="my-5 px-2"
        >
          <v-card
              class="mx-auto pa-3"
              max-width="400"
          >
            <router-link
                :aria-label="product.title"
                :to="`/product/${product.id}`"
            >
              <v-img
                  class="align-end"
                  height="350px"
                  :src="product.imageSrc"
                  contain
              >
                <v-card-title class="card_heading pa-0">
                  {{ product.title }}
                </v-card-title>
              </v-img>
            </router-link>
            <v-card-text class="text--primary">
              <p class="subtitle-1">{{ product.description.substring(0, 55) }}...</p>
              <p class="subtitle-1 card_price">
                <span class="title">Price: </span>
                ${{ product.price }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  rounded
                  outlined
                  dark
                  color="light-blue darken-4"
                  class="mr-3"
                  :to="`/product/${product.id}`"
              >
                Description
              </v-btn>
              <BuyDialog :product="product"/>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-row>
    </v-container>
  </div>
  <div v-else-if="!loading && products.length === 0" class="text-center">
    <h1 class="text--primary mb-3">You have no products</h1>
  </div>
  <div v-else>
    <v-row class="ma-0">
      <v-flex xs12 class="text-center pt-16">
        <v-progress-circular
            :size="100"
            :width="4"
            color="purple"
            indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-row>
  </div>
</template>
<script>
  // @ is an alias to /src

  export default {
    name: "Home",
    computed: {
      promoProducts() {
        return this.$store.getters.promoProducts
      },
      products() {
        return this.$store.getters.products
      },
      loading() {
        return this.$store.getters.loading
      }
    }
  }
</script>
<style scoped>
  .card_heading {
    font-weight: bold;
    justify-content: center;
  }
  .card_price {
    color: #c00f1b;
    font-size: 18px;
  }
</style>
