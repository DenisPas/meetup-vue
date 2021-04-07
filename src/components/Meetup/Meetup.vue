<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" class="text-xs-center">
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
        <v-card>
          <v-card-title>
            <h6>
              {{ meetup.title }}
            </h6>
            <template v-if="userIsCreator">
              <v-spacer>
                <app-edit-meetup-details-dialog :meetup="meetup">
                </app-edit-meetup-details-dialog>
              </v-spacer>
            </template>
          </v-card-title>
          <v-img height="300px" :src="meetup.imageUrl"></v-img>
          <v-card-text>
            <div class="info--text">
              {{ $d(Date.parse(meetup.date)) }} - {{ meetup.location }}
            </div>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-time-dialog>
            </div>
            <div>
              {{ meetup.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
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
      return this.$store.getters.user.id === this.meetup.creator.id;
    },
  },
};
</script>

<style scoped>
</style>
