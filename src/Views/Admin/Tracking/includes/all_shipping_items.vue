<template>

  <div>
    <div class="anim" style="--delay:0.2s;">
      <b-table ref="shippingItemTable" :data="shipping_items" :loading="is_table_loading" hover responsive>
        <b-table-column field="id" label="ID">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.id }}
          </template>
        </b-table-column>
        <b-table-column field="user_name" label="User Name">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.orders.name}}
          </template>
        </b-table-column>
        <b-table-column field="item_code" label="Item Code">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.item.item_code}}
          </template>
        </b-table-column>
        <b-table-column field="qty" label="Quantity">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.orders.quantity}}
          </template>
        </b-table-column>
        <b-table-column field="status" label="Status">
          <template v-slot:header="{ column }">
            <b-tooltip :label="column.label" append-to-body dashed>
              {{ column.label }}
            </b-tooltip>
          </template>
          <template v-slot="props">
            {{ props.row.orders.status }}
          </template>
        </b-table-column>

        <b-table-column field="action1" label="View More">
          <template v-slot="props">
            <b-tooltip label="Edit" position="is-right" target="">
              <b-button outlined style="border: hidden; background-color: #1f1d2b;" @click="updateState(props.row)">
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
        <b-table-column field="action2" label="Get PDF">
          <template v-slot="props">
            <b-tooltip label="PDF" position="is-right" target="">
              <b-button outlined style="border: hidden; background-color: #1f1d2b;" @click="getPDF(props.row)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF"
                  class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                  <path
                    d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                  <path
                    d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
              </b-button>
            </b-tooltip>
          </template>
        </b-table-column>

      </b-table>
    </div>

    <update_state ref="update_state" @getAllStaff="getAllShippingItems" />
    <pdf ref="pdf" @getAllStaff="getAllShippingItems" />
  </div>
</template>

<script>
import shippingItemApis from '../../../../apis/modules/admin_pais/shipping_item'
import update_state from "../includes/update_state";
import pdf from "../includes/pdf";
import jspdf from "jspdf";
import "jspdf-autotable"
import Logo from "../../../../images/logo.png";
export default {
  name: "all_shipping_items",
  components: {
    update_state, pdf
  },
  data() {
    return {
      selected_status: undefined,
      fields: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'status',
          label: 'Status',
        },
        {
          field: 'qty',
          label: 'Quantity',
        },
        {
          field: 'user_name',
          label: 'User Name',
        },
        {
          field: 'item_code',
          label: 'Item Code',
        },
      ],
      shipping_items: [],
      is_table_loading: false
    }
  },
  watch: {
    selected_status() {
      this.getAllShippingItems(this.selected_status)
    }
  },
  methods: {
    check() {
      alert('hello')
    },
    async getAllShippingItems(status) {
      try {
        this.is_table_loading = true
        let respond = (await shippingItemApis.getAllShippingItems(status)).data
        console.log(respond)
        this.shipping_items = respond.map((e, index) => ({
          item: e.items,
          id: index + 1,
          orders: e.orders
        }))
      } catch (e) {

      }
      this.is_table_loading = false
    },

    generatePDF() {
      const doc = new jspdf();
      let initiateItems = this.shipping_items.filter((i) => i.orders.status === 'Initiated')
      let deliveredItem = this.shipping_items.filter((i) => i.orders.status === 'Delivered')
      let pendingItems = this.shipping_items.filter((i) => i.orders.status === 'Pending')
      // const tableColumn = ["Item Code", "Shipping Status", "Quantity"];
      const columns = [
        { title: "#", dataKey: "id" },
        { title: "Item Code", dataKey: "item_code" },
        { title: "Shipping Status", dataKey: "status" },
        { title: "Quantity", dataKey: "qty" }
      ];
      const tableRows = [];

      this.shipping_items.slice(0).reverse().map(item => {
        let addItem = {
          id: item.item.id,
          item_code: item.item.item_code,
          status: item.orders.status,
          qty: item.orders.qty
        };
        tableRows.push(addItem);
      });

      const date = Date().split(" ");
      const dateStr = date[1] + "-" + date[2] + "-" + date[3];

      doc.setFillColor(31, 29, 43);
      doc.rect(0, 0, 400, 50, "F");
      doc.addImage(Logo, "JPEG", 75, 2, 60, 30);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(15);
      doc.text(79, 40, "Shipping Details Report");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(`Report Generated Date - ${dateStr} `, 147, 5);

      doc.autoTable({
        columns,
        body: tableRows,
        styles: {
          fontSize: 12,
          halign: "center",
          backgroundColor: "transparent",
        },
        startY: 63,
      });

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(`All Items : ${this.shipping_items.length}`, 85, 125)
      doc.text(`Initiated Items : ${initiateItems.length}`, 85, 130)
      doc.text(`Pending Items : ${pendingItems.length}`, 85, 135)
      doc.text(`Deliverd Items : ${deliveredItem.length}`, 85, 140)
      doc.text(`Report Generated Date - ${dateStr} `, 85, 145)
      doc.save(`Shipping-Details-Report_${dateStr}.pdf`);

    },

    updateState(data) {
      this.$refs.update_state.openModal(data)
    },
    getPDF(data) {
      this.$refs.pdf.openModal(data)
    },
    closeModel() {
      this.getAllShippingItems(this.selected_status)
    },
  },

  async mounted() {
    await this.getAllShippingItems(this.selected_status)
  }
}
</script>

<style scoped>

</style>
