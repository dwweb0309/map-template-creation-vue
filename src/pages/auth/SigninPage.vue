<template>
  <div>
    <router-link to="/" class="display-1 text-decoration-none font-weight-bold black--text">PROPEDIA</router-link>
    <v-card width="420" class="text-center mt-4 pa-2">
      <div class="display-1 text-center">Welcome</div>
      <div>Signin to continue</div>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation class="mt-4">
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            dense
            class="mt-2"
            :rules="[$rules.required, $rules.emailFormat]"
            @input="resetErrors"
            @keyup.enter="submit"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            outlined
            dense
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="[$rules.required]"
            class="mt-2"
            @input="resetErrors"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-alert
            v-if="errorMessage"
            dense
            text
            type="error"
            class="text-left"
          >{{ errorMessage.message }}</v-alert>
          <div class="text-right">
            <a href="#">Forgot Password?</a>
          </div>
          <v-btn
            :loading="isLoading"
            :disabled="isSignInDisabled"
            block
            color="primary"
            class="mt-4"
            @click="submit"
          >Sign In</v-btn>
          <div class="mt-6 mb-4">Or sign in with</div>
          <div>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-btn outlined block><v-icon left>{{ mdiGoogle }}</v-icon>Google</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn outlined block><v-icon left>{{ mdiFacebook }}</v-icon>Facebook</v-btn>
              </v-col>
            </v-row>
          </div>
          <div class="mt-4">
            <div>Don't you have an account?</div>
            <router-link to="/auth/signup" class="text-decoration-none font-weight-bold mt-2">Create an account</router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mdiGoogle, mdiFacebook } from '@mdi/js'

import { mapActions } from 'vuex'

export default {
  data: () => ({
    mdiGoogle,
    mdiFacebook,

    email: '',
    password: '',
    showPassword: false,
    isLoading: false,
    isSignInDisabled: false,
    isFormValid: true,
    errorMessage: null
  }),
  methods: {
    ...mapActions('auth', ['signIn']),
    async submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true

        try {
          await this.signIn({ email: this.email, password: this.password })

          this.$router.push('/view/list')
        } catch (err) {
          if (err.response && err.response.status) {
            this.errorMessage = err.response.data
          } else {
            this.errorMessage = { message: 'Something went wrong.' }
          }
        } finally {
          this.isLoading = false
        }
      }
    },
    resetErrors() {
      this.errorMessage = null
    }
  }
}
</script>