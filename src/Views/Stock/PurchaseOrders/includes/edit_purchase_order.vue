<template>
    <section>
        <b-modal v-model="is_update_purchase_order_active" :destroy-on-hide="false" aria-label="Example Modal"
            aria-modal aria-role="dialog" close-button-aria-label="Close" has-modal-card trap-focus>
            <div class="card">
                <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
                    Update Purchase Order&nbsp;Status
                </header>
                <div class="card-content">
                    <template>
                        <section>
                            <validation-observer ref="updateStockValidation">
                                <b-row>
                                    <b-col md="6">
                                        <validation-provider #default="{ errors }" name="status" rules="required">
                                            <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'"
                                                label="Status">
                                                <b-select v-model="form.status" placeholder="Select Status">
                                                    <option style="color: rgb(180, 180, 180);" value="">Select Status
                                                    </option>
                                                    <option style="color: rgb(180, 180, 180);" value="Approved">Approved
                                                    </option>
                                                    <option style="color: rgb(180, 180, 180);" value="Not Available">Not
                                                        Available
                                                    </option>
                                                </b-select>
                                            </b-field>
                                        </validation-provider>
                                    </b-col>
                                    <b-col class="mt-5" md="12">
                                        <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5"
                                            style="float: right" type="is-info" @click="updatePurchaseOrder">Update
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
            is_update_purchase_order_active: false,
            is_btn_loading: false,
            form: {
                status: '',
            }
        }
    },

    methods: {
        openModal(data) {
            console.log(data)
            this.form = {
                _id: data.id,
                order_id: data.order_id,
                status: data.status
            }
            this.is_update_purchase_order_active = !this.is_update_purchase_order_active
        },

        async updatePurchaseOrder() {
            try {
                this.is_btn_loading = true
                if (await this.$refs.updateStockValidation.validate()) {
                    console.log(this.form)
                    await StockApis.updatePurchaseOrder({ data: this.form })
                    this.success('Purchase Order Updated Successfully')
                    this.closeModal()
                }
            } catch (e) {
                this.danger('Purchase Order Failed!')
            }
            this.is_btn_loading = false
        },

        closeModal() {
            this.$parent.closeModel()
            this.form = {}
            this.is_update_purchase_order_active = !this.is_update_purchase_order_active
        }
    }
}
</script>
  