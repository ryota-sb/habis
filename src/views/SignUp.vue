<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert
          border="left"
          color="#247BA0"
          dark
        >
          登録が完了しました！
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-toolbar
            color="#247BA0"
            dark
            flat
            dense
          >
            <v-toolbar-title v-text="title" />
          </v-toolbar>
          <v-col>
            <v-form
              ref="valid_form"
              v-model="valid"
            >
              <v-text-field
                v-model="name"
                label="ユーザー名"
                color="#70C1B3"
                counter="20"
                :rules="nameRules"
              />
              <v-text-field
                v-model="email"
                label="メールアドレス"
                color="#70C1B3"
                :rules="emailRules"
              />
              <v-text-field
                v-model="password"
                label="パスワード"
                color="#70C1B3"
                counter="8"
                :rules="passwordRules"
                append-icon="eye-off"
              />
            </v-form>
            <v-btn block @click="signUp()">登録</v-btn>
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
  name: 'signup',
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
    }
  }
}
</script>
