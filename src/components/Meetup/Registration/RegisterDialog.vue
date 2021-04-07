<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn primary accent slot="activator">
      {{ userIsRegistered? 'Unregistered' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-text v-if="userIsRegistered">Unregister from Meetup?</v-card-text>
            <v-card-text v-else>Register from Meetup?</v-card-text>
          </v-col>
        </v-row>
        <d-divider></d-divider>
        <v-row>
          <v-col cols="12">
          <v-card-text>
            You can always change your decision later on.
          </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card-actions>
             <v-btn class="red--text darken-1" @click="registerDialog = false">Confirm</v-btn>
             <v-btn class="green--text darken-1" @click="onAgree">Cancel</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  name: "RegisteredDialog",
  data(){
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered() {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    onAgree() {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
        } else {
          this.$store.dispatch('registerUserForMeetup', this.meetupId)
        }
    }
  }
};
</script>
