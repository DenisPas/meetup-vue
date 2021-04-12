<template>
  <v-container>
    <v-row class="mt-4">
      <v-col class="white--text text-center" v-if="meetups.length === 0" cols="12">
        <h2> You do not have meetups</h2>
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
                    <div>{{ meetup.title }}</div>
                    <div>{{ meetup.date }}</div>
                    <div>{{ meetup.time }}</div>
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
import { format } from 'date-fns'
export default {
  name: "Meetups",
  data() {
    return {
    }
  },
  methods: {
    convertTimeFromServer(date) {
      if (date) {
        const TIME_FORMAT = 'HH:mm';
        return format(date, TIME_FORMAT);
      }
      return null;
    }
  },
  computed:{
    meetups(){
      let meetups = this.$store.getters.loadedMeetups
      return meetups.map((meet)=> {
        let date = new Date()
        date.setTime(meet.date)
        let convertDate = date.toLocaleString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric'});
        let convertTime = this.convertTimeFromServer(date);
        return {...meet, date: convertDate, time: convertTime}
      })
    }
  }
};
</script>

<style scoped>
</style>
