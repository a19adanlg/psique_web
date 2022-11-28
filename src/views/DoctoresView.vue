<template>
    <div class="d-flex flex-column min-vh-100 pt-0">
        <HeaderView />

        <main class="container-fluid p-0">
            <SidebarView />

            <b-modal v-model="modalShow" hide-header hide-footer>
                <h3>Doctor {{ doctorView.nif }}</h3>
                <hr>
                <div class="container-fluid">
                    <div class="p-2 row">
                        <div class="col-7">
                            <div><span class="campo">Nombre</span>
                                <p class="d-flex">{{ doctorView.nombre }} {{ doctorView.apellido1 }} {{ doctorView.apellido2 }}</p>
                            </div>
                            <div><span class="campo">Fecha de nacimiento</span>
                                <p class="d-flex">{{ doctorView.fecNac ? doctorView.fecNac : '--' }}</p>
                            </div>
                            <div><span class="campo">Télefono</span>
                                <p class="d-flex">{{ doctorView.telefono }}</p>
                            </div>
                            <div><span class="campo">Especialidad</span>
                                <p class="d-flex">{{ doctorView.especialidad }}</p>
                            </div>
                        </div>
                        <div class="col-5"><img :src="doctorView.fotoDoctor" alt="Avatar" /></div>
                        <div><span class="campo">Descripción:</span>
                            <p class="d-flex">"{{ doctorView.descripcion }}"</p>
                        </div>
                    </div>
                </div>
                <b-button class="mt-3" variant="outline-danger" @click="modalShow = !modalShow">Cerrar</b-button>
            </b-modal>

            <div :style="styleIfSidebar" class="content container-fluid p-0">
                <div id="carouselExampleSlidesOnly" class="carousel slide m-0 mb-5" data-ride="carousel">
                    <div class="carousel-inner">
                        <h1 class="title d-block w-100 py-5">
                            <font-awesome-icon icon="stethoscope" />Doctores
                        </h1>
                    </div>
                </div>
                <div class="container px-3 mt-4">
                    <div v-if="editDoctor || newDoctor">
                        <div class="m-0 alert alert-danger" role="alert" v-if="doctorError.error">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                            <span>{{ doctorError.error_msg }}</span>
                        </div>

                        <form class="p-4" @submit.prevent="sendDoctor" autocomplete="off">
                            <div class="col-12 form-group">
                                <div v-if="newDoctor" class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label class="mr-3">NIF doctor *</label>
                                        <input v-model="doctor.nif" type="text" class="form-control" id="nifDoctor" required>
                                        <small id="nifDoctor" class="form-text text-muted">Formato: 00000000T</small>
                                    </div>
                                </div>
                                <div v-else class="row">
                                    <div class="nif col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label class="mr-3">NIF doctor</label>
                                        <input v-model="doctorEdit.nif" type="text" class="form-control" id="nifDoctor" disabled>
                                    </div>
                                </div>
                                <div class="row">
                                    <div v-if="newDoctor" class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Nombre *</label>
                                        <input v-model="doctor.nombre" type="text" class="form-control" required>
                                    </div>
                                    <div v-else class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Nombre</label>
                                        <input v-model="doctor.nombre" type="text" class="form-control" v-bind:placeholder="doctorEdit.nombre">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Primer apellido</label>
                                        <input v-if="editDoctor" v-model="doctor.apellido1" type="text" class="form-control" v-bind:placeholder="doctorEdit.apellido1 ? doctorEdit.apellido1 : '--'">
                                        <input v-else v-model="doctor.apellido1" type="text" class="form-control">
                                    </div>
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Segundo apellido</label>
                                        <input v-if="editDoctor" v-model="doctor.apellido2" type="text" class="form-control" v-bind:placeholder="doctorEdit.apellido2 ? doctorEdit.apellido2 : '--'">
                                        <input v-else v-model="doctor.apellido2" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label>Teléfono</label>
                                        <input v-if="editDoctor" v-model="doctor.telefono" type="text" class="form-control" v-bind:placeholder="doctorEdit.telefono ? doctorEdit.telefono : '--'">
                                        <input v-else v-model="doctor.telefono" type="text" class="form-control" id="telefono">
                                        <small id="telefono" class="form-text text-muted">Formato: 666777888 / +34666777888</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label>Fecha de nacimiento</label>
                                        <input v-if="editDoctor" v-model="doctorEdit.fecNac" type="date" class="select form-control" id="fechaEdit" @change="changeOpacity('fechaEdit')">
                                        <input v-else v-model="doctor.fecNac" type="date" class="form-control" id="fecha">
                                        <small id="fecha" class="form-text text-muted">Formato: 31/12/2022</small>
                                    </div>
                                </div>
                                <div class="row" v-if="newDoctor">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label for="especialidad">Especialidad *</label>
                                        <select v-model="doctor.especialidad" id="especialidad" class="form-control" required>
                                            <option selected disabled value="">--</option>
                                            <option>Psicología</option>
                                            <option>Psiquiatría</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row" v-else>
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label for="especialidad">Especialidad</label>
                                        <select v-model="doctorEdit.especialidad" id="especialidadEdit" class="select form-control" @change="changeOpacity('especialidadEdit')">
                                            <option>Psicología</option>
                                            <option>Psiquiatría</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
                                        <label for="descripcion">Descripción</label>
                                        <textarea v-if="editDoctor" v-model="doctor.descripcion" class="form-control" id="descripcion" rows="4" v-bind:placeholder="doctorEdit.descripcion ? doctorEdit.descripcion : '--'"></textarea>
                                        <textarea v-else v-model="doctor.descripcion" class="form-control" id="descripcion" rows="4"></textarea>
                                    </div>
                                </div>
                                <div v-if="editDoctor" class="row">
                                    <div class="col-12 mb-3">
                                        <img :src="doctorEdit.fotoDoctor" alt="Avatar" style="width: 200px; height: auto;" />
                                        <label id="photoLabel" class="mx-3">Foto del doctor actual</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 mb-3">
                                        <label v-if="editDoctor">URL de la nueva foto</label>
                                        <label v-else>Foto del doctor</label>
                                        <input v-model="doctor.fotoDoctor" type="text" class="form-control" id="fecha">
                                    </div>
                                </div>

                                <p><em><small>*: este campo es obligatorio</small></em></p>

                                <template v-if="!editDoctor">
                                    <button class="pill border-0 btn-activity mt-md-3">Crear doctor</button>
                                </template>
                                <template v-else>
                                    <button class="pill border-0 btn-activity mt-md-3">Modificar doctor</button>
                                </template>
                            </div>
                        </form>
                    </div>

                    <div v-else>
                        <div class="m-0 alert alert-danger" role="alert" v-if="doctorError.error">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                            <span>{{ doctorError.error_msg }}</span>
                        </div>

                        <div class="px-0 mt-3">
                            <div id="filtersHead" class="px-2" @click="showFilters()">
                                <h5 class="float-start">Filtrar</h5>
                                <button v-if="!showFiltersBool" id="chevron" type="button" class="btn btn-link btn-sm p-0 float-end"><font-awesome-icon icon="chevron-down" /></button>
                                <button v-else id="chevron" type="button" class="btn btn-link btn-sm p-0 float-end"><font-awesome-icon icon="chevron-up" /></button>
                            </div>
                            <div v-if="showFiltersBool" id="filters" class="mb-5">
                                <div class="row px-4">
                                    <div class="col-md-6 col-12">
                                        <label for="nifDoctor">NIF Doctor</label>
                                        <input v-on:keyup.enter="filter" v-model="filterDoctor" type="text" class="form-control" id="nifDoctor" autocomplete="off">
                                    </div>
                                    <div class="col-md-6 col-12">
                                        <label for="especialidad">Especialidad</label>
                                        <select v-model="filterEspecialidad" id="especialidad" class="form-control">
                                            <option selected disabled value="">--</option>
                                            <option>Psicología</option>
                                            <option>Psiquiatría</option>
                                        </select>
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
                                    <th class="d-none d-md-table-cell" scope="col">Apellidos</th>
                                    <th class="d-none d-md-table-cell" scope="col">Teléfono</th>
                                    <th scope="col">Especialidad</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="doctor in doctores" :key="doctor.nif">
                                    <th scope="row">{{ doctor.nif }}</th>
                                    <td>{{ doctor.nombre }}</td>
                                    <td class="d-none d-md-table-cell">{{ doctor.apellido1 }} {{ doctor.apellido2 }}</td>
                                    <td class="d-none d-md-table-cell">{{ doctor.telefono }}</td>
                                    <td>{{ doctor.especialidad }}</td>
                                    <td>
                                        <b-link id="ver" href="#">
                                            <font-awesome-icon icon="eye" @click="verDoctor(doctor.nif)" />
                                        </b-link>
                                        <b-link id="editar" href="#">
                                            <font-awesome-icon icon="edit" @click="modDoctor(doctor.nif)" />
                                        </b-link>
                                        <b-link id="eliminar" href="#">
                                            <font-awesome-icon icon="trash" @click="deleteDoctor(doctor.nif)" />
                                        </b-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div v-if="!newDoctor && !editDoctor"><button class="btn-flotante pill border-0" @click="btnNewDoctor()">Nuevo doctor</button></div>
                    </div>
                    <div v-if="newDoctor || editDoctor"><button class="btn-atras pill border-0" @click="atras()">Atrás</button></div>
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
    name: 'DoctoresView',
    components: {
        HeaderView,
        SidebarView
    },
    data: function () {
        return {
            doctor: {
                nif: '',
                nombre: '',
                apellido1: '',
                apellido2: '',
                telefono: '',
                fecNac: '',
                especialidad: '',
                descripcion: '',
                fotoDoctor: ''
            },
            doctorView: '',
            doctorEdit: '',
            doctoresData: null,
            doctores: null,
            filterDoctor: '',
            filterEspecialidad: '',
            editDoctor: false,
            newDoctor: false,
            alertDelete: false,
            modalShow: false,
            doctorError: {
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
        getDoctores: function () {
            const dir = "https://psique-api.up.railway.app/api/doctores";
            axios.get(dir)
                .then(res => {
                    this.doctoresData = res.data;
                    this.doctores = this.doctoresData;
                }).catch(error => {
                    if (error.response) {
                        this.doctorError.error = true;
                        this.doctorError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.doctorError.error = true;
                        this.doctorError.error_msg = error.request.data.error;
                    } else {
                        this.doctorError.error = true;
                        this.doctorError.error_msg = error.message;
                    }
                });
        },
        sendDoctor: function () {
            if (this.editDoctor === false) {
                const dir = "https://psique-api.up.railway.app/api/doctores";

                const json = {
                    "nif": this.doctor.nif,
                    "nombre": this.doctor.nombre,
                    "apellido1": this.doctor.apellido1,
                    "apellido2": this.doctor.apellido2,
                    "telefono": this.doctor.telefono,
                    "fecNac": this.doctor.fecNac,
                    "especialidad": this.doctor.especialidad,
                    "descripcion": this.doctor.descripcion,
                    "fotoDoctor": this.doctor.fotoDoctor
                };
                axios.post(dir, json)
                    .then(res => {
                        this.editDoctor = false;
                        this.newDoctor = false;
                        this.clear();
                        this.getDoctores();

                        this.$swal.fire({
                            title: '¡Doctor creado con éxito!',
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
                            this.doctorError.error = true;
                            this.doctorError.error_msg = error.response.data.error;
                        } else if (error.request) {
                            this.doctorError.error = true;
                            this.doctorError.error_msg = error.request.data.error;
                        } else {
                            this.doctorError.error = true;
                            this.doctorError.error_msg = error.message;
                        }
                    });
            } else {
                const dir = "https://psique-api.up.railway.app/api/doctores/" + this.doctorEdit.nif;

                const json = {
                    "nif": this.doctor.nif,
                    "nombre": this.doctor.nombre,
                    "apellido1": this.doctor.apellido1,
                    "apellido2": this.doctor.apellido2,
                    "telefono": this.doctor.telefono,
                    "fecNac": this.doctorEdit.fecNac,
                    "especialidad": this.doctorEdit.especialidad,
                    "descripcion": this.doctor.descripcion,
                    "fotoDoctor": this.doctor.fotoDoctor
                };
                axios.put(dir, json)
                    .then(res => {
                        this.editDoctor = false;
                        this.clear();
                        this.getDoctores();

                        this.$swal.fire({
                            title: '¡Doctor modificado con éxito!',
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
                            this.doctorError.error = true;
                            this.doctorError.error_msg = error.response.data.error;
                        } else if (error.request) {
                            this.doctorError.error = true;
                            this.doctorError.error_msg = error.request.data.error;
                        } else {
                            this.doctorError.error = true;
                            this.doctorError.error_msg = error.message;
                        }
                    });
            }
        },
        verDoctor(nif) {
            const dir = "https://psique-api.up.railway.app/api/doctores/" + nif;
            axios.get(dir)
                .then(res => {
                    this.doctorView = res.data;
                }).catch(error => {
                    if (error.response) {
                        this.doctorError.error = true;
                        this.doctorError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.doctorError.error = true;
                        this.doctorError.error_msg = error.request.data.error;
                    } else {
                        this.doctorError.error = true;
                        this.doctorError.error_msg = error.message;
                    }
                });
            this.modalShow = true;
        },
        modDoctor(nif) {
            const dir = "https://psique-api.up.railway.app/api/doctores/" + nif;
            axios.get(dir)
                .then(res => {
                    this.doctorEdit = res.data;
                }).catch(error => {
                    if (error.response) {
                        this.doctorError.error = true;
                        this.doctorError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.doctorError.error = true;
                        this.doctorError.error_msg = error.request.data.error;
                    } else {
                        this.doctorError.error = true;
                        this.doctorError.error_msg = error.message;
                    }
                });

            this.editDoctor = true;
        },
        deleteDoctor(nif) {
            const dir = "https://psique-api.up.railway.app/api/doctores/" + nif;

            this.$swal.fire({
                title: `¿Eliminar doctor ${nif}?`,
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
                            this.getDoctores();

                            this.$swal.fire({
                                title: '¡Doctor eliminado con éxito!',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                                color: '#ececec',
                                background: '#222222'
                            });

                            return res;
                        }).catch(error => {
                            if (error.response) {
                                this.doctorError.error = true;
                                this.doctorError.error_msg = error.response.data.error;
                            } else if (error.request) {
                                this.doctorError.error = true;
                                this.doctorError.error_msg = error.request.data.error;
                            } else {
                                this.doctorError.error = true;
                                this.doctorError.error_msg = error.message;
                            }
                        });
                }
            })
        },
        filter() {
            this.doctores = this.doctoresData;

            if (this.filterDoctor)
                this.doctores = this.doctores.filter(item => { return item.nif.includes(this.filterDoctor) })
            if (this.filterEspecialidad)
                this.doctores = this.doctores.filter(item => { return item.especialidad.includes(this.filterEspecialidad) })
        },
        clear() {
            this.doctorError.error = false;
            this.doctor.nif = '';
            this.doctor.nombre = '';
            this.doctor.apellido1 = '';
            this.doctor.apellido2 = '';
            this.doctor.telefono = '';
            this.doctor.fecNac = '';
            this.doctor.especialidad = '';
            this.doctor.descripcion = '';
        },
        clearFilters() {
            this.filterDoctor = '';
            this.filterEspecialidad = '';
            this.doctores = this.doctoresData;
        },
        showFilters() {
            if (this.showFiltersBool) {
                this.showFiltersBool = false
            } else {
                this.showFiltersBool = true
            }
        },
        btnNewDoctor() {
            this.newDoctor = true;
        },
        atras() {
            this.editDoctor = false;
            this.newDoctor = false;
            this.doctorError.error = false;
            this.clear();
        },
        cerrarError() {
            this.doctorError.error = false;
        },
        changeOpacity(id) {
            let input = document.getElementById(id);
            input.classList.remove('select');
        }
    },
    mounted: function () {
        if (!localStorage.rolUsuario) {
            this.styleIfSidebar.marginLeft = '0px';
        }
        if (localStorage.rolUsuario) {
            this.rolUsuario = localStorage.rolUsuario;
        }

        if (this.rolUsuario == 'ROLE_ADMIN') {
            this.getDoctores();
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
    -webkit-text-fill-color: rgba(236, 236, 236, 0.35);
    color: rgba(236, 236, 236, 0.35);
}

#ver,
#editar,
#eliminar,
#chevron {
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
    cursor: pointer;
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

@media (max-width: 462px) {
    #photoLabel {
        display: none;
    }
}
</style>
