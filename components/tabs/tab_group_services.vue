<template>
  <v-data-table
    v-if="services"
    :headers="headers"
    :items="services"
    sort-by="calories"
    class="elevation-1"
    @click:row="viewService"
  >
    <template #top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="font-weight-bold text-h4">
          Organization services
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
                      <v-text-field
                        v-model="editedItem.swServiceName"
                        label="Jina la Huduma"
                        :rules="[rules.required]"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.enServiceName"
                        label="Service Name (en)"
                        :rules="[rules.required]"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="6"
                      v-if="editedIndex == -1"
                    >
                      <v-text-field
                        v-model="editedItem.swPaymentReferenceName"
                        label="Payment Reference Name (sw)"
                        :rules="[rules.required]"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="6"
                      v-if="editedIndex == -1"
                    >
                      <v-text-field
                        v-model="editedItem.enPaymentReferenceName"
                        label="Payment Reference Name (en)"
                        :rules="[rules.required]"
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        v-model="editedItem.bankName"
                        :items="banks"
                        :item-text="'name'"
                        :item-value="'name'"
                        label="Select Bank"
                        name="editedItem.bankName"
                        :rules="[rules.required]"
                        persistent-hint
                        single-line
                        @focus="$store.dispatch('_fetchbanks',{'msisdn': msisdn})"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.bankAccount"
                        label="Bank Account"
                        hint="01520123456789"
                        :rules="[rules.required]"
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
    <template #[`item.actions`]="{ item }">
      <div class="align-left" @click.stop>
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
      </div>
    </template>

    <template #no-data>
      <p>No Data...</p>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    services: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'serviceId'
      },
      { text: 'Service Name(sw)', value: 'swServiceName' },
      { text: 'Service Name(en)', value: 'enServiceName' },
      { text: 'Bank Name', value: 'bankName' },
      { text: 'Bank Account', value: 'bankAccount' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'right' }
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
      serviceId: 0,
      swServiceName: '',
      enServiceName: '',
      payNumber: 0,
      bankName: '',
      bankAccount: 0
    },
    defaultItem: {
      serviceId: 0,
      swServiceName: '',
      enServiceName: '',
      payNumber: 0,
      bankName: '',
      bankAccount: 0
    }
  }),

  computed: {
    ...mapGetters({
      groups: 'groups',
      banks: 'banks'
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'Add new service' : 'Edit service'
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
      this.editedIndex = this.services.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.services.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      // this.services.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      setTimeout(() => {
        this.$emit('update')
      }, this.delay)
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    viewService (v) {
      this.$router.push(`/groups/${this.$route.params.id}/${v.serviceId}`)
    },

    save () {
      this.editedItem.groupId = parseInt(this.$route.params.id)
      this.editedItem.bankAccount = parseInt(this.editedItem.bankAccount)
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.$store.dispatch('_editgroupservicename', this.editedItem)
        } else {
          delete this.editedItem.serviceId
          this.$store.dispatch('_addgroupservicename', this.editedItem)
        }
        this.close()
      }
    }
  }
}
</script>
