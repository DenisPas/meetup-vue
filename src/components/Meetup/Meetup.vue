<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h6>
              {{ meetup.title }}
            </h6>
            <template v-if="userIsCreator">
              <v-spacer>
                <app-edit-meetup-details-dialog>
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
              {{ meetup.discription }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary"> Register </v-btn>
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
