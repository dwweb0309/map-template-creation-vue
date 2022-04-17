<template>
  <div>
    <router-link to="/" class="display-1 text-decoration-none font-weight-bold black--text">PROPEDIA</router-link>
    <v-card width="420" class="text-center mt-4 pa-2">
      <div class="display-1 text-center">Welcome</div>
      <div>Sign up to continue</div>
      <v-card-text>
        <v-form ref="form" lazy-validation class="mt-4">
          <v-text-field
            v-model="username"
            label="Username"
            outlined
            dense
            class="mt-2"
            @keyup.enter="submit"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            dense
            class="mt-2"
            @keyup.enter="submit"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            outlined
            dense
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            class="mt-2"
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
          <v-btn
            :loading="isLoading"
            block
            color="primary"
            class="mt-4"
            @click="submit"
          >Sign Up</v-btn>
          <div class="mt-4">
            <div>Do you have an account?</div>
            <router-link to="/auth/signin" class="text-decoration-none font-weight-bold mt-2">Sign In now</router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isLoading: false,
      username: '',
      email: '',
      password: '',
      showPassword: false,
      errorMessage: null
    }
  },
  methods: {
    ...mapActions('auth', ['signUp']),
    async submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true

        try {
          await this.signUp({ username: this.username, email: this.email, password: this.password })

          this.$router.push('/view/list')
        } catch (err) {
          if (err.response && err.response.status) {
            this.errorMessage = err.response.data
          } else {
            this.errorMessage = 'Something went wrong.'
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