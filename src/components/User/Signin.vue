<template>
  <v-container>
    <v-row v-if="error">
      <v-col cols="12" sm="6" offset-sm="3">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignIn">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                        id="email"
                        label="Email"
                        v-model="email"
                        type="email"
                        required
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                        id="password"
                        label="Password"
                        v-model="password"
                        type="password"
                        required
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn type="submit" :disabled="loading" :loading="loading">Sign in
                      <span slot="loader" class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                    </v-btn>
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
    };
  },
  computed: {
    user(){
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
      if( value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn() {
      this.$store.dispatch('signUserIn',{email:this.email, password: this.password})
    },
    onDismissed() {
      console.log('dismissed')
      this.$store.dispatch('cleaerError')
    }
  },
};
</script>

<style scoped>
</style>
