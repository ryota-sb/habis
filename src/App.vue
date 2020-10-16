<template>
  <div id="app">
    <v-app>
      <Header />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'app',
  components: { Header }
}
</script>