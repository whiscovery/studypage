<template>
  <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>로그인</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
                >

                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                ></v-text-field>

                <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                ></v-checkbox>

                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
                >
                    Validate
                </v-btn>

                <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
                >
                    Reset Form
                </v-btn>
                <v-btn
                    color="warning"
                    @click="sendLoginForm"
                >
                    Login
                </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    checkbox: false,
    lazy: false
  }),

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    sendLoginForm () {
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          alert('회원 가입 완료')
          this.$router.replace('Home')
        },
        function (err) {
          alert('에러' + err.message)
        }
      )
    }
  }
}
</script>
