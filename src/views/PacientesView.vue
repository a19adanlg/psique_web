<template>
    <div class="d-flex flex-column min-vh-100 pt-0">
        <HeaderView />

        <main class="container-fluid p-0">
            <SidebarView />

            <b-modal v-model="modalShow" hide-header hide-footer>
                <h3>Paciente {{ pacienteView.nif }}</h3>
                <hr>
                <div class="d-block p-2">
                    <div><span class="campo">Nombre</span>
                        <p class="d-flex">{{ pacienteView.nombre }} {{ pacienteView.apellido1 }} {{ pacienteView.apellido2 }}</p>
                    </div>
                    <div><span class="campo">Fecha de nacimiento</span>
                        <p class="d-flex">{{ pacienteView.fecNac ? pacienteView.fecNac : '--' }}</p>
                    </div>
                    <div><span class="campo">Teléfono</span>
                        <p class="d-flex">{{ pacienteView.telefono }}</p>
                    </div>
                    <div><span class="campo">Dirección postal</span></div>
                    <div class="px-4"><span class="campo">Dirección</span>
                        <p class="d-flex">{{ pacienteDireccion.direccion }}</p>
                    </div>
                    <div class="px-4"><span class="campo">Código postal</span>
                        <p class="d-flex">{{ pacienteDireccion.cp }}</p>
                    </div>
                    <div class="px-4"><span class="campo">Ciudad</span>
                        <p class="d-flex">{{ pacienteDireccion.ciudad }}</p>
                    </div>
                    <div class="px-4"><span class="campo">Provincia</span>
                        <p class="d-flex">{{ pacienteDireccion.provincia }}</p>
                    </div>
                    <div class="px-4"><span class="campo">País</span>
                        <p class="d-flex">{{ pacienteDireccion.pais }}</p>
                    </div>
                </div>
                <b-button class="mt-3" variant="outline-danger" @click="modalShow = !modalShow">Cerrar</b-button>
            </b-modal>

            <div :style="styleIfSidebar" class="content container-fluid p-0">
                <div id="carouselExampleSlidesOnly" class="carousel slide m-0 mb-5" data-ride="carousel">
                    <div class="carousel-inner">
                        <h1 class="title d-block w-100 py-5">
                            <font-awesome-icon icon="users" />Pacientes
                        </h1>
                    </div>
                </div>
                <div class="container px-3 mt-4">
                    <div v-if="editPaciente || newPaciente">
                        <div class="m-0 alert alert-danger" role="alert" v-if="pacienteError.error">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                            <span>{{ pacienteError.error_msg }}</span>
                        </div>

                        <form class="p-4" @submit.prevent="sendPaciente" autocomplete="off">
                            <div class="col-12 form-group">
                                <div v-if="newPaciente" class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label class="mr-3">NIF paciente *</label>
                                        <input v-model="paciente.nif" type="text" class="form-control" id="nifPaciente" required>
                                        <small id="nifPaciente" class="form-text text-muted">Formato: 00000000T</small>
                                    </div>
                                </div>
                                <div v-else class="row">
                                    <div class="nif col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label class="mr-3">NIF paciente</label>
                                        <input v-model="pacienteEdit.nif" type="text" class="form-control" id="nifPaciente" disabled>
                                    </div>
                                </div>
                                <div class="row">
                                    <div v-if="newPaciente" class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Nombre *</label>
                                        <input v-model="paciente.nombre" type="text" class="form-control" required>
                                    </div>
                                    <div v-else class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Nombre</label>
                                        <input v-model="paciente.nombre" type="text" class="form-control" v-bind:placeholder="pacienteEdit.nombre">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Primer apellido</label>
                                        <input v-if="editPaciente" v-model="paciente.apellido1" type="text" class="form-control" v-bind:placeholder="pacienteEdit.apellido1 ? pacienteEdit.apellido1 : '--'">
                                        <input v-else v-model="paciente.apellido1" type="text" class="form-control">
                                    </div>
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Segundo apellido</label>
                                        <input v-if="editPaciente" v-model="paciente.apellido2" type="text" class="form-control" v-bind:placeholder="pacienteEdit.apellido2 ? pacienteEdit.apellido2 : '--'">
                                        <input v-else v-model="paciente.apellido2" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label>Teléfono</label>
                                        <input v-if="editPaciente" v-model="paciente.telefono" type="text" class="form-control" id="telefono" v-bind:placeholder="pacienteEdit.telefono ? pacienteEdit.telefono : '--'">
                                        <input v-else v-model="paciente.telefono" type="text" class="form-control" id="telefono">
                                        <small id="telefono" class="form-text text-muted">Formato: 666777888 / +34666777888</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label>Fecha de nacimiento</label>
                                        <input v-if="editPaciente" v-model="pacienteEdit.fecNac" type="date" class="select form-control" id="fechaEdit" @change="changeOpacity('fechaEdit')">
                                        <input v-else v-model="paciente.fecNac" type="date" class="form-control" id="fecha">
                                        <small class="form-text text-muted">Formato: 31/12/2022</small>
                                    </div>
                                </div>
                                <div class="row" v-if="!editPaciente">
                                    <div class="col-lg-8 col-md-8 col-sm-12 mb-3">
                                        <label>Dirección</label>
                                        <input v-model="paciente.direccion" type="text" class="form-control" id="direccion">
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
                                        <label>Ciudad</label>
                                        <input v-model="paciente.ciudad" type="text" class="form-control" id="ciudad">
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label>Código postal</label>
                                        <input v-model="paciente.cp" type="number" class="form-control" id="cp">
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
                                        <label>Provincia</label>
                                        <input v-model="paciente.provincia" type="text" class="form-control" id="provincia">
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
                                        <label>País</label>
                                        <input v-model="paciente.pais" type="text" class="form-control" id="pais">
                                    </div>
                                </div>

                                <p><em><small>*: este campo es obligatorio</small></em></p>

                                <template v-if="!editPaciente">
                                    <button class="pill border-0 btn-activity mt-md-3">Crear paciente</button>
                                </template>
                                <template v-else>
                                    <button class="pill border-0 btn-activity mt-md-3">Modificar paciente</button>
                                </template>
                            </div>
                        </form>
                    </div>

                    <div v-else>
                        <div class="m-0 alert alert-danger" role="alert" v-if="pacienteError.error">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                            <span>{{ pacienteError.error_msg }}</span>
                        </div>

                        <div class="px-0 mt-3">
                            <div id="filtersHead" class="px-2">
                                <h5 class="float-start">Filtrar</h5>
                                <button v-if="!showFiltersBool" id="down" type="button" class="btn btn-link btn-sm p-0 float-end" @click="showFilters()"><font-awesome-icon icon="chevron-down" /></button>
                                <button v-else id="down" type="button" class="btn btn-link btn-sm p-0 float-end" @click="showFilters()"><font-awesome-icon icon="chevron-up" /></button>
                            </div>
                            <div v-if="showFiltersBool" id="filters" class="mb-5">
                                <div class="row px-4">
                                    <div class="col-12">
                                        <label for="nifPaciente">NIF Paciente</label>
                                        <input v-on:keyup.enter="filter" v-model="filterPaciente" type="text" class="form-control" id="nifPaciente" autocomplete="off">
                                    </div>
                                </div>
                                <div class="pt-3 px-4">
                                    <button class="btn btn-outline-info btn-sm float-end mx-1" @click="filter()">Filtrar</button>
                                    <button class="btn btn-outline-danger btn-sm float-end mx-1" @click="clearFilters()">Limpiar</button>
                                </div>
                            </div>
                        </div>

                        <table class="table table-responsive pt-2">
                            <thead>
                                <tr>
                                    <th scope="col">NIF</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellidos</th>
                                    <th class="d-none d-md-table-cell" scope="col">Teléfono</th>
                                    <th class="d-none d-md-table-cell" scope="col">Nacimiento</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="paciente in pacientes" :key="paciente.nif">
                                    <th scope="row">{{ paciente.nif }}</th>
                                    <td>{{ paciente.nombre }}</td>
                                    <td>{{ paciente.apellido1 }} {{ paciente.apellido2 }}</td>
                                    <td class="d-none d-md-table-cell">{{ paciente.telefono }}</td>
                                    <td class="d-none d-md-table-cell">{{ paciente.fecNac }}</td>
                                    <td>
                                        <b-link id="ver" href="#">
                                            <font-awesome-icon icon="eye" @click="verPaciente(paciente.nif)" />
                                        </b-link>
                                        <b-link id="editar" href="#">
                                            <font-awesome-icon icon="edit" @click="modPaciente(paciente.nif)" />
                                        </b-link>
                                        <b-link id="eliminar" href="#">
                                            <font-awesome-icon icon="trash" @click="deletePaciente(paciente.nif)" />
                                        </b-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div v-if="!newPaciente && !editPaciente"><button class="btn-flotante pill border-0" @click="btnNewPaciente()">Nuevo paciente</button></div>
                    </div>
                    <div v-if="newPaciente || editPaciente"><button class="btn-atras pill border-0" @click="atras()">Atrás</button></div>
                </div>
            </div>
        </main>
    </div>
</template>


<script>
import axios from "axios";

const HeaderView = () => import("@/components/HeaderView.vue");
const SidebarView = () => import("@/components/SidebarView.vue");

export default {
    name: 'PacientesView',
    components: {
        HeaderView,
        SidebarView
    },
    data: function () {
        return {
            paciente: {
                nif: '',
                nombre: '',
                apellido1: '',
                apellido2: '',
                telefono: '',
                fecNac: '',
                pais: '',
                cp: '',
                provincia: '',
                ciudad: '',
                direccion: ''
            },
            pacienteView: '',
            pacienteEdit: '',
            pacienteDireccion: '',
            pacientesData: '',
            pacientes: null,
            filterPaciente: '',
            editPaciente: false,
            newPaciente: false,
            alertDelete: false,
            modalShow: false,
            pacienteError: {
                error: false,
                error_msg: "",
            },
            showFiltersBool: false,
            rolUsuario: "",
            styleIfSidebar: {
                marginLeft: '225px',
            }
        }
    },
    methods: {
        getPacientes: function () {
            const dir = "https://psique-api.up.railway.app/api/pacientes";
            axios.get(dir)
                .then(res => {
                    this.pacientesData = res.data;
                    this.pacientes = this.pacientesData;
                }).catch(error => {
                    if (error.response) {
                        this.pacienteError.error = true;
                        this.pacienteError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.pacienteError.error = true;
                        this.pacienteError.error_msg = error.request.data.error;
                    } else {
                        this.pacienteError.error = true;
                        this.pacienteError.error_msg = error.message;
                    }
                });
        },
        sendPaciente: function () {
            if (this.editPaciente === false) {
                const dir = "https://psique-api.up.railway.app/api/pacientes";

                const json = {
                    "nif": this.paciente.nif,
                    "nombre": this.paciente.nombre,
                    "apellido1": this.paciente.apellido1,
                    "apellido2": this.paciente.apellido2,
                    "telefono": this.paciente.telefono,
                    "fecNac": this.paciente.fecNac,
                    "direccionPostal": {
                        "pais": this.paciente.pais,
                        "cp": this.paciente.cp,
                        "provincia": this.paciente.provincia,
                        "ciudad": this.paciente.ciudad,
                        "direccion": this.paciente.direccion,
                    }
                };
                axios.post(dir, json)
                    .then(res => {
                        this.editPaciente = false;
                        this.newPaciente = false;
                        this.clear();
                        this.getPacientes();

                        this.$swal.fire({
                            title: '¡Paciente creado con éxito!',
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
                            this.pacienteError.error = true;
                            this.pacienteError.error_msg = error.response.data.error;
                        } else if (error.request) {
                            this.pacienteError.error = true;
                            this.pacienteError.error_msg = error.request.data.error;
                        } else {
                            this.pacienteError.error = true;
                            this.pacienteError.error_msg = error.message;
                        }
                    });
            } else {
                const dir = "https://psique-api.up.railway.app/api/pacientes/" + this.pacienteEdit.nif;

                const json = {
                    "nif": this.paciente.nif,
                    "nombre": this.paciente.nombre,
                    "apellido1": this.paciente.apellido1,
                    "apellido2": this.paciente.apellido2,
                    "telefono": this.paciente.telefono,
                    "fecNac": this.pacienteEdit.fecNac
                };
                axios.put(dir, json)
                    .then(res => {
                        this.editPaciente = false;
                        this.clear();
                        this.getPacientes();

                        this.$swal.fire({
                            title: '¡Paciente modificado con éxito!',
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
                            this.pacienteError.error = true;
                            this.pacienteError.error_msg = error.response.data.error;
                        } else if (error.request) {
                            this.pacienteError.error = true;
                            this.pacienteError.error_msg = error.request.data.error;
                        } else {
                            this.pacienteError.error = true;
                            this.pacienteError.error_msg = error.message;
                        }
                    });
            }
        },
        verPaciente(nif) {
            const dir = "https://psique-api.up.railway.app/api/pacientes/" + nif;
            axios.get(dir)
                .then(res => {
                    this.pacienteView = res.data;
                    this.pacienteDireccion = res.data.direccionPostal;
                }).catch(error => {
                    if (error.response) {
                        this.pacienteError.error = true;
                        this.pacienteError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.pacienteError.error = true;
                        this.pacienteError.error_msg = error.request.data.error;
                    } else {
                        this.pacienteError.error = true;
                        this.pacienteError.error_msg = error.message;
                    }
                });

            this.modalShow = true;
        },
        modPaciente(nif) {
            const dir = "https://psique-api.up.railway.app/api/pacientes/" + nif;
            axios.get(dir)
                .then(res => {
                    this.pacienteEdit = res.data;
                }).catch(error => {
                    if (error.response) {
                        this.pacienteError.error = true;
                        this.pacienteError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.pacienteError.error = true;
                        this.pacienteError.error_msg = error.request.data.error;
                    } else {
                        this.pacienteError.error = true;
                        this.pacienteError.error_msg = error.message;
                    }
                });

            this.editPaciente = true;
        },
        deletePaciente(nif) {
            const dir = "https://psique-api.up.railway.app/api/pacientes/" + nif;

            this.$swal.fire({
                title: `¿Eliminar paciente ${nif}?`,
                icon: 'question',
                iconColor: '#dc3545',
                showDenyButton: true,
                confirmButtonText: 'Eliminar',
                denyButtonText: 'Cancelar',
                confirmButtonColor: '#dc3545',
                denyButtonColor: '#ececec',
                padding: '1.25em',
                color: '#ececec',
                background: '#222222'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(dir)
                        .then(res => {
                            this.getPacientes();

                            this.$swal.fire({
                                title: '¡Paciente eliminado con éxito!',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                                color: '#ececec',
                                background: '#222222'
                            });

                            return res;
                        }).catch(error => {
                            if (error.response) {
                                this.pacienteError.error = true;
                                this.pacienteError.error_msg = error.response.data.error;
                            } else if (error.request) {
                                this.pacienteError.error = true;
                                this.pacienteError.error_msg = error.request.data.error;
                            } else {
                                this.pacienteError.error = true;
                                this.pacienteError.error_msg = error.message;
                            }
                        });
                }
            })
        },
        filter() {
            this.pacientes = this.pacientesData;

            if (this.filterPaciente)
                this.pacientes = this.pacientes.filter(item => { return item.nif.includes(this.filterPaciente) })
        },
        clear() {
            this.pacienteError.error = false;
            this.paciente.nif = '';
            this.paciente.nombre = '';
            this.paciente.apellido1 = '';
            this.paciente.apellido2 = '';
            this.paciente.telefono = '';
            this.paciente.fecNac = '';
            this.paciente.direccion = '';
            this.paciente.cp = '';
            this.paciente.ciudad = '';
            this.paciente.provincia = '';
            this.paciente.pais = '';
        },
        clearFilters() {
            this.filterPaciente = '';
            this.pacientes = this.pacientesData;
        },
        showFilters() {
            if (this.showFiltersBool) {
                this.showFiltersBool = false
            } else {
                this.showFiltersBool = true
            }
        },
        btnNewPaciente() {
            this.newPaciente = true;
        },
        atras() {
            this.editPaciente = false;
            this.newPaciente = false;
            this.pacienteError.error = false;
            this.clear();
        },
        cerrarError() {
            this.pacienteError.error = false;
        },
        changeOpacity(id) {
            let input = document.getElementById(id)
            input.style.opacity = '1'
        }
    },
    mounted: function () {
        if (!localStorage.rolUsuario) {
            this.styleIfSidebar.marginLeft = '0px';
        }
        if (localStorage.rolUsuario) {
            this.rolUsuario = localStorage.rolUsuario;
        }

        if (this.rolUsuario == 'ROLE_ADMIN' || this.rolUsuario == 'ROLE_DOCTOR') {
            this.getPacientes();
        } else {
            this.$router.push('/');
        }
    }
}
</script>


<style scoped>
main {
    position: relative;
    overflow: hidden;
}

svg {
    margin-right: 7px;
}

h1 {
    color: #ececec;
    padding-bottom: 30px;
}

table {
    margin-left: auto;
    margin-right: auto
}

th,
td {
    padding: 13px !important;
}

thead tr th {
    background-color: #1e1e1e;
    color: #ececec;
    font-size: 17px;
}

tbody tr th,
tbody tr td {
    background-color: #222222;
    color: #ececec;
}

form {
    padding: 20px;
    margin: 0;
    margin-bottom: 20px;
    background-color: #1e1e1e;
}

label,
option {
    color: #ececec !important;
    font-size: 15px;
}

small,
.text-muted {
    color: #6c757d !important;
}

.slide {
    text-align: center;
    background-color: #1e1e1e;
    color: #ececec;
}

.alert {
    padding-left: 0;
}

.btn-close {
    padding-right: 20px;
    font-size: 15px;
}

.container {
    min-height: 100vh;
}

.table {
    --bs-table-border-color: transparent;
    --bs-table-accent-bg: transparent;
    --bs-table-active-bg: #eba100;
    --bs-table-active-color: #333333;
    --bs-table-hover-bg: #eba100;
    --bs-table-hover-color: #333333;
}

.btn-atras,
.btn-activity,
.btn-flotante {
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

.btn-atras,
.btn-flotante {
    padding: 18px 30px;
    position: fixed;
    bottom: 50px;
    right: 50px;
}

.btn-outline-danger {
    --bs-btn-color: #dc3545;
    --bs-btn-border-color: #dc3545;
    --bs-btn-hover-color: rgb(61, 61, 61);
    --bs-btn-hover-bg: #dc3545;
    --bs-btn-hover-border-color: #dc3545;
    --bs-btn-focus-shadow-rgb: 220, 53, 69;
    --bs-btn-active-color: rgb(61, 61, 61);
    --bs-btn-active-bg: #dc3545;
    --bs-btn-active-border-color: #dc3545;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #dc3545;
    --bs-btn-disabled-bg: transparent;
    --bs-btn-disabled-border-color: #dc3545;
    --bs-gradient: none;
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

.nif {
    opacity: 0.35 !important;
}

.select {
    opacity: 0.35;
}

#ver,
#editar,
#eliminar,
#down {
    color: #ececec;
}

#ver:hover {
    color: #eba100;
}

#editar:hover {
    color: #753ac4;
}

#eliminar:hover {
    color: #dc3545;
}

#filtersHead {
    height: 45px;
    margin-bottom: 10px;
}

::-webkit-input-placeholder {
    opacity: 0.35 !important;
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

@media (max-width: 768px) {
    th,
    td {
        padding: 10px !important;
    }

    table {
        margin-left: auto;
        margin-right: auto
    }
}
</style>
