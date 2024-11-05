<template>
  <div class="relative min-h-screen w-full">
    <Transition name="overlay">
      <div
        v-if="useSidebarStore().sidebar"
        class="w-full lg:hidden fixed bg-black bg-opacity-50 top-0 h-full z-40"
      ></div>
    </Transition>
    <Transition>
      <section class="lg:hidden" v-if="useSidebarStore().sidebar">
        <div class="fixed top-0 right-0 h-full z-50">
          <div
            class="w-[300px] h-full bg-[#F3F6F8] text-primary font-bold p-5 absolute top-0 right-0 z-50"
          >
            <header class="flex justify-between items-center">
              <img class="h-[40px]" src="" alt="logo" />
              <div
                @click="useSidebarStore().toggle()"
                class="w-[53px] h-[53px] dark:bg-[#1D1D1D] cursor-pointer bg-white rounded-full flex justify-center items-center"
              >
                <img
                  class="transform -scale-x-100"
                  src="@/components/layouts/dashboard/icons/collapse.svg"
                  alt="icon"
                />
              </div>
            </header>
            <main class="mt-10">
              <sidebarMenu />
            </main>
          </div>
        </div>
      </section>
    </Transition>

    <header class="fixed top-0 left-0 right-0 z-30">
      <nav
        class="h-[90px] bg-[#F3F6F8] flex justify-between items-center px-[40px] md:px-[69px]"
      >
        <section>
          <img class="h-[40px]" src="" alt="logo" />
        </section>
        <div
          @click="useSidebarStore().toggle()"
          class="w-[53px] lg:hidden h-[53px] dark:bg-[#1D1D1D] cursor-pointer bg-white rounded-full flex justify-center items-center"
        >
          <img
            src="@/components/layouts/dashboard/icons/collapse.svg"
            alt="icon"
          />
        </div>
        <section class="lg:flex hidden">
          <ul class="flex gap-4 items-center text-primary font-semibold">
            <li class="cursor-pointer" @click="GoTo('/')">Home</li>
            <li class="cursor-pointer" @click="GoTo('/about')">About</li>
            <li>
              <section class="flex gap-4">
                <Dropdown
                  :title="'Program'"
                  :items="dropdownItems"
                  :dropdownIndex="index"
                  :activeDropdown="activeDropdown"
                  :setActiveDropdown="setActiveDropdown"
                />
              </section>
            </li>
            <li class="cursor-pointer" @click="scrollToId('#contact')">Contact</li>
          </ul>
          <Button @click="GoTo('/login')" class="ms-10">Login</Button>
        </section>
      </nav>
    </header>
    <main class="mt-[90px]">
      <slot />
    </main>
    <footer id="contact" class="mt-20 h-full-[40px] md:px-[69px] py-[69px] bg-primary">
      <div
        class="w-full gap-10 flex flex-col md:flex-row items-center justify-center"
      >
        <div class="md:w-1/2 w-full hidden md:flex justify-center px-10">
          <section>
            <div
              class="text-white text-lg text-wrap font-light mt-5 w-max max-w-[400px] text-start"
            >
              <span class="mb-3 flex items-center gap-2"
                ><Call class="fill-white" /> Phone : +62 813-9398-9999
              </span>
              <span class="flex items-center gap-2 mb-3"
                ><Mail class="fill-white" />Mail : email@mail.com
              </span>
            </div>
            <div class="text-white">
              <span class="text-2xl font-bold"> Connect with us on </span>
              <div class="flex gap-2 items-center mt-4">
                <Instagram class="fill-white w-6" />
                <a
                  href="https://www.instagram.com/mai_institute/"
                  class="font-regular"
                  >PlantPal</a
                >
              </div>
            </div>
          </section>
        </div>
        <!-- <div class="md:w-1/2 w-full px-10">
          <div class="text-2xl text-start text-white font-medium">Contact</div>
          <form>
            <div class="flex gap-5">
              <FormInput placeholder="Email" class="w-full mt-5">
                <template #label>Email</template>
              </FormInput>
              <FormInput placeholder="Name" class="w-full mt-5">
                <template #label>Name</template>
              </FormInput>
            </div>
            <FormInput placeholder="Subject" class="w-full mt-5">
              <template #label>Subject</template>
            </FormInput>
            <TextArea placeholder="Pesan">
              <template #label>Pesan</template>
            </TextArea>
            <Button outline :hover="false" class="float-end w-max py-3 mt-5">Kirim</Button>
          </form>
        </div> -->
        <div class="md:w-1/2 w-full flex justify-center px-10 md:hidden">
          <section>
            <div
              class="text-white text-lg text-wrap font-light mt-5 w-max max-w-[400px] text-start"
            >
              <span class="block mb-3">Phone : 021- 2279 3300  </span>
              <span class="block mb-3">Fax : 021- 2279 3300</span>
              <span class="block mb-3">Mail : +62 813-9398-9999 </span>
            </div>
            <div class="text-white">
              <!-- <span class="text-2xl font-bold"> Conect with us on </span> -->
              <div class="flex gap-2 items-center mt-4">
                <InstagramIcon class="fill-white w-6" />
                <a
                  href="https://www.instagram.com/mai_institute/"
                  class="font-regular"
                  >PlantPal</a
                >
              </div>
              <PhoneIcon class="text-white fill-white" />
            </div>
          </section>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Dropdown from "@/components/dropdown/index.vue";
import Button from "@/components/button/index.vue";
import { useSidebarStore } from "@/stores/sidebar";
import sidebarMenu from "@/components/layouts/landing/sidebar/menu/index.vue";
import Instagram from "@/components/icons/instagram.vue";
import Call from "@/components/icons/call.vue";
import Mail from "@/components/icons/mail.vue";
import { useRouter } from "vue-router";
const activeDropdown = ref(null);

const setActiveDropdown = (index) => {
  activeDropdown.value = index;
};

const dropdownItems = [
  { label: "dropdown menu", link: "/learning_camp" },
];

const router = useRouter();
const GoTo = (path) => {
  router.push(path);
}


const scrollToId = (elementId) => {
  const element = document.querySelector(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

</script>

<style scoped>
.side-enter-active,
.side-leave-active {
  transition: transform 0.4s ease-in-out; /* Reduced duration and added opacity */
}

.side-enter-from,
.side-leave-to {
  transform: translateX(100%); /* Sidebar starts off-screen */
}

.side-enter-to,
.side-leave-from {
  transform: translateX(0); /* Sidebar moves into view */
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease-in-out; /* Adjust opacity for the overlay */
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
.overlay-enter-to,
.overlay-leave-from {
  opacity: 1;
}
</style>
