<template>
    <div>
        <div class="anim" style="--delay:0.2s;">
            <b-table ref="itemTable" :data="orders" :loading="is_table_loading" hover responsive>
                <b-table-column field="order_id" label="Order ID">
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
                <b-table-column field="qty" label="Qty">
                    <template v-slot:header="{ column }">
                        <b-tooltip :label="column.label" append-to-body dashed>
                            {{ column.label }}
                        </b-tooltip>
                    </template>
                    <template v-slot="props">
                        {{ props.row.qty }}
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
                            <b-button outlined v-if="props.row.status === 'Initiated'"
                                style="border: hidden; background-color: #1f1d2b;" @click="editOrder(props.row)">
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
                        <b-tooltip label="Delete"
                            v-if="props.row.status === 'Delivered' || props.row.status === 'Initiated' || props.row.status === 'Not Available'"
                            position="is-right" target="">
                            <b-button outlined style="border: hidden; background-color: #1f1d2b;"
                                @click="confirmCustomDelete(props.row)">
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

        <create_order ref="create_order" @getAllItems="getAllItems" />
        <edit_order ref="edit_order" @getAllOrders="getAllOrders" />
    </div>
</template>
  
<script>
import create_order from './CreateOrder';
import edit_order from './EditOrder';
import CustomerApis from '../../../apis/modules/customer_apis/customer_apis';
import ToastMixin from "../../../mixins/ToastMixin";
import Logo from "../../../images/logo.png";
import jspdf from "jspdf";
import "jspdf-autotable"

export default {
    name: "index",
    mixins: [ToastMixin],
    components: {
        create_order,
        edit_order
    },
    data() {
        return {
            selected_status: undefined,
            fields: [
                {
                    field: 'order_id',
                    label: 'Order ID',
                    width: '40'
                },
                {
                    field: 'item',
                    label: 'Item',
                },
                {
                    field: 'qty',
                    label: 'Qty',
                },
                {
                    field: 'price',
                    label: 'Price',
                },
                {
                    field: 'status',
                    label: 'Status',
                },
                {
                    field: 'created_at',
                    label: 'Created At',
                },
            ],
            orders: [],
            is_table_loading: false
        }
    },
    watch: {
        selected_status() {
            this.getAllOrders(this.selected_status)
        }
    },

    methods: {
        async getAllOrders(status) {
            try {
                this.is_table_loading = true
                let respond = (await CustomerApis.getAllOrders(status)).data

                this.orders = respond.map((e, index) => ({
                    id: e.orders._id,
                    order_id: e.orders.orderId,
                    price: e.items.price,
                    item: e.items.name,
                    qty: e.orders.quantity,
                    status: e.orders.status,
                    created_at: e.orders.createdAt.substring(0, 10)
                }))
            } catch (e) {

            }
            this.is_table_loading = false
        },

        generatePDF() {
            const doc = new jspdf();

            const columns = [
                { title: "Order Id", dataKey: "id" },
                { title: "Item Name", dataKey: "item" },
                { title: "Quantity", dataKey: "qty" },
                { title: "Price", dataKey: "price" },
                { title: "Status", dataKey: "status" },
                { title: "Order Date", dataKey: "created_at" }
            ];
            const tableRows = [];

            let total = 0;
            this.orders.slice(0).filter(val => val.status === 'Delivered').forEach((x) => {
                total = total + x.price * 1
            })

            this.orders.slice(0).filter(val => val.status === 'Delivered').map(e => {
                let addOrder = {
                    id: e.order_id,
                    price: e.price,
                    item: e.item,
                    qty: e.qty,
                    status: e.status,
                    created_at: e.created_at.substring(0, 10)
                };
                tableRows.push(addOrder);
            });
            const date = Date().split(" ");
            const dateStr = date[1] + "-" + date[2] + "-" + date[3];

            doc.setFillColor(31, 29, 43);
            doc.rect(0, 0, 400, 50, "F");
            doc.addImage(Logo, "JPEG", 75, 2, 60, 30);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(15);
            doc.text(81, 40, "Order Items Report");
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
            doc.text(`Total Costs - Rs.${total.toLocaleString("en-US")} `, 90, 60);
            doc.save(`Order-Details-Report_${dateStr}.pdf`);

        },

        closeModel() {
            this.getAllOrders(this.selected_status)
        },

        editOrder(data) {
            try {
                this.$refs.edit_order.openModal(data)
            } catch (e) {

            }
        },

        confirmCustomDelete(data) {
            this.$buefy.dialog.confirm({
                title: 'Deleting Item',
                message: 'Are you sure you want to <b style="color:white;">Delete</b> this Order? This action cannot be undone.',
                confirmText: 'Delete Order',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.deleteOrder(data)
            })
        },
        async deleteOrder(data) {
            console.log(data)
            try {

                await CustomerApis.deleteOrder(data.id)
                this.success('Order Deleted Successfully')
                await this.getAllOrders(this.selected_status)
            } catch (e) {
                this.$buefy.toast.open(e.message)
            }
        }
    },

    async mounted() {
        await this.getAllOrders(this.selected_status)
    }
}
</script>
  
<style scoped>

</style>
  