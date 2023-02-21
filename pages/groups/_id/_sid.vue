
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
      <v-icon class="mt-4" x-large>
        mdi-account-group
      </v-icon>
      <v-toolbar-title>
        <v-row class="d-flex justify-center align-center ">
          <v-col cols="12" class="text-h4 font-weight-bold">
            Service Name:  {{ service.enServiceName }}
          </v-col>
          <v-col cols="12" class="text-h5 font-weight-bold">
            Organization ID:  {{ group.groupId }}
          </v-col>
        </v-row>
      </v-toolbar-title>

      <v-spacer />

      <!--<v-card light class="mt-5 ml-5">
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Service Name (sw) </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{ service.swServiceName }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Service Name (en) </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{ service.enServiceName }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Bank Name </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{ service.bankName }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Bank Account </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{ service.bankAccount }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>-->

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
    <tab-service-details :service="service"/>
    </v-tab-item>
      <v-tab-item>
        <tab-group-transactions :transactions="transactions" />
      </v-tab-item>
      <v-tab-item>
        <tab-group-service-no :serviceno="serviceno" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>

  <skeleton-table-loader v-else />
</template>
<script>
import TabGroupTransactions from '@/components/tabs/tab_group_transaction.vue'
import TabGroupServiceNumber from '@/components/tabs/tab_group_service_no.vue'
import TabServiceDetails from '@/components/tabs/tab_service_details.vue'
export default {
  components: {
    'tab-group-transactions': TabGroupTransactions,
    'tab-group-service-no': TabGroupServiceNumber,
    'tab-service-details': TabServiceDetails
  },
  data () {
    return {
      group: null,
      service: null,
      dialog: false,
      bankdialog: false,
      transactions: null,
      tab: null,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      serviceno: null,
      items: ['Details', 'Transactions', 'Payment Number']
    }
  },
  head () {
    return {
      title: 'Organization Service'
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? 'Add new service name' : 'Edit Service Name'
    }
  },
  mounted () {
    this._getgroupServiceById()
    // this._getGroupServices()
  },
  created () {
    this._getgroupServiceById()
    this._getServiceTransactions()
    this._getServicePaymentNumber()
  },
  methods: {
    async _getgroupServiceById () {
      await await this.$api
        .$post('/group/getservice', { groupId: parseInt(this.$route.params.id), serviceId: parseInt(this.$route.params.sid), msisdn: this.msisdn })
        .then((response) => {
          this.group = response
          this.service = response.services[0]
        })
        .catch(() => {
        })
    },
    async _getServiceTransactions () {
      await await this.$api
        .$post('/transactions', {
          groupId: parseInt(this.$route.params.id),
          msisdn: parseInt(this.msisdn),
          serviceId: parseInt(this.$route.params.sid)
        })
        .then((response) => {
          this.transactions = response.transactions === null ? [] : response.transactions
        })
        .catch(() => {
        })
    },
    async _getServicePaymentNumber () {
      await await this.$api
        .$post('/group/service/no', { groupId: parseInt(this.$route.params.id), serviceId: parseInt(this.$route.params.sid), msisdn: parseInt(this.msisdn) })
        .then((response) => {
          this.group = response
          this.serviceno = response
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
