<template>
  <v-row
      align="center"
      justify="center"
      style="height: 500px"
  >
    <v-col
        cols="12"
        sm="8"
        md="6"
    >
      <v-card class="elevation-12">
        <v-toolbar
            color="primary"
            dark
            flat
        >
          <v-toolbar-title>Registration form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                label="Email"
                name="email"
                prepend-icon="person"
                type="email"
                v-model="email"
                :rules="emailRules"
                required
            ></v-text-field>
            <v-text-field
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
                :rules="passwordRules"
                :counter="'>'+5"
                required
            ></v-text-field>
            <v-text-field
                label="Confirm password"
                name="confirm-password"
                prepend-icon="repeat"
                type="password"
                v-model="confirmPassword"
                :rules="[
                  v => !!v || 'Password is required',
                  v => v === password || 'Password should match'
                ]"
                :counter="'>'+5"
                required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              @click="submitHandler"
              :loading="loading"
              :disabled="!valid || loading"
          >Create account
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    name: "Register",
    props: {
      source: String,
    },
    data: () => ({
      valid: false,
      email: "",
      password: "",
      confirmPassword: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 5) || "Password must be at least 5 characters",
      ]
    }),
    methods: {
      async submitHandler() {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          };
          try {
            await this.$store.dispatch("registerUser", user);
            await this.$router.push("/");
          } catch (e) {}
        }
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    }
  }
</script>
