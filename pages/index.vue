<template>
  <v-row justify="start">
    <v-col cols="12" sm="12" md="3">
      <v-card min-height="400" flat outlined class="logo py-4 d-flex justify-center align-center">
        <NuxtLogo />
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-card min-height="400" flat outlined class=" py-4 d-flex justify-center align-center">
        <v-sparkline
          :value="value"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          auto-draw
        />
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="3">
      <v-card min-height="400" flat outlined class="logo py-4 d-flex justify-center align-center">
        <VuetifyLogo />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]
export default {
  name: 'IndexPage',
  data () {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false
    }
  }
}
</script>
