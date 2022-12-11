<template>
  <v-data-table
    v-if="groups"
    :headers="headers"
    :items="groups.groups"
    item-key="name"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat color="teal" dense>
        <v-toolbar-title class="text-h5 white--text">
          Groups
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        More info about {{ item.name }}
      </td>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Group ID',
          align: 'start',
          sortable: false,
          value: 'groupId'
        },
        { text: 'Group Name', value: 'groupName' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      groups: 'groups'
    })
  },
  created () {
    const body = {
      msisdn: this.msisdn
    }
    this.$store.dispatch('_fetchgroups', body)
  }

}
</script>
