import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/app.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

import FormInput from '@/components/form/Input.vue'
import FormInputFile from '@/components/form/InputFile.vue'
import FormTextArea from '@/components/form/TextArea.vue'
import FormSelect from '@/components/form/Select.vue'
import Table from '@/components/table/index.vue'
import 'boxicons'

import Notification from './components/notification/Index.vue'
app.component('Notification', Notification)
import axios from 'axios'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { useAuthStore } from './stores/authStore'
useAuthStore().refreshToken();
app.use(LoadingPlugin);
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.log(error);
    
    if (error.response && error.response.data) {
      // error token expired
      if (error.response.status == 401) {
        
        // swal.fire({icon: 'error', text: error.response.data.message});
        useAuthStore().logout();
      }
  
      // error email not verified
      if (error.response.status == 403) {
        // router.replace('/admin/email-verification');
      }

      if (error.response.status == 400) {
        // swal.fire({icon: 'error', html: error.response.data.message});
      }
      return Promise.reject(error);
    }
  
    // error network
    if (!error.status) {
    //   swal.fire({icon: 'error', html: error.message});
    }
    return Promise.reject(error);
});

import { TailwindPagination } from 'laravel-vue-pagination';
app.component('TailwindPagination', TailwindPagination)
app.component('Table', Table)
app.component('FormInput', FormInput) 
app.component('TextArea', FormTextArea) 
app.component('FormSelect', FormSelect)
app.component('FormInputFile', FormInputFile)
app.use(router)
app.mount('#app')
