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
        text: 'Service',
        align: 'start',
        sortable: false,
        value: 'serviceName'
      },
      { text: 'MSISDN', value: 'msisdn' },
      { text: 'Receipt #', value: 'receipt' },

      { text: 'Balance Before', value: 'balanceBefore' },
      { text: 'Balance After', value: 'balanceAfter' },
      { text: 'Pay Number', value: 'payNumber' },
      { text: 'Bank Account', value: 'bankAccount' },

      { text: 'Payment Ref', value: 'paymentReference' }
    ]
  })
}
</script>
