import Vue from 'vue'
const mixins = {
  data () {
    return {

    }
  },
  methods: {},
  computed: {

    msisdn () {
      return localStorage.getItem('msisdn')
    }

  }

}
Vue.mixin(mixins)
