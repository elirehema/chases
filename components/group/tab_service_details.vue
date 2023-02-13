<template>
  <v-container fluid>
    <v-card light class="ma-5 pa-2" max-width="30%" outlined flat>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Service Name (sw) </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ service.swServiceName }}</v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Service Name (en) </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ service.enServiceName }}</v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Bank Name </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ service.bankName }}</v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Bank Account </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ service.bankAccount }}</v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    service: {
      type: Object,
      default: null
    }
  }
}
</script>
