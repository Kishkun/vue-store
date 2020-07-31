<template>
  <v-flex flex-column xs12 lg6 class="mb-3">
    <v-btn
        dark
        class="light-blue darken-4"
        rounded
        @click.stop="dialog = true"
    >
      Edit
    </v-btn>
    <v-dialog
        v-model="dialog"
        max-width="400"
    >
      <v-card>
        <v-card-title class="headline text--primary">Edit product</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-5">
          <v-text-field
              label="Title"
              name="title"
              type="text"
              v-model="editedTitle"
          ></v-text-field>
          <v-textarea
              label="Description"
              name="description"
              type="text"
              v-model="editedDescription"
              auto-grow
              rows="1"
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              dark
              color="light-blue darken-4"
              outlined
              @click="onCancel"
          >
            Cancel
          </v-btn>
          <v-btn
              dark
              color="light-blue darken-4"
              @click="onSave"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
  export default {
    name: "EditProduct",
    props: {
      product: Object
    },
    data: () => ({
      dialog: false,
      editedTitle: "",
      editedDescription:  ""
    }),
    methods: {
      onCancel() {
        this.editedTitle = this.product.title;
        this.editedDescription = this.product.description;
        this.dialog = false
      },
      onSave() {
        if (this.editedTitle !== "" && this.editedDescription !== "") {
          this.$store.dispatch("updateProduct", {
            title: this.editedTitle,
            description:  this.editedDescription,
            id: this.product.id
          });
          this.dialog = false
        }
      }
    },
    created() {
      this.editedTitle = this.product.title;
      this.editedDescription = this.product.description;
    }
  }
</script>
