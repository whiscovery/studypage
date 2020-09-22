<template>
  <v-app id="app">
    <v-app-bar
      absolute
      color="#000000"
      height="250"
      dark
      shrink-on-scroll
      prominent
      src=""
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Belluminar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn>
        <sign-in/>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SignIn from '@/components/SignIn'

export default {
  name: 'App',

  components: {
    SignIn
  },
  data () {
    return {
      site: {}
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const v = sn.val()
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
          return
        }
        this.site = v
      }, (e) => {
        console.log(e.message)
      })
    }
  }
}
</script>
