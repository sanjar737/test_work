<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-text-field label="Login" name="login" type="text" v-model="login"></v-text-field>

              <v-text-field
                label="Password"
                name="password"
                type="password"
                :rules="passwordRules"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="validate" :loading="loading" :disabled="!valid || loading">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
      valid: false,
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          (v && v.length >= 3) ||
          "Password must be equal or more than 6 character"
      ]
    };
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        let user = {
          username: this.login,
          password: this.password
        };
        try {
          await this.$store.dispatch("loginUser", user);
          this.$router.push("/");
        } catch (error) {
          this.$refs.form.reset();
          console.error(error.message)
        }
      }
    }
  }
};
</script>