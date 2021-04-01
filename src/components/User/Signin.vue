<template>
  <v-contai>
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
                    <v-btn type="submit">Sign in</v-btn>
                  </v-col>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-contai>
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
    }
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
  },
};
</script>

<style scoped>
</style>
