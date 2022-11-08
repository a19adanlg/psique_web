<template>
    <header class="container-fluid p-0">
        <b-navbar toggleable="md" type="dark" class="mai-top-header">
            <div class="container-fluid mx-3">
                <b-navbar-brand href="/">
                    <img src="@/assets/logos/Psique_logo2.png" alt="" width="190" height="71">
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" class="justify-content-between mt-2" is-nav>
                    <b-navbar-nav class="mai-top-nav">
                        <b-nav-item href="/">
                            <font-awesome-icon icon="home" />Inicio
                        </b-nav-item>
                        <b-nav-item href="/equipo">
                            <font-awesome-icon icon="user-nurse" />Equipo
                        </b-nav-item>
                        <b-nav-item href="/contacto">
                            <font-awesome-icon icon="map-pin" />Contacto
                        </b-nav-item>
                    </b-navbar-nav>

                    <div v-if="rolUsuario">
                        <b-navbar-nav class="float-lg-right mai-user-nav">
                            <b-nav-item-dropdown left>
                                <template #button-content>
                                    <em>{{ nifUsuario }}</em>
                                </template>
                                <b-dropdown-item href="/profile">Perfil</b-dropdown-item>
                                <b-dropdown-item v-on:click="logout" href="">Logout</b-dropdown-item>
                            </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </div>
                    <b-navbar-nav v-else>
                        <b-nav-item href="login">Login</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </header>
</template>


<script>
export default {
    name: 'HeaderView',
    data: function () {
        return {
            rolUsuario: '',
            nifUsuario: '',
        };
    },
    mounted: function () {
        if (localStorage.nifUsuario) {
            this.nifUsuario = localStorage.nifUsuario;
        }
        if (localStorage.rolUsuario) {
            this.rolUsuario = localStorage.rolUsuario;
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('login');
            this.$router.go();
        }
    }
}
</script>


<style scoped>
.navbar {
    background-color: #222222 !important;
}

.nav-item {
    font-size: 17px;
    padding-right: 10px;
    padding-left: 10px;
}

.nav-link:hover,
.nav-link:active {
    color: #6c757d !important;
}

.nav-link {
    --bs-text-opacity: 1;
    color: rgb(236, 236, 236) !important;
}

.navbar-dark {
    --bs-navbar-color: rgba(236, 236, 236, 1);
    --bs-navbar-hover-color: rgba(236, 236, 236, 1);
    --bs-navbar-disabled-color: rgba(236, 236, 236, 0.25);
    --bs-navbar-active-color: rgba(236, 236, 236, 1);
    --bs-navbar-brand-color: rgba(236, 236, 236, 1);
    --bs-navbar-brand-hover-color: rgba(236, 236, 236, 1);
    --bs-navbar-toggler-border-color: rgba(236, 236, 236, 0);
    --bs-navbar-toggler-icon-bg: url(data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%28236, 236, 236, 1%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e);
}
</style>
