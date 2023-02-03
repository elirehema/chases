<template>
  <v-form class="form-box" @submit.prevent="formSubmit">
    <v-container height="100%">
      <v-row class="mt-0">
        <v-col cols="12" sm="12" md="2">
          <img
            src="/logo.png"
            alt="homepage"
            width="160"
            class="ml-2 dark-logo"
          >
        </v-col>
      </v-row>

      <div class="d-flex align-center justify-center mt-15">
        <v-row class="mt-0" no-gutters>
          <v-col cols="12" md="5" class="  d-flex justify-center align-center ">
            <v-list color="transparent">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-sm-h4 text-md-h3 text-lg-h2 primary--text text-sm-center text-md-left">
                    Ngazi Technologies
                  </v-list-item-title>
                  <v-list-item-subtitle class="mt-10 text-sm-h5 text-md-h4 text-lg-h4 black--text text-sm-center text-md-left">
                    Lorem Ipsum dolor sit de amet cons
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="5" lg="4" class="mt-5 d-flex justify-center">
            <v-card class="py-12">
              <v-card-title class="d-flex justify-center">
                <span class="font-weight-bold text-h5">Change Password</span>
              </v-card-title>
              <v-card-text>
                <v-row no-gutters class="mt-5">
                  <v-col cols="12" class=" mt-3">
                    <v-text-field
                      v-model="form.userId"
                      color="black"
                      class="text-h4 px-3 form-input"
                      outlined
                      placeholder="e.g 255716000000"
                      label="Phone Number"
                      required
                    />
                  </v-col>
                  <v-col cols="12" class=" mt-3">
                    <v-text-field
                      v-model="form.password"
                      autocomplete="off"
                      color="black"
                      class="text-h4 px-3"
                      placeholder="*********"
                      type="password"
                      outlined
                      label="Current Password"
                      required
                    />
                  </v-col>

                  <v-col cols="12" class=" mt-3">
                    <v-text-field
                      v-model="form.newPassword"
                      autocomplete="off"
                      color="black"
                      class="text-h4 px-3"
                      placeholder="*********"
                      type="password"
                      outlined
                      label="New Password"
                      required
                    />
                  </v-col>
                  <v-col cols="12" class=" mt-5 d-flex justify-center">
                    <v-btn block type="submit" color="button" dark>
                      Continue
                      <v-icon right>
                        mdi-arrow-right-bold
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" />
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'login',
  data () {
    return {
      form: {
        userId: '',
        password: ''
      },

      title: 'Market Grid : Login'
    }
  },
  computed: {
    ...mapGetters({
      account: 'account'
    })

  },

  created () {
    this.form.userId = this.account.msisdn
  },
  methods: {
    ...mapActions(['login']),

    formSubmit () {
      this.$store.dispatch('_updatepassword', this.form)
    }
  }

}
</script>
