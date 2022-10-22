<template>
    <section>
        <b-modal v-model="is_delete_purchase_order" :destroy-on-hide="false" aria-label="Example Modal" aria-modal
            aria-role="dialog" close-button-aria-label="Close" has-modal-card trap-focus>
            <div class="card">
                <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
                    Delete Purchase Order&nbsp;
                </header>
                <div class="card-content">
                    <template>
                        <section>
                            <validation-observer ref="deleteStockValidation">
                                <b-row>
                                    <b-col md="6">
                                        <validation-provider #default="{ errors }" name="reason" rules="required">
                                            <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'"
                                                label="Reason">
                                                <b-input v-model="form.reason" maxlength="30"
                                                    placeholder="e.g. Item not available" type="text">
                                                </b-input>
                                            </b-field>
                                        </validation-provider>
                                    </b-col>
                                    <b-col class="mt-5" md="12">
                                        <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5"
                                            style="float: right" type="is-info" @click="confirmCustomDelete()">
                                            Delete
                                        </b-button>
                                        <b-button class="ml-5" style="float: right" type="is-secondary"
                                            @click="closeModal">Cancel
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </validation-observer>
                        </section>
                    </template>
                </div>
            </div>
        </b-modal>
    </section>
    <!-- <AllPurchaseOrders ref="all_purchase_orders" /> -->
</template>
  
<script>
import StockApis from '../../../../apis/modules/stock_apis/stock_apis';
import ToastMixin from "../../../../mixins/ToastMixin";
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
    components: {
        ValidationObserver, ValidationProvider
    },
    mixins: [ToastMixin],
    data() {
        return {
            is_delete_purchase_order: false,
            is_btn_loading: false,
            form: {
                reason: '',
            }
        }
    },

    methods: {
        openModal(data) {
            // console.log(data)
            this.form = {
                _id: data.id,
                reason: data.reason,
                user: data.user,
                order_id: data.order_id,
                item: data.item,
                quantity: data.quantity,
                total: data.total_price
            }
            this.is_delete_purchase_order = !this.is_delete_purchase_order
        },

        confirmCustomDelete(data) {
            this.$buefy.dialog.confirm({
                title: 'Deleting Item',
                message: 'Are you sure you want to <b style="color:white;">Delete</b> this Purchase Order? This action cannot be undone.',
                confirmText: 'Delete Order',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.deletePurchaseOrder(data)
            })
        },
        async deletePurchaseOrder() {
            try {
                this.is_btn_loading = true
                if (await this.$refs.deleteStockValidation.validate()) {
                    console.log(this.form)
                    await StockApis.deletePurchaseOrder({ data: this.form })
                    this.success('Purchase Order Deleted Successfully')
                    this.closeModal()
                }
            } catch (e) {
                this.$buefy.toast.open(e.message)
            }
            this.is_btn_loading = false
        },

        closeModal() {
            this.$parent.closeModel()
            this.form = {}
            this.is_delete_purchase_order = !this.is_delete_purchase_order
        }
    }
}
</script>
  