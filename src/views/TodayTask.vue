<template>
  <v-container>
    <!-- タスク表示 -->
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-text class="title">今日のタスク</v-card-text>
          <v-container>
            <v-row dense>
              <v-col
                v-for="(task, i) in getTaskList()"
                :key="i"
                :cols="12"
              >
                <v-card>
                  <v-card-text>
                    <v-btn text icon @click="updateTask(task.id)">
                      <v-icon v-if="task.is_done == false" color="gray">mdi-circle-outline</v-icon>
                      <v-icon v-if="task.is_done == true" color="green">mdi-check-circle-outline</v-icon>
                    </v-btn>
                    {{ task.content }} / {{ task.notification_time | moment }}開始
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
export default {
 
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
    async updateTask(task_id) {
      await this.$store.dispatch('tasks/updateTaskAction', { task_id })
      this.$store.dispatch('tasks/getTasksAction')
    },
    async deleteTask(task_id, index) {
      await this.$store.dispatch('tasks/deleteTaskAction', { task_id, index })
      this.$store.dispatch('tasks/getTasksAction')
    },
    getTaskList() {
      const todayWeek = this.getWeek()
      const tasks = this.tasks
      const user_id = this.user_id
      if (tasks.length) {
        return tasks.filter(task => task.week == todayWeek && task.user_id == user_id)
      }
    },
    getWeek() {
      const date = new Date()
      const week = date.getDay()
      const weeks = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      return weeks[week]
    }
  },
  filters: {
    moment(date) {
      return moment(date).format('HH:mm')
    }
  }
}
</script>