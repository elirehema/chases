<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="false"
      permanent
      color="primary"
      dark
      app
      height="100%"
      style="max-height: 97.6%;"
    >
      <v-list>
        <v-list-item v-if="miniVariant" class="px-2">
          <v-list-item-avatar color="whitish">
            <v-img :src="miniUrl" class="vuetify-logo" />
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item v-else link>
          <v-list-item-avatar color="whitish">
            <v-img :src="miniUrl" class="vuetify-logo" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              ChaseScroll 
            </v-list-item-title>
            <v-list-item-subtitle>Login Sample Page</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />
      <v-list-item
        v-for="child in menus"
        :key="child.title"
        :to="child.to"
        color="success"
        class="pl-4"
      >
        <v-list-item-icon>
          <v-icon>{{ 'mdi-'+ child.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            <span class="font-weight-light">{{ child.title }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template #append>
        <div class="pa-2">
          <v-btn block rounded color="warning" @click="$store.dispatch('_logoutsession')">
            <v-icon left>
              mdi-logout-variant
            </v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      flat
    >
      <!--<v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <v-btn
        icon
        dark
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `menu${miniVariant ? '' : '-open'}` }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="ma-2" height="100%" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <footer-component />
    </v-footer>
  </v-app>
</template>

<script>
import FooterComponent from '~/components/footer-component.vue'
export default {
  name: 'DefaultLayout',
  components: {
    'footer-component': FooterComponent
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      messages: 8,
      adv: 7,
      notifications: 1,
      menus: [
        {
          title: 'Home',
          icon: 'home-outline',
        
        },
        {
          title: 'Help',
          icon: 'account-group-outline',
         
        },
        {
          title: 'Contacts',
          icon: 'bank-outline',
          
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      url: 'logo.png',
      miniUrl: 'logo.png'
    }
  },
  created () {
    localStorage.setItem('msisdn', '255754710521')
  }
}
</script>
