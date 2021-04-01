<template>
  <v-contai>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
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
                    <v-text-field
                      id="confirmPassword"
                      label="Confirm Password"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePassword]"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn type="submit">Sign up</v-btn>
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
      confirmPassword: "",
    };
  },
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    },
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
    onSignUp() {
      this.$store.dispatch('signUserUp',{email:this.email, password: this.password})
    },
  },
};
</script>

<style scoped>
</style>
