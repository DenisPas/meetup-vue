<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <v-toolbar color="deep-purple" dark>
          <v-app-bar-nav-icon
            class="hidden-sm-and-up"
            @click="drawer = true"
          ></v-app-bar-nav-icon>

          <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer">
              Title
            </router-link>
          </v-toolbar-title>
          <v-spacer> </v-spacer>
          <v-toolbar-items class="hidden-xs-only">
            <v-btn
              text
              v-for="item in menuItems"
              :key="item.title"
              :to="item.link"
            >
              <v-icon left>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>


            <v-btn text @click="onLogout" v-if="userIsAuthenticated">
              <v-icon left>mdi-exit-to-app</v-icon>
              Logout
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" absolute height="400" temporary>
          <v-list nav dense>
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>


              <v-list-item @click="onLogout" v-if="userIsAuthenticated">
                <v-list-item-icon>
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>
      <main>
        <router-view> </router-view>
      </main>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    onLogout() {
      console.log('logout')
      this.$store.dispatch('onLogout');
    },
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-face", title: "Sign up", link: "/signup" },
        { icon: "mdi-lock-open", title: "Sign in", link: "/signin" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-account-multiple",
            title: "View Meetups",
            link: "/meetups",
          },
          {
            icon: "mdi-map-marker",
            title: "Organize Meetup",
            link: "/meetup/new",
          },
          { icon: "mdi-account", title: "Profile", link: "/profile" },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      console.log('check')
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
};
</script>
