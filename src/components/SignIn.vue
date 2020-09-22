<template>
  <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
  <v-menu offset-y v-else-if="!$store.state.fireUser">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">
          <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>로그인</v-card-title>
      <v-divider/>
      <v-card-action>
        <router-link to="/login"><v-btn dark block>Login with email</v-btn></router-link>
      </v-card-action>
      <v-card-actions>
        <v-btn color="red" dark @click="signInWithGoogle" block><v-icon left>mdi-google</v-icon> 구글로 로그인</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn color="red" dark @click="signInWithFacebook" block><v-icon left>mdi-google</v-icon> 페이스북으로 로그인</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
  <v-menu offset-y v-else>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar size="32">
          <v-img :src="$store.state.fireUser.photoURL"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>정보</v-card-title>
      <v-card-actions>
        <v-btn color="" dark @click="signOut" block>로그아웃</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async signInWithGoogle () {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase.auth().languageCode = 'ko'
      this.loading = true
      try {
        const sn = await this.$firebase.auth().signInWithPopup(provider)
        this.$store.commit('setFireUser', sn.user)
      } finally {
        this.loading = false
        this.$router.replace('Home')
      }
    },
    signOut () {
      this.$firebase.auth().signOut()
      alert('로그아웃')
      this.$router.replace('login')
    },
    signInWithFacebook () {
      var provider = new this.$firebase.auth.FacebookAuthProvider()
      provider.addScope('pubic_profile')
      provider.setCustomParameters({
        display: 'popup'
      })
      this.$firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken
        var user = result.user
        console.log('token:' + token)
        console.log('user :' + user)
        this.$router.replace('home')
      }).catch((err) => {
        alert(err.message)
      })
    }
  }
}
</script>
