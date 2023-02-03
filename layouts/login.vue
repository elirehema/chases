<template>
  <v-app class="app login">
    <v-main class="transparent">
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {

  data () {
    return {
      locales: ['English', 'Kiswahili'],
      socials: [
        {
          icon: 'mdi-twitter',
          link: 'https://twitter.com/MarketGrid_?ref_src=twsrc%5Etfw'
        },
        {
          icon: 'mdi-facebook',
          link: null
        },
        { icon: 'mdi-linkedin', link: null },
        { icon: 'mdi-instagram', link: null }
      ]
    }
  },
  head () {
    return {
      title: 'Home Page'
    }
  }
}
</script>
  <style scoped>
  #nuxt,
  #layout {
    background-color: brown;
  }
  </style>
