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
          <h1 class="text-center font-weight-thin">新規登録</h1>
          <v-col>
            <v-form
              ref="valid_form"
              v-model="valid"
            >
              <v-text-field
                v-model="name"
                label="Name"
                color="#247BA0"
                :rules="nameRules"
              />
              <v-text-field
                v-model="email"
                label="Email"
                color="#247BA0"
                :rules="emailRules"
              />
              <v-text-field
                v-model="password"
                label="password"
                color="#247BA0"
                :rules="passwordRules"
                append-icon="eye-off"
              />
            </v-form>
            <v-row class="float-right">
              <v-btn dark color="#247BA0" @click="signUp()">登録</v-btn>
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
  data() {
    return {
      title: 'ユーザー登録',
      name: '',
      email: '',
      password: '',
      nameRules: [
        v => !!v || "名前は必須項目です",
        v => v.length <= 20 || "名前は20文字以内で入力してください"
      ],
      emailRules: [
        v => !!v || "メールアドレスは必須項目です",
        v => /.+@.+\..+/.test(v) || "メールアドレスの形式が正しくありません。"
      ],
      passwordRules: [
        v => !!v || "パスワードは必須項目です",
        v => v.length >= 8 || "パスワードは8文字以上で入力してください"
      ],
      valid: true,
      loading: false,
      overlay: false
    }
  },
  methods: {
    signUp() {
      const params = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      if (this.$refs.valid_form.validate()) {
        this.overlay = true
        this.$store.dispatch('auth/signUp', params)
        this.name = ''
        this.email = ''
        this.password = ''
        this.overlay = false
      }
      this.setFlashMessage('登録を完了してサインインしました！')
    },
    setFlashMessage(message) {
      this.$store.commit('flashMessage/setFlashMessage', { message })
    }
  }
}
</script>
