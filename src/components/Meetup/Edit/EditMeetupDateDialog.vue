<template>
  <v-dialog width="350px" persistent v-model="editDialog" transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
    <v-btn accent v-on="on" v-bind="attrs">
      Edit Date
    </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-text>Edit Meetup Date</v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
              <template>
                <v-btn text class="blue--text darken-1" @click.native="editDialog = false">
                  Close
                </v-btn>
                <v-btn text class="blue--text darken-1" @click.native="onSaveChanges">
                  Save
                </v-btn>
              </template>
            </v-date-picker>
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
      editableDate: null,
      editTitle: this.meetup.title,
      editDescription: this.meetup.description
    }
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate

      })
    }
  },
  created() {
    this.editableDate = new Date(this.meetup.date)
  }
};
</script>
