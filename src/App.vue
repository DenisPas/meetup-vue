<template>
  <div>
    <v-navigation-drawer v-model="sideNav"> </v-navigation-drawer>

    <v-toolbar>
      <v-toolbar-side-icon
        @click.stop="sidenav = !sideNav"
      ></v-toolbar-side-icon>
      <v-toolbar-title> Meetup-vue</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn>
          <v-icon left>mdi-account-supervisor</v-icon>
          View Meetups
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      sideNav: false,
    };
  },
};
</script>