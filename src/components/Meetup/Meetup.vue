<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{meetup.title}} </v-card-title>
          <v-img
            height="300px"
            :src="meetup.imageUrl"
          ></v-img>
          <v-card-text>
            <div class="info--text">{{ meetup.date }} - Moscow</div>
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
              exercitationem maxime porro nisi placeat, beatae veniam
              voluptatibus quam nobis recusandae molestiae quos perspiciatis,
              unde molestias ut. Voluptates, dolore nemo! Magnam!
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary"> Register </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  props:['id'],
  computed:{
    meetup(){
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
};
</script>

<style scoped>
</style>