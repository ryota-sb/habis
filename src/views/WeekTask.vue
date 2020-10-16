<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col
          v-for="(week, i) in dayOfWeeks"
          :key="i"
          :cols="12"
        >
          <v-btn
            block
            outlined
            large
            :color="week.color"
            :to="week.link"
            v-text="week.name"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'WeekTask',
  data() {
    return {
      dayOfWeeks: [
        { name: '月曜日', label: 'monday',    color: 'purple', link: '/monday' },
        { name: '火曜日', label: 'tuesday',   color: 'purple', link: '/tuesday' },
        { name: '水曜日', label: 'wednesday', color: 'purple', link: '/wednesday' },
        { name: '木曜日', label: 'thursday',  color: 'purple', link: '/thursday' },
        { name: '金曜日', label: 'friday',    color: 'purple', link: '/friday' },
        { name: '土曜日', label: 'saturday',  color: '#247BA0', link: '/saturday' },
        { name: '日曜日', label: 'sunday',    color: '#FF7854', link: '/sunday' }
      ]
    }
  }
}
</script>