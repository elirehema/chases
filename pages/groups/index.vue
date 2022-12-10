<template>
  <h1>GROUPS</h1>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created () {
    console.log("GET GROUPS")
    const body = '<getGroups><msisdn>255754710521</msisdn></getGroups>'
    this.$store.dispatch('_fetchgroups', body)
  }
}
</script>
