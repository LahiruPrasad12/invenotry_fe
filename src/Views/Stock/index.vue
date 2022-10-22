<template>
  <div>
    <div class="main-container" style="width: 1000px;">
      <div class="anim" style="--delay:0.2s;">
        <h1 style="text-align:center; font-size: 30px; color: white; margin-top: 2%; font-weight: 600;">Stock Management
        </h1>
        <br /><br />
      </div>
      <div class="anim" style="--delay:0.2s;">
        <header class="card-header" style="background-color: rgba(21, 20, 26, 0.63); border-radius: 20px">
          <div class="card-header-title">
            <div class="card-header-title">
              <div style="font-size: 25px; color: white;">Stocks</div>
              <div class="search-bar">
                <input type="text" placeholder="Search Stocks" style="margin-left:15%;">
              </div>
              <b-select v-model="selected_status" placeholder="Select Status" style="margin-left: 5%;">
                <option style="color: rgb(180, 180, 180);" value="">Select Availability</option>
                <option style="color: rgb(180, 180, 180);" value="">All</option>
                <option style="color: rgb(180, 180, 180);" value="true">Yes</option>
                <option style="color: rgb(180, 180, 180);" value="false">No</option>
              </b-select>
            </div>
            <div class="float-end">
              <b-button type="is-success" @click="createItem">Add Stock</b-button>
              <b-button type="is-info">Generate Report</b-button>
            </div>
          </div>
        </header>
      </div>
      <br />
      <AllStocks ref="all_items" />

      <div class="ft anim" style="--delay:0.3s; margin-top: 5%;">
        <p style="text-align:center">
          © 2022. EyePax Technologies. All Rights Reserved.
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import AllStocks from "../Stock/includes/Allstocks";

export default {
  name: "index",
  components: { AllStocks },
  data() {
    return {
      selected_status: ''
    }
  },
  watch: {
    selected_status() {
      this.filterStock(this.selected_status)
    }
  },
  methods: {
    createItem() {
      this.$refs.all_items.$refs.create_stock.openModal()
    },
    filterStock(status) {
      this.$refs.all_items.getAllStocks(status)
    },
  }
}
</script>

<style scoped>

</style>

