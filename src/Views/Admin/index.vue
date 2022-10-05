<template>
  <div class="">
<div class="main-container">
 <div class="main-header anim" style="--delay: 0s">Overview</div>
 <div class="main-blogs">
  <div class="main-blog anim" style="--delay: .1s">
   <div class="main-blog__title">TOTAL STAFF</div>
   <div class="main-blog__title2">{{total_staff}}</div>
   <div class="main-blog__author">
    <div class="author-detail">
     <div class="author-name">Order Management</div>
     <div class="author-info">Live Count</div>
    </div>
   </div>

  </div>
  <div class="main-blog anim" style="--delay: .2s">
     <div class="main-blog__title">TOTAL ITEMS</div>
     <div class="main-blog__title2">{{stocks}}</div>
     <div class="main-blog__author tips">
      <div class="author-detail">
       <div class="author-name">Stock Management</div>
       <div class="author-info">Live Count</div>
 </div></div></div></div>
 <div class="small-header anim" style="--delay: .3s">Analytics</div>
 <div class="videos">
  <div class="video anim" style="--delay: .4s">
   <div class="video-wrapper">
    <img src="https://i.postimg.cc/50HTYKN4/sup.jpg" type="">
    <div class="author-img__wrapper video-author">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
      <path d="M20 6L9 17l-5-5" />
     </svg>
     <img class="author-img" src="https://i.postimg.cc/cHX7WdN6/sup2.jpg" />
    </div>
   </div>
   <div class="video-by">Supplier Management</div>
   <div class="video-name">TOTAL SHIPPING ITEMS</div>
   <div class="video-name2">{{total_shipping}}</div>
  </div>
  <div class="video anim" style="--delay: .5s">

   <div class="video-wrapper">
     <img src="https://i.postimg.cc/Qtk5bhM0/staff-c.jpg" type="">
    <div class="author-img__wrapper video-author">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
      <path d="M20 6L9 17l-5-5" />
     </svg>
     <img class="author-img" src="https://i.postimg.cc/0Nv7Jzkb/staff2.jpg" />
    </div>
   </div>
   <div class="video-by">User Management</div>
   <div class="video-name">TOTAL STAFF MEMBERS</div>
   <div class="video-name2">{{total_staff_members}}</div>
  </div>
  <div class="video anim" style="--delay: .6s">

   <div class="video-wrapper">
    <img src="https://i.postimg.cc/RV3hCvzy/item.jpg" type="">
    <div class="author-img__wrapper video-author">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
      <path d="M20 6L9 17l-5-5" />
     </svg>
     <img class="author-img" src="https://i.postimg.cc/tRcPNSR0/item2.jpg" />
    </div>
   </div>
   <div class="video-by">Supplier Management</div>
   <div class="video-name">TOTAL STOCK MANAGERS</div>
   <div class="video-name2">{{total_stock_managers}}</div>
  </div>
  <div class="video anim" style="--delay: .7s">

   <div class="video-wrapper">
    <img src="https://i.postimg.cc/nh2h0rKs/de.jpg" type="">
    <div class="author-img__wrapper video-author">
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
      <path d="M20 6L9 17l-5-5" />
     </svg>
     <img class="author-img" src="https://i.postimg.cc/pT69krHQ/de2.jpg" />
    </div>
   </div>
   <div class="video-by">DELIVERY Management</div>
   <div class="video-name">TOTAL SUPPLIERS</div>
   <div class="video-name2">{{total_suppliers}}</div>
  </div>
 </div>
</div>
      <div class="ft anim" style="--delay:0.3s; margin-bottom: 1%;">
          <p style="text-align:center">
            © 2022. EyePax Technologies. All Rights Reserved.
          </p>
      </div>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import staffApis from "../../apis/modules/admin_pais/staff_apis";
import shippingItemApis from "../../apis/modules/admin_pais/shipping_item";
export default {
  name: "admin_home",
  data(){
    return{
      total_staff:0,
      total_staff_members:0,
      total_shipping:0,
      total_suppliers:0,
      total_items:0,
      total_orders:0,
      total_stock_managers:0,
      stocks:0,
      selected_role:'',
      status:'',
      staff:[],
      shipping_items:[]

    }
  },
  async mounted() {
    await this.getAllStaff()
    await this.getAllShippingItems()
    await this.getAllStocks()
  },
  methods: {
    ...mapActions(['autoLogin']),
    async getAllStaff(selected_role) {
      try {
        this.staff = (await staffApis.getAllStaff(selected_role)).data.data.users
        this.total_suppliers = this.staff.filter(e=>e.account_type === 'supplier').length
        this.total_stock_managers = this.staff.filter(e=>e.account_type === 'stock-manager').length
        this.total_staff_members = this.staff.filter(e=>e.account_type === 'staff').length
        this.total_staff = this.staff.length
      } catch (e) {

      }
    },
    async getAllShippingItems(status) {
      try {
        this.is_table_loading = true
        this.shipping_items = (await shippingItemApis.getAllShippingItems(status)).data.data.ShippingItems
        this.total_shipping = this.shipping_items.length
      } catch (e) {

      }
      this.is_table_loading = false
    },
    async getAllStocks() {
      try {
        this.is_table_loading = true
        this.stocks = (await shippingItemApis.getStock()).data.length
      } catch (e) {

      }
      this.is_table_loading = false
    },
  },


}
</script>

<style scoped>

</style>
