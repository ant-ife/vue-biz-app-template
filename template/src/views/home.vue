<template>
  <div class="home">
    <header>
      <icon name="logo"/>
    </header>
    <section>
      <p class="title">{{ 'index.title ' | gettext }}</p>
      <typer :slogans="slogans"/>
      {{ 'not.found' | gettext }}
    </section>
    <section>
      <p v-html="msg"></p>
      <p v-html="learn"></p>
    </section>
    <p style="text-align: center">{{ date }}</p>
  </div>
</template>

<script>
  import jsbridge from '~utils/jsbridge'
  import typer from '~components/typer.vue'
  import { API_INIT } from '~constants/apis'
  import request from '~utils/request'

  export default {
    data () {
      return {
        slogans: [
          'This project scaffold is powered by apfe cli',
        ],
        date: '',
      }
    },

    components: {
      typer,
    },

    async mounted () {
      jsbridge.rpc(API_INIT, { timestamp: new Date() }, (res) => {
        console.log(JSON.stringify(res, null, 2))
        this.date = res.data
      })

      await request(`api/${API_INIT}`)
    },

    methods: {
    },

    computed: {
      msg () {
        return this.gettext('index.msg')
      },

      learn () {
        return this.gettext('index.learn')
      },
    },
  }
</script>
