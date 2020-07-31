<template>
  <v-row class="ma-0">
    <v-flex xs12 sm6 offset-sm3>
      <h1 class="text--secondary mb-3 ">Create new Product</h1>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-text-field
            label="Title product *"
            name="title"
            type="text"
            v-model="title"
            :rules="titleRules"
            required
        ></v-text-field>
        <v-text-field
            label="Vendor product"
            name="vendor"
            type="text"
            v-model="vendor"
            required
        ></v-text-field>
        <v-text-field
            label="Color product"
            name="color"
            type="text"
            v-model="color"
            required
        ></v-text-field>
        <v-text-field
            label="Material product"
            name="material"
            type="text"
            v-model="material"
            required
        ></v-text-field>
        <v-text-field
            label="Price product *"
            name="price"
            type="text"
            v-model="price"
            :rules="priceRules"
            required
        ></v-text-field>
        <v-text-field
            label="Description product"
            name="description"
            type="text"
            v-model="description"
            required
        ></v-text-field>
        <v-flex xs12>
          <v-btn class="warning" @click="upload">
            Upload
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
          <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="img/*"
              @change="onFileChange"
          >
        </v-flex>
        <v-flex xs12 class="my-5">
           <v-img
               v-if="imageSrc"
               :src="imageSrc"
               contain height="200px"
           />
        </v-flex>
        <v-flex xs12 class="my-5">
          <v-switch
              color="primary"
              v-model="promo"
              label="Add to Promo?"
          ></v-switch>
        </v-flex>
        <v-flex xs12 class="text-right">
          <v-btn
              :loading="loading"
              color="success"
              @click="submitHandler"
              :disabled="!valid || !image || loading"
          >Create product
          </v-btn>
        </v-flex>
      </v-form>
    </v-flex>
  </v-row>
</template>
<script>
  import {mapState} from "vuex";
  
  export default {
    name: "NewProduct",
    data: () => ({
      // image_src: image,
      valid: false,
      title: "",
      vendor: "",
      color: "",
      material: "",
      price: 0,
      description: "",
      titleRules: [
        v => !!v || "Title is required"
      ],
      priceRules: [
        v => !!v || "Price is required"
      ],
      promo: false,
      image: null,
      imageSrc: ""
    }),
    computed: {
      ...mapState({
        userId: state => state.user
      }),
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
      async submitHandler() {
        if (this.$refs.form.validate() && this.imageSrc && this.userId) {
          const product = {
            title: this.title,
            vendor: this.vendor,
            color: this.color,
            material: this.material,
            price: this.price,
            description: this.description,
            promo: this.promo,
            image: this.image
          };
          try {
            await this.$store.dispatch("createProduct", {product, userId: this.userId});
            this.$refs.form.reset();
            await this.$router.push("/list")
          } catch (e) {
          }
        }
      },
      upload() {
        this.$refs.fileInput.click()
      },
      onFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          this.imageSrc = reader.result
        };
        reader.readAsDataURL(file);
        this.image = file;
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
