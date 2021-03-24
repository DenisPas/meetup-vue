<template>
  <v-container class="mt-2">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
        class="text-sm-right text-md-right text-lg-right text-center"
      >
        <v-btn class="primary" large router to="/meetups"
          >Explore Meetups</v-btn
        >
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
        class="text-sm-left text-md-left text-lg-left text-center"
      >
        <v-btn class="primary" large router to="/meetup/new"
          >Create Meetup</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-carousel height="400">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
          >
            <div class="title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <p>Join our awesome meetups!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    meetups: [
      {
        imageUrl:
          "https://anotherrussia.com/upload/medialibrary/ff9/moscow-saint-petersburg-1.jpg",
        id: "2345",
        title: "Saint Petersburg",
      },
      {
        imageUrl:
          "https://image.freepik.com/free-photo/st-basil-s-cathedral-red-square-moscow-russia-night_118086-2313.jpg",
        id: "234555",
        title: "Moscow",
      },
    ],
  }),
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 2em;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>