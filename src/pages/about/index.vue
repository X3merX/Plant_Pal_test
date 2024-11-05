<template>
  <DefaultLayout>
    <section class="w-full px-[40px] h-[714px] md:px-[69px]">
      <!-- Image Container (relative for positioning the overlay) -->
      <div class="relative w-full h-full rounded-lg overflow-hidden">
        <!-- Background Image -->
        <img
          class="w-full h-full object-cover"
          src="@/assets/images/hero2.png"
          alt="hero2"
        />

        <!-- Overlay (applied only to the image) -->
        <div
          class="absolute inset-0 bg-black bg-opacity-50 text-white flex justify-center items-center rounded-lg"
        >
          <section class="text-center max-w-[700px] p-4">
            <div class="text-4xl font-bold">Mandiri Amal Insani</div>
          </section>
        </div>
      </div>
    </section>

    <section
      class="px-[40px] mt-20 md:px-[69px] flex gap-20 justify-center items-center"
    >
      <div class="md:w-2/3 w-full">
        <div class="text-2xl font-semibold text-primary">
          Pendirian dan Fungsi MAI
        </div>
        <p class="mt-5">
          Lembaga Amil Zakat Nasional Mandiri Amal Insani (MAI) didirikan pada
          tanggal 2 Oktober 2014. MAI menjalankan fungsinya sebagai sebuah
          Foundation atau sering disebut dengan yayasan, yaitu menghimpun,
          mengelola, dan mendistribusikan dana Zakat, Infaq, Sedekah, Wakaf, dan
          dana sosial lainnya dari masyarakat umum kepada mereka yang
          membutuhkan sesuai dengan surat keputusan Kementerian Agama Republik
          Indonesia Nomor 1346 Tahun 2021.
        </p>
      </div>

      <div class="w-1/3 hidden md:flex justify-end">
        <img
          src="@/assets/images/program.png"
          class="w-full h-full"
          alt="program"
        />
      </div>
    </section>

    <section>
      <div class="text-2xl text-center mt-20 mb-5 font-semibold text-primary">
        Sertifikasi ISO dan Pajak
      </div>
      <section class="md:px-[69px] px-[40px]">
        Tahun 2020, Alhamdulillah Mandiri Amal Insani telah mendapatkan
        sertifikasi ISO 9001 : 2015 dari Badan Sertifikasi Internasional WQA.
        Mandiri Amal Insani sudah terdaftar di Direktorat Jendral Pajak Republik
        Indonesia sesuai Surat Keputusan Kementerian Keuangan Republik Indonesia
        Nomor Per-4/PJ/2022.
      </section>
    </section>

    <section>
      <div class="text-2xl text-center mt-20 mb-5 font-semibold text-primary">
        Ekspansi Wilayah MAI
      </div>
      <section class="md:px-[69px] px-[40px]">
        Untuk memperluas jangkauan pelayanan dan penghimpunan dana Zakat, Infaq,
        Sedekah, Wakaf, dan lainnya, Mandiri Amal Insani membuka beberapa Kantor
        Perwakilan di berbagai wilayah Indonesia, yaitu di Medan (Sumatera I),
        Palembang (Sumatera II), Bandung (Jawa Barat), Semarang (Jawa Tengah
        DIY), Surabaya (Jawa Timur), Banjarmasin (Kalimantan), Makassar
        (Sulawesi), dan Bali Nusra (Bali Nusa Tenggara).
      </section>
    </section>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/default/index.vue";
</script>

<style lang="scss" scoped></style>
