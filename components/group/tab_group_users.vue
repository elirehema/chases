<!-- eslint-disable indent -->
<template>
  <v-data-table
    v-if="users"
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="font-weight-bold text-h3">
          Group Users
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
              {{ $t('label.button.adduser') }}
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
                        v-model="editedItem.fullName"
                        label="Full Name"
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
                        v-model="editedItem.mobile"
                        label="Mobile number"
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
                        v-model="editedItem.email"
                        label="Email address"
                        type="email"
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
        <v-dialog v-model="dialogDelete" max-width="400">
          <v-card>
            <v-card-title class="text-h5 white">
              Are you sure you want to delete this user {{ editedItem.msisdn }}?
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn color="green darken-1" small class="px-4 py-2" @click="closeDelete">
                {{ $t('label.button.btnnotsure') }}
              </v-btn>
              <v-btn color="success darken-1" small class="px-4 py-2" @click="deleteItemConfirm">
                {{ $t('label.button.btnyessure') }}
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
      <span>No Data ...</span>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  data () {
    return {
      editedIndex: -1,
      dialog: false,
      dialogDelete: false,
      valid: true,
      editedItem: {
        groupID: 0,
        userId: '',
        password: '',
        fullName: '',
        email: '',
        mobile: ''
      },
      defautlItem: {
        groupID: 0,
        userId: '',
        password: '',
        fullName: '',
        email: '',
        mobile: ''
      },
      users: [
        {
          mobile: '255754000001',
          fullName: 'Maria Dauds',
          email: 'mariad@gmail.ngazi',
          groupId: 1000002
        },
        {
          mobile: '255754000001',
          fullName: 'Maria Dauds',
          email: 'mariad@gmail.ngazi',
          groupId: 1000002
        },
        {
          mobile: '255754000001',
          fullName: 'Maria Dauds',
          email: 'mariad@gmail.ngazi',
          groupId: 1000002
        },
        {
          mobile: '255754000001',
          fullName: 'Maria Dauds',
          email: 'mariad@gmail.ngazi',
          groupId: 1000002
        },
        {
          mobile: '255754000001',
          fullName: 'Maria Dauds',
          email: 'mariad@gmail.ngazi',
          groupId: 1000002
        }
      ],

      headers: [
        {
          text: 'Mobile No.',
          align: 'start',
          sortable: false,
          value: 'mobile'
        },
        { text: 'Full Name', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Group ID', value: 'groupId' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'right' }
      ],
      rules: {
        required: v => !!v || 'Field is required'
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add new user' : 'Update user information'
    }
  },
  created () {
    this.editedItem.groupID = parseInt(this.$route.params.id)
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.userId = this.editedItem.email
      this.editedItem.groupId = parseInt(this.$route.params.id)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.userId = this.editedItem.email
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.editedItem.userId = this.editedItem.email
      // console.log({ groupId: parseInt(this.$route.params.id), userId: this.editedItem.userId })
      this.$store.dispatch('_deletegroupuser', { groupId: parseInt(this.$route.params.id), userId: this.editedItem.userId })
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
          this.editedItem.userId = this.editedItem.email
          this.$store.dispatch('_editgroupuser', this.editedItem)
        } else {
          delete this.editedItem.userId
          this.editedItem.userId = this.editedItem.email
          this.$store.dispatch('_addgroupuser', this.editedItem)
        }
        this.close()
      }
    }
  }
}
</script>
