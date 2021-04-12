<template>
  <v-container>
    <v-row class="justify-center mt-5">
      <v-col cols="8" sm="6" class="text-center">
        <h1 class="white--text">Create meetup</h1>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="8">
        <form @submit.prevent="onCreateMeetup">
          <v-row>
            <v-col cols="8" sm="6" offset-md="3">
              <v-text-field
                label="Title*"
                id="title"
                dark
                v-model="title"
                :rules="[rules.required]"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" sm="6" offset-md="3">
              <v-text-field
                label="Location*"
                id="location"
                dark
                v-model="location"
                :rules="[rules.required]"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="8" sm="6" class="text-center">
              <v-btn raised class="primary" @click="onPickFile"
              >Upload images</v-btn
              >
            </v-col>
          </v-row>
          <v-row class="text-center" v-if="!imageUrl" >
            <v-col>
              <div class="red--text">Select image!</div>
            </v-col>
          </v-row>
          <v-row class="justify-center" style="display: none">
            <v-col cols="8" sm="6" offset-md="3">
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
            </v-col>
          </v-row>
          <v-row v-if="imageUrl !== ''">
            <v-col cols="8" sm="6" offset-md="3">
              <v-img :src="imageUrl" height="250"> </v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" sm="6" offset-md="3">
              <v-textarea
                label="Description*"
                id="description"
                dark
                v-model="description"
                :rules="[rules.required]"
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="8" sm="6" class="text-center">
              <h3 class="white--text">Choose date and time</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" sm="6" offset-md="3">
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
                    hint="DD/MM/YYYY format"
                    persistent-hint
                    dark
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
          <v-row class="text-center" v-if="isWrongDate">
            <v-col>
              <div class="red--text">Date must be more then current date!</div>
            </v-col>
          </v-row>
          <div></div>
          <v-row>
            <v-col cols="8" sm="6" offset-md="3">
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
                    label="Select time"
                    dark
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
          <v-row class="justify-center mb-5">
            <v-col cols="12" sm="6" class="text-center">
              <v-btn class="primary" type="submit " :disabled="!formIsValid"
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
import { format, parse } from 'date-fns'
export default {
  name: "CreateMeetup",
  data(vm) {
    return {
      title: "",
      location: "",
      description: "",
      imageUrl: "",
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      time: null,
      isWrongDate: false,
      image: null,
      dateToServer: '',
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
        (this.description !== "") & (this.imageUrl !== "")
      );
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
        if (this.date && this.time) {
          this.updateDate(this.date + 'T' + this.time);
        }
    },
    time() {
      if (this.date && this.time) {
        this.updateDate(this.date + 'T' + this.time);
      }
    },
  },
  methods: {
    updateDate(date) {
    const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';
    const DATE_TIME_LONG_FORMAT = "yyyy-MM-dd'T'HH:mm";
    const currentDate = format(new Date(), DATE_TIME_FORMAT);
    const updatedDate = format(new Date(date), DATE_TIME_FORMAT);

    if (currentDate > updatedDate) {
      this.isWrongDate = true;
      return;
    }

    this.isWrongDate = false;

    if (date) {
      this.dateToServer = parse(date, DATE_TIME_LONG_FORMAT, new Date());
      this.dateToServer = this.dateToServer.getTime()
    } else {
      this.dateToServer = null;
    }
  },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
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
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.dateToServer,
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
  },
};
</script>

<style scoped>
</style>
