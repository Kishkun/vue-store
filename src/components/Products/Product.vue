<template>
  <section>
    <v-row class="product elevation-10 ma-0 mt-3" v-if="!loading">
      <v-flex xs12 lg4>
        <v-img :src="product.imageSrc" />
      </v-flex>
      <v-flex xs12 lg8>
        <div class="product-info ml-sm-15">
          <h5 class="product-title display-1 mb-3 mt-3">{{ product.title }}</h5>
          <p class="product-category title">
            <span class="product-title">Vendor:</span>  {{ product.vendor.charAt(0).toUpperCase() + product.vendor.substring(1) }}
          </p>
          <p class="product-price title">
            <span class="product-title">Price:</span> ${{ product.price }}
          </p>
          <p class="product-color title">
            <span class="product-title">Color: </span>
            <span :title="product.color"
                  :style="{backgroundColor: product.color}"
                  class="product-color__bg"
            ></span>
          </p>
          <p class="title">
            <span class="product-title">Material:</span> {{
            product.material.charAt(0).toUpperCase() + product.material.substring(1)
            }}
          </p>
          <div class="title mb-5">
            <p class="product-title mb-2">Description:</p>
            <p class="description">{{ product.description }}</p>
          </div>
          <EditProduct :product="product" v-if="isOwner"/>
          <BuyDialog :product="product"/>
        </div>
      </v-flex>
    </v-row>
    <v-row align="center" justify="center" class="ma-0 mt-10" v-else>
      <v-progress-circular
          :size="100"
          :width="4"
          color="purple"
          indeterminate
      ></v-progress-circular>
    </v-row>
  </section>
</template>
<script>
  import EditProduct from "./EditProduct";
  
  export default {
    name: "Product",
    components: {
      EditProduct
    },
    props: {
      id: String
    },
    computed: {
      product() {
        const id = this.id;
        return this.$store.getters.productById(id)
      },
      loading() {
        return this.$store.getters.loading
      },
      isOwner() {
        return this.product.ownerId === this.$store.getters.user
      }
    }
  }
</script>
<style scoped lang="scss">
  .product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid #1c77ad;
    padding: 30px;
    margin-bottom: 100px;
  }
  
  .product-title{
    font-size: 1.6rem;
    font-weight: bold;
    color: #1875d0;
  }
  
  .product-price {
    color: red;
  }
  
  .product-color__bg {
    display: inline-block;
    width: 50px;
    height: 20px;
    border: 1px solid #2b2b2b;
    border-radius: 10px;
  }
  
  @media screen and (max-width: 600px) {
    .product-title{
      font-size: 1.2rem;
    }
    
    .description{
      font-size: 1rem;
      word-wrap: break-word;
    }
  }
</style>
