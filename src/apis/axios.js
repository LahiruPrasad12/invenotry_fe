import axios from "axios";
import router from '../router/index'
import ErrorMixins from '../mixins/ToastMixin'

const instance = axios.create({
  baseURL: 'https://immense-mountain-15680.herokuapp.com'
});
if (localStorage.getItem('JWT')) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('JWT')}`;
}

instance.interceptors.response.use(config => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('JWT')
      localStorage.removeItem('IsLoggedIn')
      // ErrorMixins.methods.danger('Unauthenticated!!')
      window.location = '/'
    }
    return Promise.reject(error)
  })
export default instance
