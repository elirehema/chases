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
          <v-list-item-avatar color="primary lighten-3">
            <v-img :src="miniUrl" />
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item v-else link>
          <v-list-item-avatar color="primary lighten-3">
            <v-img :src="miniUrl" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              NgaziTech Platform
            </v-list-item-title>
            <v-list-item-subtitle>Transactions management</v-list-item-subtitle>
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
      <!--<v-list dense>
        <v-list-group
          v-for="item in menuitems"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="`mdi-${item.icon}`"
          active-class="white--text"
          append-icon="mdi-menu-down"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.menus"
            :key="child.title"
            color="primary"
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
        </v-list-group>
      </v-list>-->
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
      <v-btn
        icon
        dark
      >
        <v-icon>mdi-selection</v-icon>
      </v-btn>
      <v-btn
        icon
        dark
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer />
      <v-badge
        :content="adv"
        :value="adv"
        color="secondary"
        overlap
      >
        <v-icon dark>
          mdi-bullhorn-variant
        </v-icon>
      </v-badge>
      <v-badge
        :content="notifications"
        :value="notifications"
        color="secondary"
        class="ml-6"
        overlap
      >
        <v-icon dark>
          mdi-bell
        </v-icon>
      </v-badge>
      <v-badge
        :content="messages"
        :value="messages"
        color="secondary"
        class="ml-6"
        overlap
      >
        <v-icon dark>
          mdi-forum
        </v-icon>
      </v-badge>
    </v-app-bar>
    <v-main>
      <v-container class="ma-2" height="100%" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
      menuitems: [
        {
          title: 'System',
          icon: 'cog-transfer-outline',
          menus: [
            {
              title: 'Users',
              icon: 'account-cog'
            },
            {
              title: 'Settings',
              icon: 'cog'
            }
          ]
        },
        {
          title: 'Archive',
          icon: 'bookshelf',
          menus: [
            {
              title: 'Power Grid',
              icon: 'sitemap-outline'
            },
            {
              title: 'Meter',
              icon: 'gauge'
            },
            {
              title: 'Customer',
              icon: 'account-group'
            },
            {
              title: 'POC',
              icon: 'map-marker-path'
            },
            {
              title: 'DCU',
              icon: 'access-point'
            },
            {
              title: 'QES',
              icon: 'dots-circle'
            },
            {
              title: 'Line Loss Rule',
              icon: 'source-branch'
            },
            {
              title: 'VEE Work Group',
              icon: 'widgets'
            },
            {
              title: 'Install Survey',
              icon: 'magnify'
            },
            {
              title: 'Install Plan',
              icon: 'crosshairs'
            },
            {
              title: 'Install Order',
              icon: 'stack-overflow'
            },
            {
              title: 'Help Desk',
              icon: 'information'
            }
          ]
        },
        {
          title: 'Prepaid',
          icon: 'domain',
          menus: []
        },
        {
          title: 'Service Request',
          icon: 'cloud-download',
          menus: []
        },
        {
          title: 'Analytics',
          icon: 'chart-line'
        },
        {
          title: 'Report',
          icon: 'file-key',
          menus: []
        },
        {
          title: 'Workflow',
          icon: 'arrow-decision',
          menus: []
        }
      ],
      menus: [
        {
          title: 'Home',
          icon: 'view-dashboard',
          to: '/'
        },
        {
          title: 'Groups',
          icon: 'account-group',
          to: '/groups'
        },
        {
          title: 'POC',
          icon: 'map-marker-path'
        },
        {
          title: 'DCU',
          icon: 'access-point'
        },
        {
          title: 'QES',
          icon: 'dots-circle'
        },
        {
          title: 'Line Loss Rule',
          icon: 'source-branch'
        },
        {
          title: 'VEE Work Group',
          icon: 'widgets'
        },
        {
          title: 'Install Survey',
          icon: 'magnify'
        },
        {
          title: 'Install Plan',
          icon: 'crosshairs'
        },
        {
          title: 'Install Order',
          icon: 'stack-overflow'
        },
        {
          title: 'Help Desk',
          icon: 'information'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      url: 'logo.png',
      miniUrl: 'logo.png'
    }
  }
}
</script>
