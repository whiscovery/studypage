<template>
  <v-app>
    <v-app-bar
      absolute
      color="#000000"
      height="250"
      dark
      shrink-on-scroll
      prominent
      src="http://whiscovery.xyz/img/top.png"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn>
        <sign-in/>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
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
