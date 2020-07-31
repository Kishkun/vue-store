<template>
  <v-flex flex-grow-0>
    <v-btn
        color="light-blue darken-4"
        dark
        rounded
        @click.stop="dialog = true"
    >
      Buy
    </v-btn>
    <v-dialog
        v-model="dialog"
        max-width="400"
    >
      <v-card>
        <v-card-title class="headline text--primary">Do you want to buy it?</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-5">
          <v-text-field
              label="Name"
              name="Your name"
              type="text"
              v-model="name"
          ></v-text-field>
          <v-text-field
              label="Phone"
              name="Your phone"
              type="number"
              v-model.number="phone"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              outlined
              :disabled="localLoading"
              @click="onClose"
          >
            Close
          </v-btn>
          <v-btn
              color="success"
              :disabled="localLoading"
              :loading="localLoading"
              @click="onBuy"
          >
            Buy it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
  export default {
    name: "BuyDialog",
    props: {
      product: Object
    },
    data: () => ({
      dialog: false,
      name: "",
      phone:  "",
      localLoading: false
    }),
    methods: {
      onClose() {
        this.name = "";
        this.phone = "";
        this.dialog = false
      },
      onBuy() {
        if (this.name !== "" && this.phone !== "") {
          this.localLoading = true;
          this.$store.dispatch("crateOrder", {
            name: this.name,
            phone:  this.phone,
            productId: this.product.id,
            ownerId: this.product.ownerId
          })
          .finally(() => {
            this.name = "";
            this.phone = "";
            this.localLoading = false;
            this.dialog = false
          });
        }
      }
    }
  }
</script>
