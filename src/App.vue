<template>
  <div id="app">
    <v-app id="inspire">
      <v-card
          height="400"
      >
        <v-app-bar
            color="deep-purple"
            dark
        >
          <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = true"></v-app-bar-nav-icon>

          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer>
          </v-spacer>
          <v-toolbar-items  class="hidden-xs-only">
            <v-btn text>
              <v-icon left>mdi-account</v-icon>
              View Meetups
            </v-btn>
          </v-toolbar-items>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
        >
          <v-list
              nav
              dense
          >
            <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
}
</script>