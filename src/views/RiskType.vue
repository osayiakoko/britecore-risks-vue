<template>
  <div>
    <div v-if="error">
      <Retry @retry="retry()" />
    </div>
    <div v-else>
      <div class="text-center my-auto mt-4" v-if="riskType == null">
        <v-progress-circular :size="50" color="primary" indeterminate ></v-progress-circular>
      </div>
      <div v-else>
        <div class="d-flex align-center mb-4">
          <v-btn @click="$router.push({ name: 'RiskTypes'})" icon class="mr-2" color="grey darken-2">
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>

          <h1 class="grey--text text--darken-2">{{ riskType.name }} Risk</h1>
        </div>

        <RiskTypeForm :riskType="riskType" :showTitle="false" />
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import RiskTypeForm from '@/components/RiskTypeForm'
import Retry from '@/components/Retry'

export default {
  components: {
    RiskTypeForm,
    Retry
  },
  data(){
    return {
      riskType: null,
      error: false
    }
  },
  methods: {
    async fetchRiskType(){
      const origin = window.location.origin
        const baseUrl = origin.includes('localhost') ? 'http://localhost:8000' : 'https://wgl2ffkn7d.execute-api.us-east-2.amazonaws.com/dev'

        await axios.get(`${baseUrl}/api/v1/risktypes/${this.$route.params.id}/`)
        .then( res => {
          this.riskType = res.data
        }).catch((err) => {
          if (err.response && err.response.status === 404){
            this.$router.push({name: 'NotFound'})
          }else{
            this.error = true
          }
      })
    },
    async retry(){
      this.error = false
      await this.fetchRiskType()
    },
  },
  async created(){
    await this.fetchRiskType()
  }
}
</script>