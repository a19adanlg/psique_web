<template>
    <div class="d-flex flex-column min-vh-100 pt-0">
        <HeaderView />

        <main class="container-fluid p-0">
            <SidebarView />

            <div :style="styleIfSidebar" class="content container-fluid px-0">
                <div id="carouselExampleSlidesOnly" class="carousel slide m-0 mb-5" data-ride="carousel">
                    <div class="carousel-inner">
                        <h1 class="title d-block w-100 py-5">
                            <font-awesome-icon icon="user-nurse" />Equipo
                        </h1>
                    </div>
                </div>
                <div class="container pb-5 px-5 mt-4">
                    <div v-for="doctor in doctores" :key="doctor.nif">
                        <div class="card mb-3 p-4">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img :src="doctor.fotoDoctor" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h2 class="card-title">{{ doctor.nombre }} {{ doctor.apellido1 }} {{ doctor.apellido2 }}</h2>
                                        <h3 class="card-title">{{ doctor.especialidad }}</h3>
                                        <hr>
                                        <p class="card-text">{{ doctor.descripcion }}</p>
                                        <p class="card-text"><small class="text-muted">Télefono: {{ doctor.telefono }}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <FooterView />
    </div>
</template>


<script>
import axios from "axios";

const HeaderView = () => import("@/components/HeaderView.vue");
const SidebarView = () => import("@/components/SidebarView.vue");
const FooterView = () => import("@/components/FooterView.vue");

export default {
    name: 'EquipoView',
    components: {
        HeaderView,
        FooterView,
        SidebarView
    },
    data: function () {
        return {
            doctores: null,
            doctorError: {
                error: false,
                error_msg: "",
            },
            rolUsuario: "",
            styleIfSidebar: {
                marginLeft: '225px',
            }
        }
    },
    mounted: function () {
        if (!localStorage.rolUsuario) {
            this.styleIfSidebar.marginLeft = '0px';
        }
        if (localStorage.rolUsuario) {
            this.rolUsuario = localStorage.rolUsuario;
        }

        const dir = "https://psique-api.up.railway.app/api/doctores";
        axios.get(dir)
            .then(res => {
                this.doctores = res.data;
            }).catch(error => {
                if (error.response) {
                    this.doctorError.error = true;
                    this.doctorError.error_msg = error.response.statusText;
                } else if (error.request) {
                    this.doctorError.error = true;
                    this.doctorError.error_msg = error.request.statusText;
                } else {
                    this.doctorError.error = true;
                    this.doctorError.error_msg = error.message;
                }
            });
    }
}
</script>


<style scoped>
main {
    position: relative;
    overflow: hidden;
}

@media screen and (min-width: 960px) {
    main {
        display: flex;
    }
}

@media screen and (max-width: 959px) {
    div.content {
        margin-left: 0 !important;
    }
}

.slide {
    text-align: center;
    background-color: #1e1e1e;
    color: #ececec;
}

.card {
    background-color: #1e1e1e;
    color: #ececec;
    border-radius: 0;
}

h2.card-title {
    padding-bottom: 20px;
}

small, .text-muted {
    color: #6c757d !important;
}
</style>
