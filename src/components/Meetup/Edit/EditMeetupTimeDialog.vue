<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-text>Edit Meetup Time</v-card-text>
          </v-col>
        </v-row>
        <d-divider></d-divider>
        <v-row>
          <v-col cols="12">
            <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
              <template>
                <v-btn flat class="blue--text darken-1" @click.native="editDialog = false">
                  Close
                </v-btn>
                <v-btn flat class="blue--text darken-1" @click.native="onSaveChanges">
                  Save
                </v-btn>
              </template>
            </v-time-picker>
          </v-col>
        </v-row>
        <d-divider></d-divider>
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
      const newDate = new Date(this.meetup.date)
      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created() {
    this.editableTime = new Date(this.meetup.date).toTimeString()
  }
};
</script>
