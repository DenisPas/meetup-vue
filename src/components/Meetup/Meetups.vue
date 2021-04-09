<template>
  <v-container>
    <v-row class="mt-4">
      <v-col class="white--text text-center" v-if="meetups.length === 0" cols="12">
        <h2> You do not have meetups</h2>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col  cols="12">
        <v-date-picker v-model="dateTest"></v-date-picker>
        <v-btn @click="showDate">jgrtgo</v-btn>
      </v-col>
    </v-row>
    <v-row v-for="meetup in meetups" :key="meetup.id">
      <v-col cols="12">
        <v-card class="mt-5 primary" dark>
          <v-container fluid>
            <v-row>
              <v-col cols="5">
                <v-img
                  height="200px"
                  contain
                  :src="meetup.imageUrl"
                ></v-img>
              </v-col>
              <v-col cols="7">
                <v-card-title>
                  <div class="d-block">
                    <div>{{meetup.title}}</div>
                    <div>{{meetup.date}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn :to="'/meetups/' + meetup.id" text>
                    <v-icon left>mdi-eye-outline</v-icon>
                    View meetup
                  </v-btn>
                  <v-btn text>
                    <v-icon left>mdi-pail-outline</v-icon>
                    Delete meetup
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Meetups",
  data() {
    return {
      dateTest: new Date().toISOString().substr(0, 10),
    }
  },
  methods: {
    showDate(){
      let date0 = new Date()
      let year = new Date(this.dateTest).getFullYear()
      console.log(this.dateTest)
      console.log(year)
      console.log(date0)

    }

  },
  computed:{
    meetups(){
      return this.$store.getters.loadedMeetups
    }
  }
};
</script>

<style scoped>
</style>
