<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand to="/">
          Map Template
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav v-if="!isLoggedIn" class="ml-auto">
              <b-nav-item to="/login">
                Login
              </b-nav-item>
              <b-nav-item to="/register">
                Register
              </b-nav-item>
            </b-navbar-nav>
            <template v-else>
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <b-icon-person></b-icon-person>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { BIcon, BIconPerson } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BIcon,
    BIconPerson
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
