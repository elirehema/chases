<template>
  <v-card v-if="serviceno" max-width="500" class="my-5 ml-5">
    <v-card-text>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>
            <span class="font-weight-bold text-h5">Payment Number : &nbsp; </span>
            <span>{{ serviceno.paymentNumber }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="py-2">
            <span class="font-weight-bold text-h5">MSISDN : &nbsp; </span>
            <span>{{ serviceno.msisdn }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <span class="font-weight-bold text-h5">Organization ID : &nbsp; </span>
            <span>{{ serviceno.groupId }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
  <skeleton-summary-card v-else />
</template>
<script>
export default {
  props: {
    serviceno: {
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  }
}
</script>
