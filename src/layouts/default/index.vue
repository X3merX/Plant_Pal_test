<template>
  <div>
    <!-- Navbar -->
    <header class="navbar bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div class="logo text-xl font-bold">Your Logo</div>
      <nav class="nav-links">
        <ul class="flex space-x-6">
          <li><a href="#" class="hover:underline">Home</a></li>
          <li><a href="#" class="hover:underline">About</a></li>
          <li><a href="#" class="hover:underline">Program</a></li>
          <li><a href="#" class="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>

    <!-- Slot for Page Content -->
    <main class="main-content">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.main-content {
  margin-top: 60px; /* Adjust based on the height of the navbar */
}
</style>
