<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col
        xs="12"
        sm="12"
        md="6"
        lg="6"
      >
        <v-card flat>
          <h1 class="text-center font-weight-thin" v-text="title" />
          <v-col>
            <v-form ref="valid_form">
              <v-text-field
                v-model="email"
                label="Email"
                color="#247BA0"
              />
              <v-text-field
                v-model="password"
                label="Password"
                color="#247BA0"
              />
            </v-form>
            <v-btn text class="pa-0">パスワードを忘れた方はこちら</v-btn>
            <v-row class="float-right">
              <v-btn dark text class="mr-2" color="green" to='/signup'>新規登録</v-btn>
              <v-btn dark color="#247BA0" @click="signIn()">サインイン</v-btn>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
    </v-row>

    <v-overlay :value="overlay">
      <v-progress-circular
        v-if="!loading"
        indeterminate
        :size="80"
        :width="10"
      />
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: 'サインイン',
      email: '',
      password: '',
      loading: false,
      overlay: false
    }
  },
  methods: {
    signIn() {
      const params = {
        email: this.email,
        password: this.password
      }
      this.overlay = true
      if (this.$refs.valid_form.validate()) {
        this.$store.dispatch('auth/signIn', params)
        this.email = ''
        this.password = ''
      }
      this.setFlashMessage('サインインしました！')
    },
    setFlashMessage(message) {
      this.$store.commit('flashMessage/setFlashMessage', { message })
    }
  }
}
</script>
