<template>
  <DefaultLayout>
    <main class="mt-10">
      <div class="flex flex-wrap justify-center gap-5">
        <!-- Profile Picture Section -->
        <div class="w-max flex items-center flex-col">
          <!-- Show Profile Image -->
          <img
            v-if="formData.imagePreview || authStore.user?.image"
            :src="formData.imagePreview || getBackendFullURL(authStore.user?.image)"
            class="object-cover rounded-full w-[272px] h-[272px]"
            alt="profile"
          />
          <!-- Show Default Profile Image -->
          <img
            v-else
            :src="ProfileDefault"
            class="object-cover rounded-full w-[272px] h-[272px]"
            alt="profile"
          />
          <Button class="py-4 mt-5" @click="openFilePicker">Select Image</Button>
          <input
            type="file"
            accept="image/*"
            ref="fileInput"
            @change="selectImage"
            class="hidden"
          />
        </div>

        <!-- User Information Form -->
        <div class="w-full px-2 md:w-2/3">
          <div class="text-xl font-bold text-primary mb-5">Profile</div>
          <form @submit.prevent="updateProfile">
            <hr class="my-5" />
            <!-- Name and Email -->
            <div class="w-full md:flex block gap-3">
              <div class="w-full">
                <FormInput
                  v-model="formData.name"
                  :marginBottom="true"
                  formReadonly
                  placeholder="Nama"
                  class="w-full mt-2"
                >
                  <template #label><span class="text-primary">Nama</span></template>
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
                  <template #label><span class="text-primary">Email</span></template>
                </FormInput>
              </div>
            </div>

            <!-- Gender and Phone Number -->
            <div class="w-full md:flex block gap-3">
              <div class="md:w-1/2 w-full mt-2 mb-4">
                <span class="block text-primary mb-3 font-semibold text-sm">Gender</span>
                <RadioGroup class="flex" v-model="formData.gender">
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="laki-laki" value="male" />
                    <Label class="dark:text-white" for="laki-laki">Laki-laki</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="perempuan" value="female" />
                    <Label class="dark:text-white" for="perempuan">Perempuan</Label>
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
                  <template #label><span class="text-primary">No Telp</span></template>
                </FormInput>
              </div>
            </div>

            <!-- Other Fields -->
            <div class="w-full md:flex block gap-3">
              <div class="md:w-1/2 w-full">
                <FormInput
                  v-model="formData.username"
                  :marginBottom="true"
                  formReadonly
                  placeholder="Username"
                  class="w-full mt-2"
                >
                  <template #label><span class="text-primary">Username</span></template>
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
                  <template #label><span class="text-primary">Tanggal Lahir</span></template>
                </FormInput>
              </div>
            </div>

            <TextArea formReadonly v-model="formData.address" class="mt-2">
              <template #label><span class="text-primary">Alamat</span></template>
            </TextArea>

            <!-- Password Section -->
            <hr class="my-5" />
            <div class="text-xl font-bold text-primary mb-5">Ganti Password</div>
            <div class="w-full md:flex block gap-3">
              <div class="md:w-1/2 w-full">
                <FormInput
                  v-model="formData.password"
                  placeholder="Password"
                  class="w-full"
                >
                  <template #label><span class="text-primary">Password</span></template>
                </FormInput>
              </div>
              <div class="md:w-1/2 w-full">
                <FormInput
                  v-model="formData.password_confirmation"
                  placeholder="Konfirmasi Password"
                  class="w-full"
                >
                  <template #label
                    ><span class="text-primary">Konfirmasi Password</span></template
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
import { useAuthStore } from "@/stores/authStore";
import DefaultLayout from "@/layouts/dashboard/index.vue";
import Button from "@/components/button/index.vue";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProfileDefault from "@/assets/images/profileDefault.png";
import { ref, onMounted } from "vue";
import { useLoading } from "vue-loading-overlay";
import { useNotificationStore } from "@/stores/notification";

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const formData = ref({ ...authStore.user });
const fileInput = ref(null);

// Methods
const getBackendFullURL = (img) => import.meta.env.VITE_BASE_URL + "storage/" + img;

const selectImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    formData.value.image = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      formData.value.imagePreview = reader.result;
    };
  }
};

const updateProfile = async () => {
  const loader = useLoading().show();
  try {
    const dataForm = new FormData();
    if (formData.value.image) dataForm.append("image", formData.value.image);
    if (formData.value.password) {
      dataForm.append("password", formData.value.password);
      dataForm.append("password_confirmation", formData.value.password_confirmation);
    }
    await authStore.updateProfile(authStore.user.id, dataForm);
    notificationStore.showNotification("Profile updated", "success");
  } catch (error) {
    notificationStore.showNotification(error.response?.data?.message || "Error occurred", "error");
  } finally {
    loader.hide();
  }
};

const openFilePicker = () => fileInput.value.click();

onMounted(() => {
  if (!formData.value.image) formData.value.imagePreview = ProfileDefault;
});
</script>
