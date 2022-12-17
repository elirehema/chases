
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
        v-if="tab === 0"
        v-model="dialog"
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
            {{ $t('label.button.btnaddservicename') }}
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title class="text-h4">
              {{ formtitle }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-3 ">
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="editedItem.enServiceName"
                  label="English Service Name*"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="editedItem.swServiceName"
                  label="Swahili Service Name*"
                  required
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              small
              color="green darken-1"
              @click="_discard()"
            >
              Discard
            </v-btn>
            <v-btn
              small
              class="font-weight-bold"
              color="secondary darken-1"
              @click="_addGroupServiceName()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        <v-list>
          <v-subheader class="text-uppercase">
            {{ $t('label.title.groupservices') }}
          </v-subheader>
          <v-list-item-group
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in services"
              :key="i"
              @click="_editGroupService(item)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.enServiceName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
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
import TabGroupLeaders from '~/components/group/tab_group_leaders.vue'
export default {
  components: {
    'add-bank-account': DialogAddBankaccount,
    'tab-group-leaders': TabGroupLeaders
  },
  data () {
    return {
      group: null,
      services: null,
      dialog: false,
      bankdialog: false,
      tab: null,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      items: ['Group Services', 'Bank Account','Group Leaders']
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
          this.services = response.services
        })
        .catch(() => {
        })
    },
    _editGroupService (item) {
      this.editedIndex = this.services.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    _discard () {
      this.dialog = false
      this.editedIndex = -1
      this.editedItem = this.defaultItem
    },
    _closebakdialog () {
      this.bankdialog = false
    },
    async _addGroupServiceName () {
      const payload = {
        groupId: parseInt(this.$route.params.id),
        msisdn: this.msisdn,
        swServiceName: this.editedItem.swServiceName,
        enServiceName: this.editedItem.enServiceName
      }
      if (this.editedIndex >= 0) {
        payload.serviceId = this.editedItem.serviceId
        await await this.$api
          .$put('/group/service', payload)
          .then((response) => {
          // this.$route.push(`/groups/${response.groupId}`)

            this._getGroupServices()
            this.dialog = false
            this.editedIndex = -1
            this.editedItem = this.defaultItem
          })
          .catch(() => {
          })
      } else {
        await await this.$api
          .$post('/group/service', payload)
          .then((response) => {
          // this.$route.push(`/groups/${response.groupId}`)

            this._getGroupServices()
            this.dialog = false
            this.editedIndex = -1
            this.editedItem = this.defaultItem
          })
          .catch(() => {
          })
      }
    }
  }
}
</script>
