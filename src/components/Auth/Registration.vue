<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registration</v-toolbar-title>
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

              <v-text-field
                label="Confirm password"
                name="confirm-password"
                type="password"
                :rules="confirmPasswordRules"
                v-model="confirmPassword"
              ></v-text-field>

              <v-textarea name="input-7-4" label="About" v-model="about"></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="validate" :disabled="!valid">Create account</v-btn>
          </v-card-actions>
        </v-card>
        <v-snackbar top color="white" :value="message">
          <span class="green--text">{{ message }}</span>
          <v-btn color="pink" text @click.native="closeMessage">Close</v-btn>
        </v-snackbar>
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
      confirmPassword: "",
      about: "",
      valid: false,
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          (v && v.length >= 4) ||
          "Password must be equal or more than 6 character"
      ],
      confirmPasswordRules: [
        v => !!v || "Password is required",
        v => v === this.password || "Password should match"
      ],
    };
  },
  computed: {
    message () {
      return this.$store.getters.message;
    }
  },
  methods: {
    closeMessage() {
      this.$store.dispatch("clearMessage");
    },
    async validate() {
      if (this.$refs.form.validate()) {
        let user = {
          username: this.login,
          password: this.password,
          about: this.about
        };
        try {
          await this.$store.dispatch("registerUser", user);
          this.$refs.form.reset();
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  }
};
</script>