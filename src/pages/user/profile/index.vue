<template>
  <DefaultLayout>
    <main class="mt-10">
      <div class="flex flex-wrap justify-center gap-5">
        <div class="w-max flex items-center flex-col">
          <img
            v-if="formData.imagePreview || authStore.user?.image"
            :src="formData.imagePreview || getBackendFullURL(authStore.user?.image)"
            class="object-cover rounded-full w-[272px] h-[272px]"
            alt="profile"
          />
          <img
            v-else
            :src="ProfileDefault"
            class="object-cover rounded-full w-[272px] h-[272px]"
            alt="profile"
          />

          <Button class="py-4 mt-5" @click="openFilePicker"
            >Select Image</Button
          >

          <!-- <FormInputFile class="w-[113px]" v-model="formData.image" type="file" /> -->
          <input
            type="file"
            accept="image/*"
            ref="fileInput"
            @change="selectImage"
            class="hidden"
          />
        </div>
        <div class="w-full px-2 md:w-2/3">
          <div class="text-xl font-bold text-primary mb-5">Profile</div>
          <form @submit.prevent="updateProfile">
           
           
            <hr class="my-5" />
            <div class="w-full md:flex block gap-3">
              <div class="w-full">
                <FormInput
                  v-model="formData.name"
                  :marginBottom="true"
                  formReadonly
                  placeholder="Nama"
                  class="w-full mt-2"
                >
                  <template #label
                    ><span class="text-primary">Nama</span></template
                  >
                </FormInput>
              </div>
              <div class="w-full">
                <FormInput
                  v-model="formData.email"
                  :marginBottom="true"
                  formReadonly
                  placeholder="Email"
                  class="w-full mt-2"
                >
                  <template #label
                    ><span class="text-primary">Email</span></template
                  >
                </FormInput>
              </div>
            </div>
            <div class="w-full md:flex block gap-3">
              <div class="md:w-1/2 w-full mt-2 mb-4">
                <span class="block text-primary mb-3 font-semibold text-sm"
                  >Gender</span
                >
                <RadioGroup class="flex" v-model="formData.gender">
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="laki-laki" value="make" />
                    <Label class="dark:text-white" for="laki-laki"
                      >Laki-laki</Label
                    >
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="perempuan" value="female" />
                    <Label class="dark:text-white" for="perempuan"
                      >Perempuan</Label
                    >
                  </div>
                </RadioGroup>
              </div>
              <div class="md:w-1/2 w-full">
                <FormInput
                  v-model="formData.phone_number"
                  :marginBottom="true"
                  formReadonly
                  placeholder="No Telp"
                  class="w-full mt-2"
                >
                  <template #label
                    ><span class="text-primary">No Telp</span></template
                  >
                </FormInput>
              </div>
            </div>
            <div class="w-full md:flex block gap-3">
              <div class="md:w-1/2 w-full">
                <FormInput
                  v-model="formData.username"
                  :marginBottom="true"
                  formReadonly
                  placeholder="Username"
                  class="w-full mt-2"
                >
                  <template #label
                    ><span class="text-primary">Username</span></template
                  >
                </FormInput>
              </div>
              <div class="md:w-1/2 w-full">
                <FormInput
                  v-model="formData.birthdate"
                  :marginBottom="true"
                  formReadonly
                  placeholder="Tanggal Lahir"
                  class="w-full mt-2"
                  type="date"
                >
                  <template #label
                    ><span class="text-primary">Tanggal Lahir</span></template
                  >
                </FormInput>
              </div>
            </div>
            <div class="w-full md:flex block gap-3">
              <div class="md:w-1/2 w-full">
                <FormInput formReadonly v-model="formData.province" placeholder="Provinsi">
                  <template #label
                    ><span class="text-primary">Provinsi</span></template
                  >
                </FormInput>
              </div>
              <div class="md:w-1/2 w-full">
                <FormInput formReadonly v-model="formData.city" placeholder="Kota">
                  <template #label
                    ><span class="text-primary">Kota</span></template
                  >
                </FormInput>
              </div>
            </div>
            <TextArea formReadonly v-model="formData.address" class="mt-2">
              <template #label
                ><span class="text-primary">Alamat</span></template
              >
            </TextArea>
            <hr class="my-5" />
            <div class="text-xl font-bold text-primary mb-5">
              Ganti Password
            </div>
            <div class="w-full md:flex block gap-3">
              <div class="md:w-1/2 w-full">
                <FormInput
                  v-model="formData.password"
                  :marginBottom="true"
                  placeholder="Password"
                  class="w-full"
                >
                  <template #label
                    ><span class="text-primary">Password</span></template
                  >
                </FormInput>
              </div>
              <div class="md:w-1/2 w-full">
                <FormInput
                  v-model="formData.password_confirmation"
                  :marginBottom="true"
                  placeholder="Konfirmasi Password"
                  class="w-full"
                >
                  <template #label
                    ><span class="text-primary"
                      >Konfirmasi Password</span
                    ></template
                  >
                </FormInput>
              </div>
            </div>

            <div class="flex gap-2 justify-end mt-4">
              <Button type="submit" class="py-2">Simpan</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import DefaultLayout from "@/layouts/dashboard/index.vue";
import Button from "@/components/button/index.vue";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ref } from "vue";
import ProfileDefault from "@/assets/images/profileDefault.png";
const authStore = useAuthStore()

const wawancara = ref({})
const formData = ref({});
formData.value = authStore.user
console.log(formData.value);
const isDaftar = ref(authStore.administrasi);
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// Function to select image and preview it
const selectImage = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    formData.value.image = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      formData.value.imagePreview = reader.result;
    };
  }
};


import { useLoading } from 'vue-loading-overlay';
import { useNotificationStore } from '@/stores/notification';
import { onMounted } from 'vue';
const $loading = useLoading({});
const notificationStore = useNotificationStore();
const user_id = authStore.user.id
const updateProfile = async () => {
  const loader = $loading.show({
  })
  try {
    const dataForm = new FormData();
    if (formData.value.password) {
      dataForm.append('password', formData.value.password);
    }
    if (formData.value.image) {
      dataForm.append('image', formData.value.image);
    }
    if (formData.value.password_confirmation) {
      dataForm.append('password_confirmation', formData.value.password_confirmation);
    }

    dataForm.append('_method', 'PUT');
    await authStore.updateProfile(user_id, dataForm);
    if (formData.value.password && formData.value.password_confirmation) {
      formData.value.password = '';
      formData.value.password_confirmation = '';
      authStore.logout();
    }
    notificationStore.showNotification('Profile updated', 'success');
  } catch (error) {
    notificationStore.showNotification(error?.response?.data?.message, 'error');
  } finally {
    loader.hide();
  }
};

// Function to trigger the file input programmatically
const openFilePicker = () => {
  (fileInput.value as HTMLInputElement).click();
};

const fileInput = ref<HTMLInputElement | null>(null);

const getBackendFullURL = (img) => {
  return import.meta.env.VITE_BASE_URL + 'storage/'+img;
};


const checkAdministrasiVerify = async () => {
  const loading = $loading.show();
  try {
    const response = await authStore.checkAdministrasiVerify();
  } catch (error) {
    notificationStore.showNotification(error?.response?.data?.message, 'error');
  } finally {
    loading.hide();
  }
}

onMounted(async () => {
  await checkAdministrasiVerify();
});
</script>
