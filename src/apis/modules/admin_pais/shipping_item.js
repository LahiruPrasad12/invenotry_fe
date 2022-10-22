import api from "../../axios";
const baseURL = '/api/v1'

export default {
  getAllShippingItems: (status) => api.get(`${baseURL}/shipping-item${status?`?status=${status}`:''}`),
  UpdateShippingItems: (payload) => api.put(`${baseURL}/shipping-item`,payload),
  getItem: (id,payload) => api.get(`${baseURL}/shipping-item/${id}`,payload),

}
