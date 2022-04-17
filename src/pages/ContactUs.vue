<template>
  <div class="d-flex flex-column flex-grow-1 justify-center contact">
    <v-row class="px-0 container" align="center">
      <v-col>
        <h1>Contact Us</h1>
        <p>Welcome, If You Have Any Other Questions!</p>
        <p><v-icon left color="white">{{ mdiEmailOutline }}</v-icon> propedia@example.com</p>
        <p><v-icon left color="white">{{ mdiPhone }}</v-icon> +0-000-111-222</p>
        <p class="mb-0"><v-icon left color="white">{{ mdiMapMarker }}</v-icon> New York,</p>
        <p class="ml-9">61 West Rock Maple Court</p>
      </v-col>
      <v-col>
        <v-card color="#191919" dark>
          <v-card-title>Send Us a Message</v-card-title>
          <v-card-text>
            <v-text-field outlined dense placeholder="Subject"></v-text-field>
            <v-text-field outlined dense placeholder="Email"></v-text-field>
            <v-textarea outlined dense placeholder="Message"></v-textarea>
            <div class="d-flex align-center">
              <div>By clicking "Send" you agree to our <strong>Primary Policy and Terms & conditions</strong></div>
              <v-spacer></v-spacer>
              <v-btn>Send</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiEmailOutline, mdiMapMarker, mdiPhone } from '@mdi/js'

export default {
  data: () => ({
    mdiEmailOutline,
    mdiMapMarker,
    mdiPhone
  })
}

</script>

<style scoped>
  .contact {
    background: #222628;
    color: white;
  }
  .contact .container {
    max-width: 1400px;
    margin: 0 auto;
  }
</style>