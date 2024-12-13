import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "../pages/landing/index.vue";
import DashboardPage from "@/pages/dashboard/index.vue";
import UserProfilePage from "@/pages/user/profile/index.vue";

const routes = [
  {
    path: "/",
    name: "landingPage",
    component: LandingPage,
    meta: {
      title: "MAI - Institut",
      requiredAuth: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/user",
    name: "user",
    component: UserProfilePage,
    meta: {
      title: "User Profile",
      requiredAuth: true,
    },
  },
  
  // {
  //   path: "/login",
  //   name: "login",
  //   component: LoginPage,
  //   meta: {
  //     requiredAuth: false,
  //     requiredAdmin: false,
  //     requiredMentor: false,
  //     title: "Login",
  //   },
  // },
  // {
  //   path: "/verify-email",
  //   name: "verify-email",
  //   component: VerifPage,
  //   meta: {
  //     requiredAuth: false,
  //     requiredAdmin: false,
  //     requiredMentor: false,
  //     title: "verif",
  //   },
  // },
  // {
  //   path: "/forgot-password",
  //   name: "forgot password",
  //   component: ForgotPassword,
  //   meta: {
  //     requiredAuth: false,
  //     requiredAdmin: false,
  //     requiredMentor: false,
  //     title: "forgot password",
  //   },
  // },
  // {
  //   path: "/reset-password",
  //   name: "reset password",
  //   component: ResetPassword,
  //   meta: {
  //     requiredAuth: false,
  //     requiredAdmin: false,
  //     requiredMentor: false,
  //     title: "reset password",
  //   },
  // },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: RegisterPage,
  //   meta: {
  //     requiredAuth: false,
  //     requiredAdmin: false,
  //     requiredMentor: false,
  //     title: "Register",
  //   },
  // },
  {
    path: "/admin",
    name: "profile",
    component: UserProfilePage,
    meta: {
      title: "Profile",
      requiredAuth: true,
      requiredAdmin: false,
      requiredMentor: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

// // Middleware untuk pemeriksaan otentikasi dan peran
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();

//   // Cek jika pengguna sudah login
//   if (authStore.isLoggedIn) {
//     const userRole = authStore.user?.role?.position?.toLowerCase();

//     // Jika pengguna sudah login dan mencoba mengakses halaman login, arahkan ke halaman yang sesuai
//     if (to.path === '/login' || to.path === '/register') {
//       // Redirect berdasarkan peran
//       if (userRole === 'admin' || userRole === 'mentor') {
//         return next({ path: '/admin/learning_camp' }); // Redirect ke Learning Camp untuk admin atau mentor
//       } else {
//         return next({ path: '/peserta/profile' }); // Redirect ke profile untuk peserta biasa
//       }
//     }
//   }

//   // Cek jika rute memerlukan autentikasi
//   if (to.meta.requiredAuth) {
//     // Jika pengguna tidak terautentikasi, arahkan ke halaman login
//     if (!authStore.isLoggedIn) {
//       return next({ path: '/login' }); // Ganti dengan rute halaman login Anda
//     }

//     // Cek peran pengguna
//     const userRole = authStore.user?.role?.position ? authStore.user.role.position.toLowerCase() : ''; // Atur ke string kosong jika null
//     console.log(userRole);

//     // Tambahkan logika untuk memeriksa akses untuk admin dan mentor
//     const isAdmin = userRole === 'admin';
//     const isMentor = userRole === 'mentor';

//     // Cek apakah rute memerlukan admin dan mentor
//     if (to.meta.requiredAdmin && to.meta.requiredMentor) {
//       if (!isAdmin && !isMentor) {
//         return next({ path: '/unauthorized' }); // Ganti dengan rute halaman tidak berwenang Anda
//       }
//     } else if (to.meta.requiredAdmin && !isAdmin) {
//       return next({ path: '/unauthorized' }); // Ganti dengan rute halaman tidak berwenang Anda
//     } else if (to.meta.requiredMentor && !isMentor) {
//       return next({ path: '/unauthorized' }); // Ganti dengan rute halaman tidak berwenang Anda
//     }
//   }

//   // Izinkan akses ke rute
//   next();
// });

export default router;
