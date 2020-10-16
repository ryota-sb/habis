<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-text class="title">タスク(水)</v-card-text>
          <v-row dense>
            <v-col
              v-for="(task, i, index) in getTaskList()"
              :key="i"
              :cols="12"
            >
              <v-card>
                <v-card-text>
                  {{ task.content }} / {{ task.notification_time | moment }}開始
                  <v-btn text icon color="red" @click="deleteTask(task.id, index)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <!-- タスク追加フォーム -->
              <AddTask @add="createTask" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddTask from '../../components/AddTask.vue'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  components: { AddTask }, 
  mounted() {
    this.$store.dispatch('tasks/getTasksAction')
  },
  computed: {
    ...mapState({
      tasks: state => state.tasks.tasks.data,
      user_id: state => state.auth.user.id
    })
  },
  methods: {
    async createTask(newTask, time) {
      const user_id = this.user_id
      await this.$store.dispatch('tasks/createTaskAction', { newTask: newTask, week: "wednesday", time: time, user_id: user_id })
      this.$store.dispatch('tasks/getTasksAction')
    },
    async deleteTask(task_id, index) {
      await this.$store.dispatch('tasks/deleteTaskAction', { task_id, index })
      this.$store.dispatch('tasks/getTasksAction')
    },
    getTaskList() {
      const tasks = this.tasks
      const user_id = this.user_id
      if (tasks.length) {
        return tasks.filter(task => task.week == "wednesday" && task.user_id == user_id)
      }
    }
  },
  filters: {
    moment(date) {
      return moment(date).format('HH:mm')
    }
  }
}
</script>
