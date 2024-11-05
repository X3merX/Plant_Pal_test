<template>
  <div>
    menu
    <ul class="mt-2">
      <li class="cursor-pointer" v-for="(item, index) in data" :key="index">
        <section>
          <div
            @click="toggleActive(index)"
            :class="{ 'bg-white dark:bg-[#1D1D1D]': router.currentRoute.value.path === item.path }"
            class="relative z-20 py-[6px] mb-2 flex gap-2 justify-between items-center px-[14px] rounded-md dark:text-[#828282] dark:hover:bg-[#1D1D1D] hover:bg-gray-200"
          >
            <section class="flex items-center gap-[20.29px]">
              <div
                class="shadow w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white"
              >
                <img :src="item.icon" alt="icon" />
              </div>
              <div class="text-[14px]">{{ item.name }}</div>
            </section>
            <section v-if="item.subItem && item.subItem.length">
              <img
                src="@/components/layouts/dashboard/icons/subitem.svg"
                alt="icon"
              />
            </section>
          </div>
          <Transition>
            <div v-if="item.active" class="relative z-10 dark:text-[#828282]">
              <!-- Filter out items based on isAdmin and isMentor -->
              <div
                v-for="subItem in filteredSubItems(item.subItem)"
                @click="router.push(subItem.path)"
                :key="subItem.name"
                :class="{ 'bg-white dark:bg-[#1D1D1D]': router.currentRoute.value.path === subItem.path }"
                class="py-[6px] ml-[30px] px-[14px] h-[40px] flex items-center gap-[20.29px] border-l-2 border-[#898989]"
              >
                <div
                  class="w-[17.6px] h-[17.6px] flex items-center justify-center rounded-full"
                >
                  <img :src="subItem.icon" alt="icon" />
                </div>
                <div class="text-[12px] w-full">{{ subItem.name }}</div>
              </div>
            </div>
          </Transition>
        </section>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import dashboardIcon from "@/components/layouts/dashboard/icons/dashboard.svg";

// Get the auth store and router
const authStore = useAuthStore();
const router = useRouter();

const isAdmin = ref(false);
const data = ref([]);

// Set isAdmin and isMentor on mounted
onMounted(() => {
  const role = authStore.user.role?.position.toLowerCase();
  isAdmin.value = true;
  
  data.value = [
    {
      name: "Profile",
      icon: dashboardIcon,
      path: "/admin",
      is_admin: true,
    },
    {
      name: "Admin",
      icon: dashboardIcon,
      path: "/admin/dahboard",
      subItem: [
        {
          name: "Dashboard",
          icon: dashboardIcon,
          active: false,
          path: "/admin/dahboard",
          is_admin: true,
        },
      ],
      active: false,
    },
  ];
});

// Toggle active state
const toggleActive = (index) => {
  if (data.value[index].subItem) {
    data.value[index].active = !data.value[index].active;
  } else {
    router.push(data.value[index].path);
  }
};

// Filter subItems based on `isAdmin` and `isMentor`
const filteredSubItems = (subItems) => {
  return subItems.filter((subItem) => {
    if (isAdmin.value) return subItem.is_admin;
    if (isMentor.value) return subItem.is_mentor;
    return !subItem.is_admin && !subItem.is_mentor;
  });
};

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.v-enter-to,
.v-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
