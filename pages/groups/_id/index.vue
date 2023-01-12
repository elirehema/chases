
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
        <tab-group-services :services="services" @update="_getGroupServices($event)" />
      </v-tab-item>
      <v-tab-item>
        <tab-payment-reference :reference="paymentref" @update="_getGroupPaymentReference" />
      </v-tab-item>
      <v-tab-item>
        <tab-group-leaders :leaders="leaders" />
      </v-tab-item>
      <v-tab-item>
      <tab-group-users />
      </v-tab-item>
    </v-tabs-items>
  </v-card>

  <skeleton-table-loader v-else />
</template>
<script>
import DialogAddBankaccount from '@/components/dialogs/dialog_add_bankaccount.vue'
import TabGroupLeaders from '@/components/group/tab_group_leaders.vue'
import TabGroupServices from '@/components/group/tab_group_services.vue'
import TabBroupPaymentReference from '@/components/group/tab_group_payment_ref.vue'
import TabGroupUsersComponent from '@/components/group/tab_group_users.vue'
export default {
  components: {
    'add-bank-account': DialogAddBankaccount,
    'tab-group-leaders': TabGroupLeaders,
    'tab-group-services': TabGroupServices,
    'tab-payment-reference': TabBroupPaymentReference,
    'tab-group-users': TabGroupUsersComponent
  },
  data () {
    return {
      group: null,
      services: [],
      leaders: null,
      dialog: false,
      bankdialog: false,
      tab: null,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      paymentref: null,
      items: ['Services', 'Bank Account', 'Leaders', 'Users']
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
    this._getGroupLeaders()
    this._getGroupPaymentReference()
  },
  methods: {
    async _getgroupById () {
      await await this.$axios
        .$post('/api/group', { groupId: parseInt(this.$route.params.id), msisdn: this.msisdn })
        .then((response) => {
          this.group = response
        })
        .catch(() => {
        })
    },
    async _getGroupServices () {
      await await this.$axios
        .$post('/api/group/services', { groupId: parseInt(this.$route.params.id), msisdn: this.msisdn })
        .then((response) => {
          this.services = response.services === null ? [] : response.services
        })
        .catch(() => {
        })
    },
    async _getGroupLeaders () {
      await await this.$axios
        .$post('/api/group/leaders', { groupId: parseInt(this.$route.params.id) })
        .then((response) => {
          this.leaders = response.leaders === null ? [] : response.leaders
        })
        .catch(() => {
        })
    },
    async _getGroupPaymentReference () {
      await await this.$axios
        .$post('/api/group/ref', { groupId: parseInt(this.$route.params.id), msisdn: parseInt(this.msisdn), serviceId: 1 })
        .then((response) => {
          this.paymentref = response
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
