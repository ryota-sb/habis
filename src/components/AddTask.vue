<template>
  <v-row justify="center" dense>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-col :cols="12">
          <v-btn
            absolute
            right
            fab
            dark
            dense
            color="#247BA0"
            class="mb-5"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </template>
      <v-card>
        <v-toolbar
          color="#247BA0"
          dark
          dense
          flat
        >
          <v-toolbar-title>タスク追加</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pb-0">
          <v-row>
            <v-col>
              <v-form ref="valid_form">
                <v-text-field
                  v-model="newTask"
                  label="タスクを入力して下さい"
                  color="#247BA0"
                  :rules="[required_content, limit_length]"
                  counter="40"
                >
                </v-text-field>
                <template>
                  <v-row>
                    <v-col>
                      <v-dialog
                        ref="dialog"
                        v-model="modal2"
                        :return-value.sync="time"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="time"
                            label="タスクの開始時間を入力してください"
                            color="#247BA0"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="modal2"
                          v-model="time"
                          full-width
                          ampm-in-title
                          color="#247BA0"
                        >
                          <v-btn text color="#247BA0" @click="modal2 = false">閉じる</v-btn>
                          <v-spacer />
                          <v-btn text color="#247BA0" @click="$refs.dialog.save(time)">追加</v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </template>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="#247BA0" text @click="dialog = false">閉じる</v-btn>
          <v-spacer />
          <v-btn
            color="#247BA0"
            text
            :disabled="newTask && time ? disabled = false : disabled"
            @click="addTask()"
          >
            追加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      disabled: true,
      time: null,
      menu2: false,
      modal2: false,
      newTask: '',
      required_content: value => !!value || '入力してください',
      limit_length: value => value.length <= 40 || '40文字以内で入力してください',
    }
  },
  methods: {
    addTask() {
      if (this.$refs.valid_form.validate()) {
        this.$emit('add', this.newTask, this.time)
        this.time = ''
        this.newTask = ''
        this.dialog = false
        this.disabled = true
      }
    }
  }
}
</script>
