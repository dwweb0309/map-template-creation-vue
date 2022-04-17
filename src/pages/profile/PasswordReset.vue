<template>
  <div>
    <div class="text-h6">Change Password</div>
    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <v-row class="mt-4">
        <v-col cols="12" md="4">
          <label for="original-password">Original Password</label>
          <v-text-field
            id="original-password"
            outlined
            dense
            type="password"
            v-model="originalPassword"
            :rules="[$rules.required]"
            @input="resetErrors"
            @keyup.enter="submit"
          />
        </v-col>
        <v-col cols="12" md="4">
          <label for="new-password">New Password</label>
          <v-text-field
            id="new-password"
            outlined
            dense
            type="password"
            v-model="newPassword"
            :rules="[$rules.required]"
            @input="resetErrors"
            @keyup.enter="submit"
          />
        </v-col>
        <v-col cols="12" md="4">
          <label for="password-confirm">Confirm New Password</label>
          <v-text-field
            id="password-confirm"
            outlined
            dense
            type="password"
            v-model="passwordConfirm"
            @input="resetErrors"
            @keyup.enter="submit"
          />
        </v-col>
      </v-row>
      <v-alert
        v-if="errorMessage"
        dense
        text
        type="error"
      >
        {{ errorMessage }}
      </v-alert>
      <v-btn color="primary" @click="submit" :loading="loading">Save Changes</v-btn>
      <v-btn outlined class="ml-2">Cancel Changes</v-btn>
    </v-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      loading: false,
      originalPassword: '',
      newPassword: '',
      passwordConfirm: '',
      isFormValid: false,
      errorMessage: null
    }
  },
  methods: {
    ...mapActions('auth', ['resetPassword']),
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true

          await this.resetPassword({
            originalPassword: this.originalPassword,
            newPassword: this.newPassword,
            passwordConfirm: this.passwordConfirm
          })
        } catch (err) {
          if (err.response && err.response.status) {
            this.errorMessage = err.response.data.message
          } else {
            this.errorMessage = 'Something went wrong.'
          }
        } finally {
          this.loading = false
        }
      }
    },
    resetErrors() {
      this.errorMessage = null
    }
  }
}
</script>
