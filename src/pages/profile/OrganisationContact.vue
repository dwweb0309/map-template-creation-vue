<template>
  <div>
    <div class="text-h6">Organisation Contact</div>
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <label for="first-name">First Name</label>
        <v-text-field
          id="first-name"
          outlined
          dense
          hide-details
          v-model="firstName"
          @input="resetErrors"
          @keyup.enter="submit"
        />
      </v-col>
      <v-col cols="12" md="6">
        <label for="last-name">Last Name</label>
        <v-text-field
          id="last-name"
          outlined
          dense
          hide-details
          v-model="lastName"
          @input="resetErrors"
          @keyup.enter="submit"
        />
      </v-col>
      <v-col cols="12" md="6">
        <label for="contact-mobile">Contact Mobile</label>
        <v-text-field
          id="contact-mobile"
          outlined
          dense
          hide-details
          v-model="contactMobile"
          @input="resetErrors"
          @keyup.enter="submit"
        />
      </v-col>
      <v-col cols="12" md="6">
        <label for="contact-email">Contact Email</label>
        <v-text-field
          id="contact-email"
          outlined
          dense
          hide-details
          v-model="contactEmail"
          @input="resetErrors"
          @keyup.enter="submit"
        />
      </v-col>
    </v-row>
    <div class="mt-4">
      <v-btn color="primary" @click="submit" :loading="loading">Save Changes</v-btn>
      <v-btn outlined class="ml-2">Cancel Changes</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      loading: false,
      firstName: '',
      lastName: '',
      contactMobile: '',
      contactEmail: '',
      errorMessage: null
    }
  },
  methods: {
    ...mapActions('auth', ['saveOrganizationContact']),
    async submit() {
      try {
        this.loading = true

        await this.saveOrganizationContact({
          firstName: this.firstName,
          lastName: this.lastName,
          contactMobile: this.contactMobile,
          contactEmail: this.contactEmail
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
    },
    resetErrors() {
      this.errorMessage = null
    }
  }
}
</script>
