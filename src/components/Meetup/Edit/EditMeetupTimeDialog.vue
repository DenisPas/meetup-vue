<template>
  <v-dialog width="350px" persistent v-model="editDialog" transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
    <v-btn color="btnColor" class="white--text mr-4" accent v-on="on" v-bind="attrs">
      Edit Time
    </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-card-text class="text-h5">Edit Meetup Time</v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
              <template>
                <v-btn text class="blue--text darken-1" @click.native="editDialog = false">
                  Close
                </v-btn>
                <v-btn text class="blue--text darken-1" @click.native="onSaveChanges">
                  Save
                </v-btn>
              </template>
            </v-time-picker>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: ['meetup'],
  name: "Meetups",
  data() {
    return {
      editDialog: false,
      editableTime: null,
      editTitle: this.meetup.title,
      editDescription: this.meetup.description
    }
  },
  methods: {
    onSaveChanges() {
      let newDate = new Date(this.meetup.date)
      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate.getTime()
      })
    },
  },
  created() {
    this.editableTime = this.meetup.time
  }
};
</script>
