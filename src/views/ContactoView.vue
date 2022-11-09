<template>
    <div class="d-flex flex-column min-vh-100 pt-0">
        <HeaderView />

        <main class="container-fluid p-0">
            <SidebarView />

            <div :style="styleIfSidebar" class="content container-fluid px-0">
                <div id="carouselExampleSlidesOnly" class="carousel slide m-0 mb-5" data-ride="carousel">
                    <div class="carousel-inner">
                        <h1 class="d-block w-100 py-5">
                            <font-awesome-icon icon="map-pin" />Contacto
                        </h1>
                    </div>
                </div>
                <div class="container-fluid px-3 mt-4">
                    <div class="m-0 alert alert-danger" role="alert" v-if="citaError.error">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                        <span>{{ citaError.error_msg }}</span>
                    </div>
                    <div class="container">
                        <div class="row info">
                            <form class="col-lg-8 col-md-12 p-5" @submit.prevent="sendCita" autocomplete="off">
                                <div class="col-12 form-group">
                                    <div class="title">
                                        <h3 class="title d-block w-100">Pide cita</h3>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                            <label class="mr-3">NIF *</label>
                                            <input v-model="cita.nifPaciente" type="text" class="form-control" id="nifPaciente" required>
                                            <small id="nifPaciente" class="form-text text-muted">Formato: 00000000T</small>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                            <label>Nombre</label>
                                            <input v-model="cita.nombreP" type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                            <label>Primer apellido</label>
                                            <input v-model="cita.apellido1P" type="text" class="form-control">
                                        </div>
                                        <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                            <label>Segundo apellido</label>
                                            <input v-model="cita.apellido2P" type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                            <label>Teléfono</label>
                                            <input v-model="cita.telefono" type="text" class="form-control" id="telefono">
                                            <small id="telefono" class="form-text text-muted">Formato: 666777888 / +34666777888</small>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                                <label>Fecha cita *</label>
                                                <input v-model="cita.fecha" type="date" class="form-control" id="fecha" required>
                                                <small id="fecha" class="form-text text-muted">Formato: 31/12/2022</small>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                                <label>Hora cita *</label>
                                                <input v-model="cita.hora" type="time" class="form-control" id="hora" required>
                                                <small id="hora" class="form-text text-muted">Formato: 24:00</small>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                                <label for="especialidad">Especialidad *</label>
                                                <select v-model="cita.especialidad" id="especialidad" class="form-control" required>
                                                    <option selected disabled value="">Selecciona una</option>
                                                    <option>Psicología</option>
                                                    <option>Psiquiatría</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 mb-3">
                                            <label for="mensaje">Mensaje</label>
                                            <textarea v-model="cita.mensaje" class="form-control" id="mensaje" rows="3"></textarea>
                                        </div>
                                    </div>

                                    <p><em><small>*: este campo es obligatorio</small></em></p>

                                    <template>
                                        <button class="pill border-0 btn-activity mt-md-3">Pedir cita</button>
                                    </template>

                                    <hr class="mt-5 d-lg-none d-block">
                                </div>
                            </form>
                            <div class="col-lg-4 col-md-12 mt-lg-5 pt-0 pt-lg-5 p-5">
                                <div class="row">
                                    <div class="col-lg-12 col-6 mb-lg-5">
                                        <h3>Psique</h3>
                                        <h4>Clínica de salud mental</h4>
                                        <p>Rúa de San Clemente, s/n
                                        <br>
                                        15705, Santiago de Compostela
                                        <br>
                                        A Coruña
                                        <br>
                                        Tel: <strong>981 88 88 88</strong> - <strong>666 777 888</strong>
                                        <br>
                                        Email: contacto@psique.es</p>
                                    </div>
                                    <div class="col-lg-12 col-6">
                                        <h3>Horario</h3>
                                        <h5>Lunes a viernes:</h5>
                                        <p>08:30-21:30 h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="p-0 mb-1">
                            <div class="title">
                                <h3 class="title d-block w-100">
                                    <font-awesome-icon icon="map-pin" />Dónde estamos
                                </h3>
                            </div>
                            <l-map :zoom="zoom" :center="center">
                                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                                <l-marker :lat-lng="markerLatLng">
                                    <l-popup>Psique: Clínica de Salud Mental</l-popup>
                                </l-marker>
                            </l-map>
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

import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('../assets/leaflet/marker-icon-2x.png'),
    iconUrl: require('../assets/leaflet/marker-icon.png'),
    shadowUrl: require('../assets/leaflet/marker-shadow.png'),
    iconSize: [40, 40],
    popupAnchor: [8, -40]
});

const HeaderView = () => import("@/components/HeaderView.vue");
const SidebarView = () => import("@/components/SidebarView.vue");
const FooterView = () => import("@/components/FooterView.vue");

export default {
    name: 'ContactoView',
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        HeaderView,
        FooterView,
        SidebarView
    },
    data: function () {
        return {
            cita: {
                nifPaciente: '',
                nombreP: '',
                apellido1P: '',
                apellido2P: '',
                telefono: '',
                fecha: '',
                hora: '',
                especialidad: '',
                mensaje: ''
            },
            alertDelete: false,
            citaError: {
                error: false,
                error_msg: "",
            },
            rolUsuario: "",
            styleIfSidebar: {
                marginLeft: '225px',
            },
            zoom: 16,
            center: [42.87896448133452, -8.547244898153103],
            markerLatLng: [42.87896448133452, -8.547244898153103],
            url: 'https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=JKuWuLG1Z4qGCIkItCXPy4wZG4tXS5nqPdf0HfLeHmXvHk5kPkqy9gW0KkHd6Car',
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
    },
    mounted: function () {
        if (!localStorage.rolUsuario) {
            this.styleIfSidebar.marginLeft = '0px';
        }
        if (localStorage.rolUsuario) {
            this.rolUsuario = localStorage.rolUsuario;
        }

        window.dispatchEvent(new Event('resize'));
    },
    methods: {
        sendCita: function () {
            const dir = "https://psique-api.herokuapp.com/api/citas";

            const json = {
                "nifPaciente": this.cita.nifPaciente,
                "nombreP": this.cita.nombreP,
                "apellido1P": this.cita.apellido1P,
                "apellido2P": this.cita.apellido2P,
                "telefono": this.cita.telefono,
                "fecha": this.cita.fecha,
                "hora": this.cita.hora,
                "especialidad": this.cita.especialidad,
                "mensaje": this.cita.mensaje
            };
            axios.post(dir, json)
                .then(res => {
                    this.clear();

                    this.$swal.fire({
                        title: '¡Cita creada con éxito!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        padding: '1.25em',
                        color: '#ececec',
                        background: '#222222'
                    });

                    return res;
                }).catch(error => {
                    if (error.response) {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.response.statusText;
                    } else if (error.request) {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.request.statusText;
                    } else {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.message;
                    }
                });
        },
        clear() {
            this.citaError.error = false;
            this.cita.nifPaciente = '';
            this.cita.nombreP = '';
            this.cita.apellido1P = '';
            this.cita.apellido2P = '';
            this.cita.telefono = '';
            this.cita.fecha = '';
            this.cita.hora = '';
            this.cita.especialidad = '';
            this.cita.mensaje = '';
        },
        cerrarError() {
            this.citaError.error = false;
        }
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

.title {
    text-align: center;
    color: #ececec;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
}

.alert {
    padding-left: 0;
}

.btn-close {
    padding-right: 20px;
    font-size: 15px;
}

.btn-activity {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    color: #333333;
    letter-spacing: 3px;
    background-color: #eba100;
    padding: 8px 20px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
}

.info {
    margin: 0;
    margin-bottom: 20px;
    color: #ececec;
    background-color: #1e1e1e;
}

label,
option {
    color: #ececec !important;
    font-size: 15px;
}

.form-control,
.form-control:focus,
.form-control:hover {
    background-color: #222222 !important;
    border: 3px solid #222222 !important;
    margin-bottom: 5px;
    box-shadow: 0 0 0 1000px #222222 inset !important;
    -webkit-text-fill-color: #ececec;
    caret-color: #ececec;
}

.leaflet-container {
    height: 400px;
}
</style>
