<template>
  <div class="">
<div class="main-container">
 <div class="main-header anim" style="--delay: 0s">Overview</div>
 <div class="main-blogs">
  <div class="main-blog anim" style="--delay: .1s">
   <div class="main-blog__title">TOTAL ORDERS</div>
   <div class="main-blog__title2">54</div>
   <div class="main-blog__author">
    <div class="author-detail">
     <div class="author-name">Order Management</div>
     <div class="author-info">Live Count</div>
    </div>
   </div>

  </div>
  <div class="main-blog anim" style="--delay: .2s">
     <div class="main-blog__title">TOTAL STOCK</div>
     <div class="main-blog__title2">80</div>
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
   <div class="video-name">TOTAL SUPPLIERS</div>
   <div class="video-name2">05</div>
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
   <div class="video-name">TOTAL STAFF</div>
   <div class="video-name2">10</div>
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
   <div class="video-name">TOTAL ITEMS</div>
   <div class="video-name2">75</div>
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
   <div class="video-name">TOTAL SHIPMENTS</div>
   <div class="video-name2">24</div>
  </div>
 </div>
</div>
      <div class="ft anim" style="--delay:0.3s; margin-bottom: 1%;">
          <p style="text-align:center">
            ?? 2022. EyePax Technologies. All Rights Reserved.
          </p>
      </div>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: "admin_home",
  data(){
    return{
      total_staff:0,
      total_shipping:0,

    }
  },
  async mounted() {
    console.log('Component mounted.');
    console.log(localStorage.getItem('JWT'))
    await this.autoLogin()
  },
  methods: {
    ...mapActions(['autoLogin'])
  },
}
</script>

<style scoped>

</style>
