<template>
  <div id="app">
    <v-app>
      <Header />
      <v-main>
        <router-view />
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    Header, Footer
  }
}
</script>