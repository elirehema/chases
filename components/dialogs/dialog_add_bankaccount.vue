<template>
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
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card-text class="pt-3 ">
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-select
              v-model="editedItem.bankNname"
              :items="banks"
              :item-text="'name'"
              :item-value="'name'"
              label="Select Bank"
              name="editedItem.productId"
              :rules="[rules.required]"
              persistent-hint
              single-line
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.bankAccount"
              label="Bank Account*"
              type="number"
              step="any"
              min="0"
              :rules="[rules.required]"
              @change="editedItem.bankAccount = parseFloat(editedItem.bankAccount)"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-form>
    <v-card-actions>
      <v-spacer />
      <v-btn
        small
        color="green darken-1"
        @click="$emit('close')"
      >
        Discard
      </v-btn>
      <v-btn
        small
        class="font-weight-bold"
        color="secondary darken-1"
        @click="_addGroupBankAccount()"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      valid: true,
      editedItem: {},
      formtitle: 'Add bank Account',

      rules: {
        required: v => !!v || 'Name is required'
      }
    }
  },
  computed: {
    ...mapGetters({
      banks: 'banks'
    })
  },
  created () {
    const body = {
      msisdn: this.msisdn,
      groupId: parseInt(this.msisdn)
    }
    this.$store.dispatch('_fetchbanks', body)
  },
  methods: {
    _addGroupBankAccount () {
      if (this.$refs.form.validate()) {
        this.editedItem.groupId = parseInt(this.$route.params.id)
        this.$store.dispatch('_addbankaccount', this.editedItem).then((res) => {
          this.$emit('close')
        })
      }
    }
  }

}
</script>
