<template>
  <v-container fill-height>
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          height="100%"
          flat
        >
          <h1 class="font-weight-thin display-4 text-center">Route</h1>
          <v-card-subtitle class="text-center">- やるべきことを習慣化。-</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-row justify="center">
          <v-col cols="6">
            <v-list>
              <v-btn
                block
                outlined
                color="purple"
                @click="testSignIn()"
              >
                テストログイン
              </v-btn>
            </v-list>

            <v-list
              v-for="(btn, i) in buttons"
              :key="i"
            >
              <v-btn
                block
                outlined
                :to="btn.link"
                :color="btn.color"
                v-text="btn.name"
              />
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { name: '新規登録', link: '/signup', color: 'green'},
        { name: 'サインイン', link: '/signin', color: '#247BA0'},
      ]
    }
  },
  methods: {
    testSignIn() {
      const testUser = {
        email: 'test@example.com',
        password: 'password'
      }
      this.$store.dispatch('auth/signIn', testUser)
      this.setFlashMessage('テストユーザーでサインインしました！')
    },
    setFlashMessage(message) {
      this.$store.commit('flashMessage/setFlashMessage', { message })
    }
  }
}
</script>
