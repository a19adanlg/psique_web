import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: 'Home - Psique' }
    },
    {
        path: '/equipo',
        name: 'equipo',
        component: () => import('@/views/EquipoView.vue'),
        meta: { title: 'Equipo - Psique' }
    },
    {
        path: '/contacto',
        name: 'contacto',
        component: () => import('@/views/ContactoView.vue'),
        meta: { title: 'Contacto - Psique' }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        meta: { title: 'Login - Psique' }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/ProfileView.vue'),
        meta: { title: 'Profile - Psique' }
    },
    {
        path: '/citas',
        name: 'citas',
        component: () => import('@/views/CitasView.vue'),
        meta: { title: 'Citas - Psique' }
    },
    {
        path: '/pacientes',
        name: 'pacientes',
        component: () => import('@/views/PacientesView.vue'),
        meta: { title: 'Pacientes - Psique' }
    },
    {
        path: '/doctores',
        name: 'doctores',
        component: () => import('@/views/DoctoresView.vue'),
        meta: { title: 'Doctores - Psique' }
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import('@/views/UsuariosView.vue'),
        meta: { title: 'Usuarios - Psique' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: () => import('@/components/PageNotFound.vue'),
        meta: { title: '404 - Page not Found' }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const isLoggedIn = () => {
    return localStorage.getItem('JWT')
}

const protectedRoutes = [
    "profile",
    "citas",
    "pacientes",
    "doctores",
    "usuarios"
]

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);

    const isProtected = protectedRoutes.includes(to.name);
    if (isProtected && !isLoggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    } else next();

    if (to.name == 'login' && isLoggedIn()) {
        next({
            path: '/'
        });
    }
})

const DEFAULT_TITLE = 'Psique';
router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});


export default router
