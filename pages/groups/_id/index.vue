
<template>
  <v-card v-if="group">
    <v-app-bar
      color="primary"
      dark
      shrink-on-scroll
      prominent
      fade-img-on-scroll
      scroll-threshold="500"
    >
      <v-icon class="mt-4 ml-5" x-large>
        mdi-account-group
      </v-icon>

      <v-toolbar-title class="text-h4 font-weight-bold">
        {{ group.group.groupName }} 
      </v-toolbar-title>

      <v-spacer />

      <v-dialog
        v-if="tab === 1"
        v-model="bankdialog"
        persistent
        max-width="600px"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="secondary"
            dark
            v-bind="attrs"
            class="mt-4"
            v-on="on"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            {{ $t('label.button.btnaddbankaccount') }}
          </v-btn>
        </template>
        <add-bank-account @close="_closebakdialog($event)" />
      </v-dialog>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template #extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow" />

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <tab-group-services :services="services" v-on:update="_getGroupServices($event)" />
      </v-tab-item>
      <v-tab-item />
      <v-tab-item>
        <tab-group-leaders />
      </v-tab-item>
    </v-tabs-items>
  </v-card>

  <skeleton-table-loader v-else />
</template>
<script>
import DialogAddBankaccount from '@/components/dialogs/dialog_add_bankaccount.vue'
import TabGroupLeaders from '@/components/group/tab_group_leaders.vue'
import TabGroupServices from '@/components/group/tab_group_services.vue'
export default {
  components: {
    'add-bank-account': DialogAddBankaccount,
    'tab-group-leaders': TabGroupLeaders,
    'tab-group-services': TabGroupServices
  },
  data () {
    return {
      group: null,
      services: [],
      dialog: false,
      bankdialog: false,
      tab: null,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      items: ['Group Services', 'Bank Account', 'Group Leaders']
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? 'Add new service name' : 'Edit Service Name'
    }
  },
  mounted () {
    this._getgroupById()
    this._getGroupServices()
  },
  created () {
    this._getgroupById()
    this._getGroupServices()
  },
  methods: {
    async _getgroupById () {
      await await this.$api
        .$post('/group', { groupId: parseInt(this.$route.params.id), msisdn: this.msisdn })
        .then((response) => {
          this.group = response
        })
        .catch(() => {
        })
    },
    async _getGroupServices () {
      await await this.$api
        .$post('/group/services', { groupId: parseInt(this.$route.params.id), msisdn: this.msisdn })
        .then((response) => {
          this.services = response.services === null ? [] : response.services
        })
        .catch(() => {
        })
    },
    _closebakdialog () {
      this.bankdialog = false
    }
  }
}
</script>
