<template>
  <v-container>
    <v-row v-if="error">
      <v-col cols="12" sm="6" offset-sm="3">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>
    <v-row style="height: 100vh" class="align-center">
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card class="align-center" style="background: transparent!important;" elevation="0">
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
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
                        required
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
                    <v-text-field
                        outlined
                        dense
                        flat
                        class="text--white"
                        background-color="input"
                        id="confirmPassword"
                        label="Confirm Password"
                        v-model="confirmPassword"
                        type="password"
                        :rules="[comparePassword]"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center">
                  <v-col cols="8">
                    <v-btn block color="primary" type="submit" :disabled="loading" :loading="loading">Sign up
                      <span slot="loader" class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center" cols="12">
                    <span style="color: white!important;" class="subtitle-1">Already have an account?
                    <v-btn to="/signin" text color="primary">
    Sign In
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
      confirmPassword: "",
    };
  },
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
          ? "Passwords do not match"
          : true;
    },
    user() {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    },
  },
  methods: {
    onSignUp() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      console.log('dismissed')
      this.$store.dispatch('clearError')
    }
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
