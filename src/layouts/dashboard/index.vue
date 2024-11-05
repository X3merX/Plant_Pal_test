<template>
  <section class="w-screen h-screen dark:bg-[#0C0A09] bg-[#F3F6F8] flex ">
    <Transition name="side">
      <section
        v-if="useSidebarStore().sidebar"
        class="sm:w-[326px] z-50 w-full dark:bg-[#0C0A09] bg-[#F3F6F8] px-[30px] pt-[29px] h-full md:relative fixed left-0 shadow"
      >
        <DashboardHeader />

        <footer class="absolute w-[80%] bottom-10">
          <ButtonDefault @click="logout" class="w-full p-3">Logout</ButtonDefault>
        </footer>
        <DashboardMenu />
      </section>
    </Transition>
    <main class="md:px-[62px] px-10 w-screen h-full overflow-auto">
      <header class="flex gap-4 justify-between items-center h-[114px]">
        <section class="flex gap-5 w-full items-center">
          <div
            v-if="!useSidebarStore().sidebar"
            @click="useSidebarStore().toggle()"
            class="w-[53px] h-[53px] dark:bg-[#1D1D1D] cursor-pointer bg-white rounded-full flex justify-center items-center"
          >
            <img
              src="@/components/layouts/dashboard/icons/open-sidebar.svg"
              alt="icon"
            />
          </div>
          <div class="hidden sm:block dark:text-white">Hallo, {{ truncateString(authStore.user.name) }}!</div>
        </section>
        <DropdownMenu>
          <DropdownMenuTrigger class="bg-primary hover:bg-[#0C3E7C] text-white w-full max-w-[126px] px-2 py-2 rounded block sm:hidden"
            >Hallo, {{ truncateString(authStore.user.name) }}!</DropdownMenuTrigger
          >
          <DropdownMenuContent>
            <Button
              @click="toggleDarkMode"
              class="dark:bg-[#1D1D1D] hover:dark:bg-[#353535] text-white bg-primary hover:bg-[#0C3E7C]"
            >
              <span class="dark:text-white">{{
                useDarkModeStore().darkMode ? "Light Mode ☀" : "Dark Mode 🌙"
              }}</span>
            </Button>
            <DropdownMenuItem @click="authStore.user.role.position.toLowerCase() === 'admin' || authStore.user.role.position.toLowerCase() === 'mentor' ? $router.push('/admin/profile') : $router.push('/peserta/profile')">Profile</DropdownMenuItem>
            <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <section class="sm:block hidden">
          <Button
            @click="toggleDarkMode"
            class="dark:bg-[#1D1D1D] bg-primary hover:bg-[#0C3E7C] hover:dark:bg-[#353535] text-white"
          >
            <span class="dark:text-white">{{
              useDarkModeStore().darkMode ? "Light Mode ☀" : "Dark Mode 🌙"
            }}</span>
          </Button>
        </section>
      </header>
      <div class="h-[85%] w-full overflow-auto">
        <slot />
      </div>
    </main>
  </section>
</template>

<script setup>
import DashboardHeader from "@/components/layouts/dashboard/sidebar/header/index.vue";
import DashboardMenu from "@/components/layouts/dashboard/sidebar/menu/index.vue";
import { Button } from "@/components/ui/button";
import { useDarkModeStore } from "@/stores/darkmode";
import { useSidebarStore } from "@/stores/sidebar";
import ButtonDefault from "@/components/button/index.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
function toggleDarkMode() {
  useDarkModeStore().toggle();
}
const router = useRouter();
const logout = async () => {
  try {
    await authStore.logout();
    localStorage.clear();
    router.push({ path: "/login" });
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

function truncateString(str) {
  if (str === null || str === undefined) return null;
    return str.length > 11 ? str.slice(0, 5) + '...' : str;
}

</script>

<style lang="scss" scoped></style>

<style scoped>
.side-enter-active,
.side-leave-active {
  transition: opacity 0.2s ease-in, transform 0.1s ease-in;
}

.side-enter-from,
.side-leave-to {
  opacity: 0;
  transform: translateX(-20px); /* Start slightly above */
}

.side-enter-to,
.side-leave-from {
  transform: translateX(0); /* Ends in the normal position */
  opacity: 1;
}
</style>
