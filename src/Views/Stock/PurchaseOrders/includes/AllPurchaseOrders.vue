<template>
  <div>
    <div class="anim" style="--delay:0.2s;">
      <b-table ref="purchaseOrderTable" :data="item" :loading="is_table_loading" hover responsive>
        <b-table-column field="order_id" label="Order Id">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.order_id }}
          </template>
        </b-table-column>
        <b-table-column field="item" label="Item">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.item }}
          </template>
        </b-table-column>
        <b-table-column field="quantity" label="Quantity">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.quantity}}
          </template>
        </b-table-column>
        <b-table-column field="status" label="Status">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.status }}
          </template>
        </b-table-column>
        <b-table-column field="total_price" label="Total (Rs.)">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.total_price }}
          </template>
        </b-table-column>
        <b-table-column field="created_at" label="Created At">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.created_at }}
          </template>
        </b-table-column>


        <b-table-column field="action" label="Edit">
          <template v-slot="props">
            <b-tooltip label="Edit" position="is-right" target="">
              <b-button outlined style="border: hidden; background-color: #1f1d2b;"
                @click="editPurchaseOrder(props.row)">
                <svg class="bi bi-pencil-square" fill="currentColor" height="16" viewBox="0 0 16 16"
                  style="color: #ff7551" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    fill-rule="evenodd" />
                </svg>
              </b-button>
            </b-tooltip>
          </template>
        </b-table-column>

        <b-table-column field="action" label="Delete">
          <template v-slot="props">
            <b-tooltip label="Delete" position="is-right" target="">
              <b-button outlined style="border: hidden; background-color: #1f1d2b;"
                @click="deletePurchaseOrder(props.row)">
                <svg class="bi bi-trash-fill" fill="red" height="16" viewBox="0 0 16 16" width="16"
                  style="color: rgb(252, 72, 72)" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </b-button>
            </b-tooltip>
          </template>
        </b-table-column>
      </b-table>
    </div>

    <edit_purchase_order ref="edit_purchase_order" @getAllPurchaseOrders="getAllPurchaseOrders" />
    <delete_purchase_order ref="delete_purchase_order" @getAllPurchaseOrders="getAllPurchaseOrders" />
  </div>
</template>
  
<script>
// import SupplierApis from '../../../apis/modules/supplier_apis/supplier_apis';
import StockApis from '../../../../apis/modules/stock_apis/stock_apis';
// import create_item from "./create_item";
// import create_stock from "./create_stock";
import edit_purchase_order from "./edit_purchase_order";
import delete_purchase_order from "./delete_purchase_order"
import ToastMixin from "../../../../mixins/ToastMixin";

export default {
  name: "index",
  mixins: [ToastMixin],
  components: {
    edit_purchase_order, delete_purchase_order
  },
  data() {
    return {
      fields: [
        {
          field: 'order_id',
          label: 'Order Id',
          width: '40'
        },
        {
          field: 'item',
          label: 'Item',
        },
        {
          field: 'quantity',
          label: 'Quantity',
        },
        {
          field: 'status',
          label: 'Status',
        },
        {
          field: 'total_price',
          label: 'Total (Rs)',
        },
        {
          field: 'created_at',
          label: 'Created At',
        },
      ],
      purchaseOrders: [],
      is_table_loading: false
    }
  },

  methods: {
    async getAllPurchaseOrders() {
      try {
        this.is_table_loading = true
        let respond = (await StockApis.getAllPurchaseOrders()).data

        this.item = respond.map((e, index) => ({
          id: e.orders._id,
          order_id: e.orders.orderId,
          item: e.purchaseorders.item,
          quantity: e.purchaseorders.quantity,
          status: e.purchaseorders.status,
          user: e.orders.user,
          total_price: e.purchaseorders.price,
          created_at: e.purchaseorders.createdAt.substring(0, 10)
        }))
      } catch (e) {

      }
      this.is_table_loading = false
    },

    closeModel() {
      this.getAllPurchaseOrders()
    },

    editPurchaseOrder(data) {
      try {
        this.$refs.edit_purchase_order.openModal(data)
      } catch (e) {

      }
    },

    deletePurchaseOrder(data) {
      try {
        this.$refs.delete_purchase_order.openModal(data)
      } catch (e) {

      }
    }

    // confirmCustomDelete(data) {
    //   this.$buefy.dialog.confirm({
    //     title: 'Deleting Stock',
    //     message: 'Are you sure you want to <b style="color:white;">Delete</b> this stock? This action cannot be undone.',
    //     confirmText: 'Delete Stock',
    //     type: 'is-danger',
    //     hasIcon: true,
    //     onConfirm: () => this.deleteStock(data)
    //   })
    // },
    // async deleteStock(data) {
    //   try {

    //     await StockApis.deleteStock(data._id)
    //     this.success('Stock Deleted Successfully')
    //     await this.getAllStocks()
    //   } catch (e) {
    //     this.$buefy.toast.open(e.message)
    //   }
    // }
  },

  async mounted() {
    await this.getAllPurchaseOrders()
  }
}
</script>
  
<style scoped>

</style>
  