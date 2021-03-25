<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="info mt-5">
          <v-container fluid>
            <v-row>
              <v-col cols="5">
                <v-img
                  height="200px"
                  contain
                  src="https://image.freepik.com/free-photo/st-basil-s-cathedral-red-square-moscow-russia-night_118086-2313.jpg"
                ></v-img>
              </v-col>
              <v-col cols="7">
                <v-card-title>
                  <div class="d-block">
                    <div>My meetup</div>
                    <div>18 th December 2021</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn to="/meetups/1" text>
                    <v-icon left>mdi-play</v-icon>
                    View meetup
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Meetups",
};
</script>

<style scoped>
</style>