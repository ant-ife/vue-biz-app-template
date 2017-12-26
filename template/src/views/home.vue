<template>
  <div class="home">
    <header>
      <icon name="logo"/>
    </header>
    <section>
      <p class="title">{{ 'index.title' | gettext }}</p>
      <typer :slogans="slogans"/>
    </section>
    <section>
      <p class="title">{{ 'index.bizapp' | gettext }}</p>
      <div v-for="name in bizApps" :key="name" >
        <router-link :to="{path: name}">
          {{ name }}
        </router-link>
      </div>
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
          'Click the biz-apps below',
          'It will jump to the corresponding path',
          'Why biz-app cashier is NOT FOUND!',
          'Because it is not be composed!',
          'You need run `npm compose` first for running cashier',
        ],
        bizApps: [ 'autodebit', 'cashier' ],
        date: '',
      }
    },

    components: {
      typer,
    },

    async created () {
      jsbridge.rpc(API_INIT, { timestamp: new Date() }, (res) => {
        console.log(JSON.stringify(res, null, 2))
        this.date = res.data
      })

      await request(`api/${API_INIT}`)
    },

    methods: {
      go () {
        jsbridge.pushWindow('about.html')
      },

      num (x) {
        return x
      },
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
