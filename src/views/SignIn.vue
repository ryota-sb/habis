<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar
            color="#FF7854"
            dark
            flat
            dense
          >
            <v-toolbar-title v-text="title" />
          </v-toolbar>
          <v-col>
            <v-form ref="valid_form">
              <v-text-field
                v-model="email"
                label="メールアドレス"
                color="#70C1B3"
              />
              <v-text-field
                v-model="password"
                label="パスワード"
                color="#70C1B3"
              />
            </v-form>
            <v-btn block @click="signIn()">ログイン</v-btn>
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
  data() {
    return {
      title: 'ログイン',
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
      if (this.$refs.valid_form.validate()) {
        this.overlay = true
        this.$store.dispatch('auth/signIn', params)
        this.email = ''
        this.password = ''
        this.overlay = false
      }
    }
  }
}
</script>
