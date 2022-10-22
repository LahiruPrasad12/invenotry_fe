<template>
    <div>
        <div class="anim" style="--delay:0.2s;">
            <b-table ref="itemTable" :data="canceledOrders" :loading="is_table_loading" hover responsive>
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
                <b-table-column field="total" label="Total">
                    <template v-slot:header="{ column }">
                        <b-tooltip :label="column.label" append-to-body dashed>
                            {{ column.label }}
                        </b-tooltip>
                    </template>
                    <template v-slot="props">
                        {{ props.row.total }}
                    </template>
                </b-table-column>
                <b-table-column field="reason" label="Reason">
                    <template v-slot:header="{ column }">
                        <b-tooltip :label="column.label" append-to-body dashed>
                            {{ column.label }}
                        </b-tooltip>
                    </template>
                    <template v-slot="props">
                        {{ props.row.reason }}
                    </template>
                </b-table-column>
                <b-table-column field="deleted_at" label="Deleted At">
                    <template v-slot:header="{ column }">
                        <b-tooltip :label="column.label" append-to-body dashed>
                            {{ column.label }}
                        </b-tooltip>
                    </template>
                    <template v-slot="props">
                        {{ props.row.deleted_at }}
                    </template>
                </b-table-column>
            </b-table>
        </div>
    </div>
</template>
  
<script>
import CustomerApis from '../../../../apis/modules/customer_apis/customer_apis';
import ToastMixin from "../../../../mixins/ToastMixin";

export default {
    name: "index",
    mixins: [ToastMixin],
    components: {
    },
    data() {
        return {
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
                    field: 'total',
                    label: 'Total',
                },
                {
                    field: 'reason',
                    label: 'Reason',
                },
                {
                    field: 'deleted_at',
                    label: 'Deleted At',
                },
            ],
            canceledOrders: [],
            is_table_loading: false
        }
    },

    methods: {
        async getAllCanceledOrders() {
            try {
                this.is_table_loading = true
                let respond = (await CustomerApis.getCanceledOrders()).data

                this.canceledOrders = respond.map((e, index) => ({
                    order_id: e.canceledorders.orderId,
                    total: e.canceledorders.total,
                    item: e.canceledorders.item,
                    qty: e.canceledorders.quantity,
                    reason: e.canceledorders.reason,
                    deleted_at: e.canceledorders.deletedAt.substring(0, 10)
                }))
            } catch (e) {

            }
            this.is_table_loading = false
        },
    },

    async mounted() {
        await this.getAllCanceledOrders()
    }
}
</script>
  
<style scoped>

</style>
  