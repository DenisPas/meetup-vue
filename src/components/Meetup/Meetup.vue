<template>
  <v-container>
    <v-row class="mt-3" v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card color="primary">
          <v-card-title class="justify-center mt-2 white--text">
            <h2>
              {{ meetup.title }}
            </h2>
          </v-card-title>
          <v-img contain height="300px" :src="meetup.imageUrl"></v-img>
          <v-card-text class="ml-4 mt-2">
            <div class="white--text mb-3 subtitle-1">
              {{ $d(Date.parse(meetup.date)) }} - {{ meetup.location }}
            </div>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-date-dialog>

              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-time-dialog>
            </div>
            <div class="white--text subtitle-1 mt-3">
              Описание:
              <span>{{ meetup.description }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <template v-if="userIsCreator">
                <app-edit-meetup-details-dialog :meetup="meetup">
                </app-edit-meetup-details-dialog>
            </template>
            <app-meetup-register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator">
            </app-meetup-register-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  props: ["id"],
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
  },
};
</script>

<style scoped>
</style>
