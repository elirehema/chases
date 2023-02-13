<template>
  <v-card v-if="reference" class="my-5 ml-3" max-width="574">
    <v-card-text v-if="!isupdate">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>
            <span class="font-weight-bold text-h5">Service Name (sw) : &nbsp; </span>
            <span>{{ reference.swPaymentReferenceName }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="py-2">
            <span class="font-weight-bold text-h5">Service Name (en) : &nbsp; </span>
            <span>{{ reference.enPaymentReferenceName }}</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <span class="font-weight-bold text-h5">Organzation ID : &nbsp; </span>
            <span>{{ reference.groupId }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-card-text v-else>
      <v-row>
        <v-col
          cols="12"
          sm="12"
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
          sm="12"
        >
          <v-text-field
            v-model="editedItem.swPaymentReferenceName"
            label="Payment Reference Name (sw)"
            :rules="[rules.required]"
            required
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="!isupdate"
        color="deep-purple lighten-2"
        text
        @click="update"
      >
        Update
      </v-btn>
      <v-btn
        v-else
        color="deep-purple lighten-2"
        text
        @click="save()"
      >
        Save Updates
      </v-btn>
    </v-card-actions>
  </v-card>
  <skeleton-summary-card v-else />
</template>
<script>
export default {
  props: {
    reference: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isupdate: false,
      rules: {
        required: v => !!v || 'Field is required'
      },
      editedItem: {
        msisdn: 0,
        groupId: 0,
        serviceId: 1,
        swPaymentReferenceName: '',
        enPaymentReferenceName: ''
      }
    }
  },
  methods: {
    update () {
      this.isupdate = !this.isupdate
      this.editedItem.msisdn = parseInt(this.msisdn)
      this.editedItem.groupId = parseInt(this.$route.params.id)
      this.editedItem.swPaymentReferenceName = this.reference.swPaymentReferenceName
      this.editedItem.enPaymentReferenceName = this.reference.enPaymentReferenceName
    },
    save () {
      this.$store.dispatch('_updatepaymentreference', this.editedItem).then(() => {
        this.$emit('update')
        this.isupdate = !this.isupdate
      })
      console.log(this.editedItem)
    }
  }
}
</script>
