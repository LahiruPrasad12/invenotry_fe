<template>
    <section>
        <b-modal size="sm" v-model="order_modal_active" :destroy-on-hide="false" aria-label="Example Modal" aria-modal
            aria-role="dialog" close-button-aria-label="Close" has-modal-card trap-focus>
            <div class="card">
                <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
                    Create New Order
                </header>
                <div class="card-content">
                    <template>
                        <section style="color: white;">
                            <validation-observer ref="createItemValidation">
                                <b-row>
                                    <b-col md="6">
                                        <validation-provider #default="{ errors }" name="id" rules="required">
                                            <b-field :message="errors[0]" :type="errors[0] ? 'is-danger' : 'is-success'"
                                                label="Order ID">
                                                <b-input v-model="form.id" type="text" disabled="true"
                                                    style="white-space: pre"></b-input>
                                            </b-field>
                                        </validation-provider>
                                        <validation-provider #default="{ errors }" name="item" rules="required">
                                            <b-field :message="errors[0]" :type="errors[0] ? 'is-danger' : 'is-success'"
                                                label="Item*">
                                                <v-select :options="item" v-model="form.item"
                                                    style="color: rgb(180, 180, 180);" placeholder="Select an Item">
                                                </v-select>
                                            </b-field>
                                        </validation-provider>
                                        <br />
                                        <validation-provider #default="{ errors }" name="qty" rules="required">
                                            <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'"
                                                label="Quantity">
                                                <b-input v-model="form.qty" maxlength="10" placeholder="e.g. 12"
                                                    type="number">
                                                </b-input>
                                            </b-field>
                                        </validation-provider>
                                        <b-col md="6">
                                        </b-col>
                                    </b-col>
                                    <b-col class="mt-5" md="12">
                                        <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5"
                                            style="float: right" type="is-info" @click="createOrder">Add
                                        </b-button>
                                        <b-button class="ml-5" style="float: right" type="is-secondary"
                                            @click="closeModal">Cancel</b-button>
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
import Vue from 'vue';
import SupplierApis from '../../../apis/modules/supplier_apis/supplier_apis';
import CustomerApis from '../../../apis/modules/customer_apis/customer_apis';
import ToastMixin from "../../../mixins/ToastMixin";
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

Vue.component('v-select', vSelect)

export default {
    components: {
        ValidationObserver, ValidationProvider
    },
    mixins: [ToastMixin],
    data() {
        return {
            selected: new Date(),
            showWeekNumber: false,
            locale: undefined,
            order_modal_active: false,
            is_btn_loading: false,
            form: {
                id: '',
                item: '',
                qty: '',
            },
            item: []
        }
    },

    methods: {
        openModal() {
            let randomNumber = Math.floor(Math.random() * 10000 + 1);
            let orderId = new Date().toISOString().slice(0, 10) + "-" + randomNumber;
            this.order_modal_active = !this.order_modal_active
            this.form.id = orderId
        },

        async getAllItems() {
            try {
                this.is_table_loading = true
                let respond = (await SupplierApis.getAll()).data.data.items
                this.item = respond.map((e, index) => ({
                    value: e._id,
                    label: e.name,
                }))
            } catch (e) {

            }
            this.is_table_loading = false
        },

        async createOrder() {
            try {
                this.is_btn_loading = true
                if (await this.$refs.createItemValidation.validate()) {
                    await CustomerApis.createOrder({ order: this.form })
                    this.success('Order Created Successfully')
                    this.closeModal()
                }
            } catch (e) {
                this.danger('Something went wrong....!')
            }
            this.is_btn_loading = false
        },

        closeModal() {
            this.$parent.closeModel()
            this.form = { id: '', qty: '' }
            this.order_modal_active = !this.order_modal_active
        }

    },
    computed: {
        console: () => console
    },
    async mounted() {
        await this.getAllItems()
    }
}
</script>
  