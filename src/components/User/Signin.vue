<template >
  <v-container >
    <v-row v-if="error">
      <v-col cols="12" sm="6" offset-sm="3">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>
    <v-row style="height: 100vh" class="align-center">
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card class="align-center" style="background: transparent!important;" elevation="0">
          <v-card-text>
            <v-container >
              <form @submit.prevent="onSignIn">
                <v-row class="justify-center">
                  <v-col cols="8">
                    <v-text-field
                        outlined
                        dense
                        background-color="input"
                        id="email"
                        label="Email"
                        v-model="email"
                        type="email"
                        :rules="[rules.required]"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center">
                  <v-col cols="8">
                    <v-text-field
                        outlined
                        dense
                        flat
                        class="text--white"
                        background-color="input"
                        id="password"
                        label="Password"
                        v-model="password"
                        type="password"
                        required
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center">
                  <v-col cols="8">
                    <v-btn block color="primary" type="submit" :disabled="loading" :loading="loading">Sign in
                      <span slot="loader" class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center" cols="12">
                    <span style="color: white!important;" class="subtitle-1">Don’t have an account?
                    <v-btn to="/signup" text color="primary">
    Sign Up
                    </v-btn></span>
                  </v-col>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    loading() {
      return this.$store.getters.loading
    },
    error() {
      return this.$store.getters.error
    },

  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn() {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onDismissed() {
      console.log('dismissed')
      this.$store.dispatch('cleaerError')
    }
  },
};
</script>

<style>
.v-label.theme--light {
  color: #dbdbdb !important;
}

.theme--light.v-input input, .theme--light.v-input textarea {
  color: #dbdbdb !important;
}

.v-text-field--outlined fieldset {
  border-color: #2a1f31;
}
</style>

