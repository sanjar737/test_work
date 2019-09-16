<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card v-if="!loading" class="mx-auto" max-width="344">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="d-flex justify-center">
              <v-list-item-avatar size="300" class="mx-auto">
                <v-img
                  alt
                  :src="user.avatar"
                  aspect-ratio="1"
                ></v-img>
              </v-list-item-avatar>
              </div>
              <v-list-item-title class="headline mb-1">{{user.username}}</v-list-item-title>
              <v-list-item-subtitle>{{user.about}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <div v-else class="d-flex justify-center">
          <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  created: function() {
    if (this.$store.getters.user == null) {
      let token = this.$store.getters.token;
      this.$store.dispatch("aboutUser", token);
    }
  }
};
</script>