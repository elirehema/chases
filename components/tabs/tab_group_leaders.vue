<template>
  <v-data-table
    v-if="leaders"
    :headers="headers"
    :items="leaders"
    sort-by="calories"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="font-weight-bold text-h4">
          Organization Leaders
        </v-toolbar-title>
        <v-spacer />
        <v-dialog
          v-model="dialog"
          max-width="60%"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                mdi-plus
              </v-icon>
              {{ $t('label.button.addgroupleader') }}
            </v-btn>
          </template>
          <v-card>
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title class="text-h4">
                {{ formTitle }}
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-container>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="6"
                    >
                      <v-select
                        v-model="editedItem.groupId"
                        :items="groups"
                        :item-text="'groupName'"
                        :item-value="'groupId'"
                        label="Select Organization *"
                        name="editedItem.groupId"
                        :rules="[rules.required]"
                        persistent-hint
                        single-line
                        required
                        readonly
                        chips
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.msisdn"
                        label="Leader Phone number"
                        :rules="[rules.phonenumber]"
                        required
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="success "
                small
                class="px-5 py-2"
                @click="close"
              >
                {{ $t('label.button.btncancel') }}
              </v-btn>
              <v-btn
                color="warning darken-1"
                small
                class="px-5 py-2"
                @click="save"
              >
                {{ $t('label.button.btnsave') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="30%">
          <v-card>
            <v-card-title class="text-h5 white">
              Are you sure you want to delete this leader {{ editedItem.msisdn }}?
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn color="green darken-1" small class="px-4 py-2" @click="closeDelete">
                {{ $t('label.button.btnyessure') }}
              </v-btn>
              <v-btn color="success darken-1" small class="px-4 py-2" @click="deleteItemConfirm">
                {{ $t('label.button.btnnotsure') }}
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <v-icon
        medium
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        medium
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
  <skeleton-table-loader v-else />
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    leaders: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'MSISDN',
        align: 'start',
        sortable: false,
        value: 'msisdn'
      },
      { text: 'First Name', value: 'firstName' },
      { text: 'Last Name', value: 'familyName' }
      /**{ text: 'Actions', value: 'actions', sortable: false, align: 'right' }**/
    ],
    rules: {
      required: v => !!v || 'Field is required',
      phonenumber: [
        v => !!v || 'filed is required',
        v => (v && v.length >= 11) || 'Name must be not less than 10 characters'
      ]
    },
    valid: true,

    editedIndex: -1,
    editedItem: {
      msisdn: '',
      groupId: 0,
      role: 0
    },
    defaultItem: {
      msisdn: '',
      groupId: 0,
      role: 0
    }
  }),

  computed: {
    ...mapGetters({
      groups: 'groups'
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New  Leader' : 'Edit Leader'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.editedItem.groupId = parseInt(this.$route.params.id)
  },

  methods: {

    editItem (item) {
      this.editedIndex = this.leaders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.groupId = parseInt(this.$route.params.id)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.leaders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$store.dispatch('_deletegroupleader', this.editedItem)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.leaders[this.editedIndex], this.editedItem)
        } else {
          this.$store.dispatch('_addgroupleader', this.editedItem)
        }
        this.close()
      }
    }
  }
}
</script>
