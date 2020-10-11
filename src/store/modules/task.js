import axios  from 'axios'
import router from '../../router/index'
import RestAPI from '../../plugins/rest_api'

export const tasks = {
  namespaced: true,
  state: {
    tasks: []
  },
  getters:{
    tasks: state => state.tasks
  },
  mutations: {
    getTasks(state, value) {
      state.tasks = value
    },
    createTask(state, value) {
      // state.tasks.push(value)
      console.log(value)
    },
    updateTask(state, value) {
      state.tasks = value
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1)
    }
  },
  actions: {
    async getTasksAction({ commit }) {
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.get('/api/v1/tasks').then((response) => {
        commit('getTasks', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async createTaskAction({ commit }, { newTask, week, time, user_id }) {
      if (newTask == null || newTask.length > 40) return
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.post('/api/v1/tasks', { task: { content: newTask, week: week, notification_time: time, user_id: user_id } }).then((response) => {
        commit('createTask', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async updateTaskAction({ commit }, { task_id }) {
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.put('/api/v1/tasks/' + task_id).then((response) => {
        commit('updateTask', response.data)
        router.go({ path: router.currentRoute.path, force: true })
      }).catch((error) => {
        console.log(error)
      })
    },
    async deleteTaskAction({ commit }, { task_id, index }) {
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.delete('/api/v1/tasks/' + task_id).then((response) => {
        commit('deleteTask', index)
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}