<template>
  <v-row
    justify="center"
  >
    <v-col
      v-if="message"
      xs="10"
      sm="10"
      md="10"
      lg="10"
    >
      <v-alert
        dense
        text
        type="success"
        class="ma-0"
        v-text="message"
      />
    </v-col>
    <v-spacer v-else />
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      message: state => state.flashMessage.message
    })
  }
}
</script>
