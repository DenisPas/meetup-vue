<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>mdi-edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-text>Edit meetup</v-card-text>
          </v-col>
        </v-row>
        <d-divider></d-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text>
              <v-text-field
                  label="Title*"
                  id="title"
                  v-model="editTitle"
              >
              </v-text-field>
              <v-textarea
                  label="Description*"
                  id="description"
                  v-model="editDescription"
              >
              </v-textarea>
            </v-card-text>
          </v-col>
        </v-row>
        <d-divider></d-divider>
        <v-row>
          <v-col cols="12">
            <v-card-action>
              <v-btn @click="editDialog = false" flat class="blue--text darken-1">
                Close
              </v-btn>
              <v-btn @click="onSaveChanges" flat class="blue--text darken-1">
                Save
              </v-btn>
            </v-card-action>
          </v-col>
        </v-row>
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
      editTitle: this.meetup.title,
      editDescription: this.meetup.description
    }
  },
  methods: {
    onSaveChanges() {
      if( this.editTitle.trim() === '' || this.editDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetupData',{
        id: this.meetup.id,
        title:this.meetup.title,
        description:this.meetup.description,

      })
    }
  }
};
</script>
