<template>
  <section>
    <b-modal v-model="is_create_stock_modal_active" :destroy-on-hide="false" aria-label="Example Modal" aria-modal
             aria-role="dialog" close-button-aria-label="Close" has-modal-card trap-focus>
      <div class="card">
        <header class="card-header" style="font-weight:700; font-size: 20px; color: white;">
          Create New Request
        </header>
        <div class="card-content">
          <template>
            <section style="color: white;">
              <validation-observer ref="createItemValidation">
                <b-row>
                  <b-col md="6">
                    <validation-provider #default="{ errors }" name="qty" rules="required">
                      <b-field :message="errors[0]" :type="errors[0] ? 'is-danger' : 'is-success'" label="*Seller">
                        <v-select :options="item" v-model="form.supplier_id" style="color: rgb(180, 180, 180);"
                                  placeholder="Select a Seller">
                        </v-select>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="6">
                    <validation-provider #default="{ errors }" name="name" rules="required">
                      <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'" label="*Due Date">
                        <b-input v-model="form.due_date" maxlength="50" min="0" placeholder="e.g. 12"
                                 type="date">
                        </b-input>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col md="12">
                    <validation-provider #default="{ errors }" name="name" rules="required">
                      <b-field :message="errors[0]" :type="errors[0]?'is-danger':'is-success'" label="*Request">
                        <b-textarea v-model="form.request"
                                 maxlength="1000" placeholder="e.g. Lorem Ipsum is simply dummy text of the printing and typesetting industry...." type="text" style="height:100px; background-color: #1f1d2b; color: rgb(180, 180, 180); border-color: #424050;">
                        </b-textarea>
                      </b-field>
                    </validation-provider>
                  </b-col>
                  <b-col class="mt-5" md="12">
                    <b-button :disabled="is_btn_loading" :loading="is_btn_loading" class="ml-5" style="float: right"
                              type="is-info" @click="createStock">Create</b-button>
                    <b-button class="ml-5" style="float: right" type="is-secondary" @click="closeModal">Cancel
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
import SupplierApis from '../../../../apis/modules/supplier_apis/supplier_apis';
import ToastMixin from "../../../../mixins/ToastMixin";
// import staffApis from '../../../apis/modules/admin_pais/staff_apis'
import staffApis from '../../../../apis/modules/admin_pais/staff_apis'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

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
      is_create_stock_modal_active: false,
      is_btn_loading: false,
      item: [],
      form: {
        supplier_id: '',
        request:'',
        due_date:'',
      }
    }
  },

  methods: {
    openModal() {
      this.is_create_stock_modal_active = !this.is_create_stock_modal_active
    },
    async getAllItems() {
      try {
        this.is_table_loading = true
        let respond = (await staffApis.getAllStaff('supplier')).data.data.users
        this.item = respond.map((e, index) => ({
          value: e._id,
          label: e.first_name
        }))
      } catch (e) {

      }
      this.is_table_loading = false
    },

    async createStock() {
      try {
        this.is_btn_loading = true
        if (await this.$refs.createItemValidation.validate()) {
          console.log(this.form)
          let payload = {
            supplier_id: this.form.supplier_id.value,
            due_date: this.form.due_date,
            request:this.form.request
          }
          await StockApis.makeRequest(payload)
          this.success('Send Request')
          this.closeModal()
        }
      } catch (e) {
        this.danger('This Stock is Already Exists')
      }
      this.is_btn_loading = false
    },

    closeModal() {
      this.$parent.closeModel()
      this.form = {}
      this.is_create_stock_modal_active = !this.is_create_stock_modal_active
    }
  },
  async mounted() {
    await this.getAllItems()
  }
}
</script>
