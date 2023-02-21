<template>
  <v-data-table
    v-if="transactions"
    :headers="headers"
    :items="transactions"
    sort-by="calories"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="font-weight-bold text-h4">
          Transactions
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </template>
    <template #item.message="{ item }">
      <v-tooltip left color="primary" class="pa-3" min-width="50%" max-width="80%">
        <template #activator="{ on, attrs }">
          <v-icon
            color="blue"
            dark
            v-bind="attrs"
            v-on="on"
          >
            mdi-message-badge
          </v-icon>
        </template>
        <span class="font-weight-bold">{{ item.sms }}</span>
      </v-tooltip>
    </template>
    <template #no-data>
      <p>No data</p>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  props: {
    transactions: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    headers: [
      {
        text: 'Transaction ID',
        align: 'start',
        sortable: false,
        value: 'transactionId'
      },
      { text: 'Transaction Type', value: 'transactionType' },
      { text: 'MSISDN', value: 'msisdn' },
      { text: 'Receipt #', value: 'receipt' },

      { text: 'Source', value: 'sourceAccount' },
      { text: 'Service', value: 'serviceName' },
      { text: 'Amount', value: 'transactionAmount' },
      { text: 'S.B.B', value: 'balanceBefore' },
      { text: 'S.B.A', value: 'balanceAfter' },
      { text: 'D.B.B', value: 'destinationaccountbalancebefore' },
      { text: 'D.B.A', value: 'destinationaccountbalanceafter' },
      { text: 'Payment Ref', value: 'paymentReference' },
      { text: 'Message', value: 'message' },
      { text: 'Transaction Date', value: 'transactionDate' }
    ]
  })
}
</script>
