<template>
  <v-container>
    <v-row v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-col cols="12">
        <v-card class="info mt-5" >
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
                    <v-icon left>mdi-play</v-icon>
                    View meetup
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
  computed:{
    meetups(){
      return this.$store.getters.loadedMeetups
    }
  }
};
</script>

<style scoped>
</style>