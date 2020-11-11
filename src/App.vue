<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-toolbar-title>Project</v-toolbar-title>
// comment
        <div class="flex-grow-1"></div>

        <v-toolbar-items>
          <v-btn v-for="link of links" :key="link.title" text :to="link.url">{{link.title}}</v-btn>
          <v-btn v-if="isLogged" text @click="logoutUser">Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-snackbar top color="white" :value="error">
      <span class="red--text">{{ error }}</span>
      <v-btn color="pink" text @click.native="closeError">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    logoutUser() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    },
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isLogged() {
      return this.$store.getters.isLogged;
    },
    links() {
      if (!this.$store.getters.isLogged) {
        return [
          {
            title: "Login",
            url: "/login",
          },
          {
            title: "Registration",
            url: "/registration",
          },
        ];
      }
    },
  },
};
</script>>
