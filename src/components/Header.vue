<template>
  <div>
    <v-app-bar app dense clipped-left color="white">
      <v-toolbar-title class="font-weight-thin" v-text="title" />
      <v-spacer />
      <v-app-bar-nav-icon @click="drawer=!drawer" class="float--right" />
    </v-app-bar>
    <v-navigation-drawer
      app
      
      v-model="drawer"
      :right="true"
    >
      <v-card flat>
        <div v-if="auth">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="user" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
        </div>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="list in nav_lists"
            :key='list.name'
            :to="list.link"
          >
            <v-list-item-icon>
              <v-icon v-text="list.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="list.name" />
            </v-list-item-content>
          </v-list-item>
          
          <div v-if="auth">
            <v-list-item
              v-for="list in nav_lists_auth"
              :key='list.name'
              :to="list.link"
            >
              <v-list-item-icon>
                <v-icon v-text="list.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="list.name" />
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-card>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn 
            block
            v-if="auth"
            @click="signOut"
          >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: 'Route',
      drawer: false,
      nav_lists: [
        { name: 'トップ',             icon: 'mdi-home',            link: '/' },
        { name: 'アプリについて',     icon: 'mdi-information-outline', link: '/about' },
      ],
      nav_lists_auth: [
        { name: 'タスクセット', icon: 'mdi-calendar-edit', link: '/weektask' },
        { name: '今日のタスク',       icon: 'mdi-calendar',       link: '/todaytask' }
      ]
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth.auth,
      user: state => state.auth.user.name
    })
  },
  methods: {
    signOut() {
      const params = this.auth
      this.$store.dispatch('auth/signOut', params)
    }
  }
}
</script>
