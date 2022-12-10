<template>
  <h1>GROUPS</h1>
</template>
<script>
import { mapGetters } from 'vuex/types/helpers'
export default {
  data () {
    return {

    }
  },
  created () {
    const body = {
      msisdn: this.msisdn
    }
    this.$store.dispatch('_fetchgroups', body)
  }
}
</script>
