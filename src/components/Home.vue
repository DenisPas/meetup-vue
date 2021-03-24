<template>
<v-container class="mt-2">
  <v-row justify="center">
    <v-col cols="12" sm="2" class="text-xs-center text-sm-right">
      <v-btn class="primary"  large router to="/meetups">Explore Meetups</v-btn>
    </v-col>
    <v-col cols="12" sm="2" class="text-xs-center text-sm-right">
      <v-btn class="primary" large router to="/meetup/new">Create Meetup</v-btn>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>