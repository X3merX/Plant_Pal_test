<template>
    <section class="w-screen h-screen flex flex-col md:flex-row">
      <div
        class="bg-primary h-full w-full items-center justify-center hidden md:flex"
      >
        <img src="@/assets/images/authHero.png" alt="authhero" />
      </div>
      <div class="bg-[#F3F6F8] h-full w-full flex items-center justify-center">
          <slot />    
      </div>
    </section>
  </template>
  
  <script setup></script>
  
  <style lang="scss" scoped></style>
  