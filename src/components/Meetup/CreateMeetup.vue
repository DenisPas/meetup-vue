<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h4>Create meetup</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form @submit.prevent="onCreateMeetup">
          <v-row>
            <v-col cols="12" sm="6" offset-md="3">
              <v-text-field
                label="Title*"
                id="title"
                v-model="title"
                :rules="[rules.required]"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-md="3">
              <v-text-field
                label="Location*"
                id="location"
                v-model="location"
                :rules="[rules.required]"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-md="3">
              <v-text-field
                label="Image URL*"
                id="imageUrl"
                v-model="imageUrl"
                :rules="[rules.required]"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-md="3">
              <v-img :src="imageUrl" height="150"> </v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-md="3">
              <v-textarea
                label="Discription*"
                id="discription"
                v-model="discription"
                :rules="[rules.required]"
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-md="3">
              <h4>Choose date and time</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-md="3">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Date"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <div></div>
          <v-row>
            <v-col cols="12" sm="6" offset-md="3">
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    label="Picker in menu"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="time"
                  full-width
                  format="24hr"
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-md="3">
              <v-btn type="submit " :disabled="!formIsValid"
                >Create meetup</v-btn
              >
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CreateMeetup",
  data(vm) {
    return {
      title: "",
      location: "",
      discription: "",
      imageUrl: "",
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      time: null,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        (this.discription !== "") & (this.imageUrl !== "")
      );
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${day.padStart(2, "0")}-${month.padStart(2, "0")}`;
    },
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        discription: this.discription,
        date: this.date,
        time: this.time,
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push["/meetups"];
    },
  },
};
</script>

<style scoped>
</style>
