import axios from 'axios'
import RestAPI from '../../plugins/rest_api'


const tasks = {
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
      state.tasks.data.push(value)
    },
    updateTask(state, value) {
      state.tasks = value
    },
    deleteTask(state, index) {
      state.tasks.data.splice(index, 1)
    }
  },
  actions: {
    async getTasksAction({ commit, rootState }) {
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.get('/api/v1/tasks', { headers: rootState.auth.auth  } ).then((response) => {
        commit('getTasks', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async createTaskAction({ commit, rootState }, { newTask, week, time, user_id }) {
      if (newTask == null || newTask.length > 40) return
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.post('/api/v1/tasks', { task: { content: newTask, week: week, notification_time: time, user_id: user_id } }, { headers: rootState.auth.auth  }).then((response) => {
        commit('createTask', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async updateTaskAction({ commit, rootState }, { task_id }) {
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.put('/api/v1/tasks/' + task_id, { headers: rootState }).then((response) => {
        commit('updateTask', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async deleteTaskAction({ commit, rootState }, { task_id, index }) {
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.delete('/api/v1/tasks/' + task_id, { headers: rootState.auth.auth }).then((response) => {
        commit('deleteTask', index)
        console.log(response.data.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

export default tasks
