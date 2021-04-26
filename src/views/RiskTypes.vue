<template>
  <div>
    <h2 class="mb-6 mt-2 grey--text text--darken-3">Risk Types</h2>

    <div v-if="error">
      <Retry @retry="retry()" :homeLink="false" />
    </div>
    <div v-else>
      <div class="text-center my-auto" v-if="riskTypes == null">
        <v-progress-circular :size="50" color="primary" indeterminate ></v-progress-circular>
      </div>

      <div v-else>
        <div v-if="riskTypes.length">
          <div v-for="riskType in riskTypes" :key="riskType.id">
            <RiskTypeForm :riskType="riskType" />
          </div>
        </div>

        <div v-else>
          <h3 class=" text-center grey--text text--darken-2">No risk types at this time</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import RiskTypeForm from '@/components/RiskTypeForm'
import Retry from '@/components/Retry'
import axios from 'axios'

export default {
  components: {
    RiskTypeForm,
    Retry
  },
  data(){
    return {
      riskTypes: null,
      error: false
    }
  },
  methods:{
    async fetchRiskTypes(){
      const origin = window.location.origin
      const baseUrl = origin.includes('localhost') ? 'http://localhost:8000' : 'https://wgl2ffkn7d.execute-api.us-east-2.amazonaws.com/dev'

      await axios.get(`${baseUrl}/api/v1/risktypes/`)
      .then( res => {
        this.riskTypes = res.data
      }).catch(() => {
        this.error=true
      })
    },
    async retry(){
      this.error = false,
      await this.fetchRiskTypes()
    }
  },
  async created(){
    await this.fetchRiskTypes()
  }
}
</script>
