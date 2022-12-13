<template>
  <v-row
    v-if="groups"
    class="d-flex justify-space-between"
    no-gutters
  >
    <v-col cols="12" :md="show ? '5' :'12'">
      <v-data-table
        :headers="headers"
        :items="groups.groups"
        item-key="name"
        class="elevation-1"
        @click:row="rowclick"
      >
        <template #expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            More info about {{ item.name }}
          </td>
        </template>
        <template #top>
          <v-toolbar
            color="primary"
            flat
          >
            <v-toolbar-title class="text-h4 font-weight-bold white--text">Groups</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
        </template>
        <template #item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template #no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
    <v-col v-if="show" cols="12" md="6">
      <NuxtChild :key="$route.params.id" />
    </v-col>
  </v-row>

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
      ],
      show: false,
      editedItem: {}
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
  },
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/groups/${v.groupId}`)
      // console.log(v)
    }
  }

}
</script>
