<template>
    <v-row justify="center">
      <v-col
        xs="12"
        sm="12"
        md="10"
        lg="10"
      >
    <v-timeline dense>
      <v-timeline-item
        v-for="(content, i) in contents"
        :key="i"
        :color="content.color"
      >
        <v-card>
          <v-card-title class="title" v-text="content.title" />
          <v-card-text>
            {{ content.text }}
          </v-card-text>
          <v-card-actions>
            <a v-if="i == 0" href="https://line.me/R/ti/p/@476qfyrd"><img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0"></a>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
      </v-col>
    </v-row>
</template>

<script>
export default {
  data () {
    return {
      contents: [
        { title: 'LINE友達登録', text: 'まずは、LINE友達登録!', color: 'green' },
        { title: 'タスクセット', text: '曜日ごとのタスクと通知時間をセット!', color: '#ECD273' },
        { title: 'タスク確認', text: 'タスクの進行確認!', color: '#247BA0' },
        { title: '設定時間に通知', text: 'LINEでタスクの通知!', color: '#FF7854' }
      ]
    }
  } 
}
</script>
