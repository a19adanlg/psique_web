<template>
    <div class="d-flex flex-column min-vh-100 pt-0">
        <HeaderView />

        <main class="container-fluid p-0">
            <SidebarView />

            <b-modal v-model="modalShow" hide-header hide-footer>
                <h3>Cita Nº{{ citaView.id }}</h3>
                <hr>
                <div class="d-block p-2">
                    <div><span class="campo">NIF paciente</span>
                        <p class="d-flex">{{ citaView.nifPaciente }}</p>
                    </div>
                    <div class="px-4"><span class="campo">Nombre paciente</span>
                        <p class="d-flex">{{ citaView.nombreP }} {{ citaView.apellido1P }} {{ citaView.apellido2P }}</p>
                    </div>
                    <div class="px-4"><span class="campo">Télefono</span>
                        <p class="d-flex">{{ citaView.telefono }}</p>
                    </div>
                    <div v-if="rolUsuario === 'ROLE_DOCTOR'">
                        <div><span class="campo">NIF doctor</span>
                            <p class="d-flex">{{ citaView.nifDoctor }}</p>
                        </div>
                        <div class="px-4"><span class="campo">Nombre doctor</span>
                            <p class="d-flex">{{ citaView.nombreD }} {{ citaView.apellido1D }} {{ citaView.apellido2D }}</p>
                        </div>
                    </div>
                    <div v-else>
                        <div><span class="campo">Nombre doctor</span>
                            <p class="d-flex">{{ citaView.nombreD }} {{ citaView.apellido1D }} {{ citaView.apellido2D }}</p>
                        </div>
                    </div>
                    <div><span class="campo">Fecha y hora</span>
                        <p class="d-flex">{{ citaView.fecha ? citaView.fecha : '--' }} ; {{ citaView.hora ? citaView.hora : '--' }}</p>
                    </div>
                    <div><span class="campo">Especialidad</span>
                        <p class="d-flex">{{ citaView.especialidad }}</p>
                    </div>
                    <div><span class="campo">Mensaje</span>
                        <p class="d-flex">"{{ citaView.mensaje }}"</p>
                    </div>
                </div>
                <b-button class="mt-3" variant="outline-danger" @click="modalShow = !modalShow">Cerrar</b-button>
            </b-modal>

            <div :style="styleIfSidebar" class="content container-fluid p-0">
                <div id="carouselExampleSlidesOnly" class="carousel slide m-0 mb-5" data-ride="carousel">
                    <div class="carousel-inner">
                        <h1 class="title d-block w-100 py-5">
                            <font-awesome-icon icon="calendar" />Citas
                        </h1>
                    </div>
                </div>
                <div class="container px-3 mt-4">
                    <div v-if="editCita || newCita">
                        <div class="m-0 alert alert-danger" role="alert" v-if="citaError.error">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                            <span>{{ citaError.error_msg }}</span>
                        </div>

                        <form class="p-4" @submit.prevent="sendCita" autocomplete="off">
                            <div class="col-12 form-group">
                                <div v-if="rolUsuario === 'ROLE_DOCTOR'">
                                    <div class="row" v-if="editCita">
                                        <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                            <label class="mr-3">NIF doctor</label>
                                            <input v-model="cita.nifDoctor" type="text" class="form-control" id="nifDoctor" v-bind:placeholder="citaEdit.nifDoctor ? citaEdit.nifDoctor : '--'">
                                            <small id="nifDoctor" class="form-text text-muted">Formato: 00000000T</small>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div v-if="newCita" class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                            <label class="mr-3">NIF paciente *</label>
                                            <input v-model="cita.nifPaciente" type="text" class="form-control" id="nifPaciente" required>
                                            <small id="nifPaciente" class="form-text text-muted">Formato: 00000000T</small>
                                        </div>
                                        <div v-else class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                            <label class="mr-3">NIF paciente</label>
                                            <input v-model="cita.nifPaciente" type="text" class="form-control" id="nifPaciente" v-bind:placeholder="citaEdit.nifPaciente ? citaEdit.nifPaciente : '--'">
                                            <small id="nifPaciente" class="form-text text-muted">Formato: 00000000T</small>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                            <label>Nombre paciente</label>
                                            <input v-if="editCita" v-model="cita.nombreP" type="text" class="form-control" v-bind:placeholder="citaEdit.nombreP ? citaEdit.nombreP : '--'">
                                            <input v-else v-model="cita.nombreP" type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                            <label>Primer apellido paciente</label>
                                            <input v-if="editCita" v-model="cita.apellido1P" type="text" class="form-control" v-bind:placeholder="citaEdit.apellido1P ? citaEdit.apellido1P : '--'">
                                            <input v-else v-model="cita.apellido1P" type="text" class="form-control">
                                        </div>
                                        <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                            <label>Segundo apellido paciente</label>
                                            <input v-if="editCita" v-model="cita.apellido2P" type="text" class="form-control" v-bind:placeholder="citaEdit.apellido2P ? citaEdit.apellido2P : '--'">
                                            <input v-else v-model="cita.apellido2P" type="text" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label>Teléfono</label>
                                        <input v-if="editCita" v-model="cita.telefono" type="text" class="form-control" id="telefono" v-bind:placeholder="citaEdit.telefono ? citaEdit.telefono : '--'">
                                        <input v-else v-model="cita.telefono" type="text" class="form-control" id="telefono">
                                        <small id="telefono" class="form-text text-muted">Formato: 666777888 / +34666777888</small>
                                    </div>
                                </div>
                                <div>
                                    <div v-if="newCita" class="row">
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
                                    </div>
                                    <div v-else class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                            <label>Fecha cita</label>
                                            <input v-model="citaEdit.fecha" type="date" class="select form-control" id="fechaEdit" @change="changeOpacity('fechaEdit')">
                                            <small class="form-text text-muted">Formato: 31/12/2022</small>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                            <label>Hora cita</label>
                                            <input v-model="citaEdit.hora" type="time" class="select form-control" id="horaEdit" @change="changeOpacity('horaEdit')">
                                            <small class="form-text text-muted">Formato: 24:00</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-if="newCita && rolUsuario === 'ROLE_PACIENTE'">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label for="especialidad">Especialidad *</label>
                                        <select v-model="cita.especialidad" id="especialidad" class="form-control" required>
                                            <option selected disabled value="">--</option>
                                            <option>Psicología</option>
                                            <option>Psiquiatría</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
                                        <label for="mensaje">Mensaje</label>
                                        <textarea v-if="editCita" v-model="cita.mensaje" class="form-control" id="mensaje" rows="3" v-bind:placeholder="citaEdit.mensaje"></textarea>
                                        <textarea v-else v-model="cita.mensaje" class="form-control" id="mensaje" rows="3"></textarea>
                                    </div>
                                </div>

                                <p><em><small>*: este campo es obligatorio</small></em></p>

                                <template v-if="!editCita">
                                    <button class="pill border-0 btn-activity mt-md-3">Crear cita</button>
                                </template>
                                <template v-else>
                                    <button class="pill border-0 btn-activity mt-md-3">Modificar cita</button>
                                </template>
                            </div>
                        </form>
                    </div>

                    <div v-else>
                        <div class="m-0 alert alert-danger" role="alert" v-if="citaError.error">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                            <span>{{ citaError.error_msg }}</span>
                        </div>

                        <div class="px-0 mt-3">
                            <div id="filtersHead" class="px-2">
                                <h5 class="float-start">Filtrar</h5>
                                <button v-if="!showFiltersBool" id="down" type="button" class="btn btn-link btn-sm p-0 float-end" @click="showFilters()"><font-awesome-icon icon="chevron-down" /></button>
                                <button v-else id="down" type="button" class="btn btn-link btn-sm p-0 float-end" @click="showFilters()"><font-awesome-icon icon="chevron-up" /></button>
                            </div>
                            <div v-if="showFiltersBool" id="filters" class="mb-5">
                                <div class="row px-4">
                                    <div v-if="rolUsuario === 'ROLE_DOCTOR'" class="col-md-6 col-12">
                                        <label>NIF Paciente</label>
                                        <input v-on:keyup.enter="filter" v-model="filterPaciente" type="text" class="form-control" id="nifPaciente" autocomplete="off">
                                    </div>
                                    <div v-if="rolUsuario === 'ROLE_PACIENTE'" class="col-md-6 col-12">
                                        <label>NIF Doctor</label>
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
                                    <th scope="col">ID</th>
                                    <th v-if="rolUsuario === 'ROLE_DOCTOR'" scope="col">NIF Paciente</th>
                                    <th v-else-if="rolUsuario === 'ROLE_PACIENTE'" scope="col">NIF Doctor</th>
                                    <th class="d-none d-md-table-cell" scope="col">Nombre</th>
                                    <th class="d-none d-md-table-cell" scope="col">Apellidos</th>
                                    <th scope="col">Fecha y hora</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="cita in citas" :key="cita.id">
                                    <th scope="row">{{ cita.id }}</th>
                                    <td v-if="rolUsuario === 'ROLE_DOCTOR'">{{ cita.nifPaciente }}</td>
                                    <td v-else-if="rolUsuario === 'ROLE_PACIENTE'">{{ cita.nifDoctor }}</td>
                                    <td v-if="rolUsuario === 'ROLE_DOCTOR'" class="d-none d-md-table-cell"> {{ cita.nombreP }}</td>
                                    <td v-else-if="rolUsuario === 'ROLE_PACIENTE'" class="d-none d-md-table-cell"> {{ cita.nombreD }}</td>
                                    <td v-if="rolUsuario === 'ROLE_DOCTOR'" class="d-none d-md-table-cell"> {{ cita.apellido1P }} {{ cita.apellido2P }}</td>
                                    <td v-else-if="rolUsuario === 'ROLE_PACIENTE'" class="d-none d-md-table-cell"> {{ cita.apellido1D }} {{ cita.apellido2D }}</td>
                                    <td>{{ cita.fecha }}; {{ cita.hora }}</td>
                                    <td>
                                        <b-link id="ver" href="#">
                                            <font-awesome-icon icon="eye" @click="verCita(cita.id)" />
                                        </b-link>
                                        <b-link id="editar" href="#">
                                            <font-awesome-icon icon="edit" @click="modCita(cita.id)" />
                                        </b-link>
                                        <b-link id="eliminar" href="#">
                                            <font-awesome-icon icon="trash" @click="deleteCita(cita.id)" />
                                        </b-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div v-if="!newCita && !editCita"><button class="btn-flotante pill border-0" @click="btnNewCita()">Nueva cita</button></div>
                    </div>
                    <div v-if="newCita || editCita"><button class="btn-atras pill border-0" @click="atras()">Atrás</button></div>
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
    name: 'CitasView',
    components: {
        HeaderView,
        SidebarView
    },
    data: function () {
        return {
            cita: {
                nifDoctor: '',
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
            citaView: '',
            citaEdit: '',
            citasData: null,
            citas: null,
            filterDoctor: '',
            filterEspecialidad: '',
            filterPaciente: '',
            editCita: false,
            newCita: false,
            alertDelete: false,
            modalShow: false,
            citaError: {
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
        getCitas: function () {
            const dir = "https://psique-api.up.railway.app/api/citas";
            axios.get(dir)
                .then(res => {
                    this.citasData = res.data;
                    this.citas = this.citasData;
                }).catch(error => {
                    if (error.response) {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.request.data.error;
                    } else {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.message;
                    }
                });
        },
        sendCita: function () {
            if (this.editCita === false) {
                const dir = "https://psique-api.up.railway.app/api/citas";

                const json = {
                    "nifDoctor": this.cita.nifDoctor,
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
                        this.editCita = false;
                        this.newCita = false;
                        this.clear();
                        this.getCitas();

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
                            this.citaError.error_msg = error.response.data.error;
                        } else if (error.request) {
                            this.citaError.error = true;
                            this.citaError.error_msg = error.request.data.error;
                        } else {
                            this.citaError.error = true;
                            this.citaError.error_msg = error.message;
                        }
                    });
            } else {
                const dir = "https://psique-api.up.railway.app/api/citas/" + this.citaEdit.id;

                const json = {
                    "nifDoctor": this.cita.nifDoctor,
                    "nifPaciente": this.cita.nifPaciente,
                    "nombreP": this.cita.nombreP,
                    "apellido1P": this.cita.apellido1P,
                    "apellido2P": this.cita.apellido2P,
                    "telefono": this.cita.telefono,
                    "fecha": this.citaEdit.fecha,
                    "hora": this.citaEdit.hora,
                    "especialidad": this.cita.especialidad,
                    "mensaje": this.cita.mensaje
                };
                axios.put(dir, json)
                    .then(res => {
                        this.editCita = false;
                        this.clear();
                        this.getCitas();

                        this.$swal.fire({
                            title: '¡Cita modificada con éxito!',
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
                            this.citaError.error_msg = error.response.data.error;
                        } else if (error.request) {
                            this.citaError.error = true;
                            this.citaError.error_msg = error.request.data.error;
                        } else {
                            this.citaError.error = true;
                            this.citaError.error_msg = error.message;
                        }
                    });
            }
        },
        verCita(id) {
            const dir = "https://psique-api.up.railway.app/api/citas/" + id;
            axios.get(dir)
                .then(res => {
                    this.citaView = res.data;
                }).catch(error => {
                    if (error.response) {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.request.data.error;
                    } else {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.message;
                    }
                });

            this.modalShow = true;
        },
        modCita(id) {
            const dir = "https://psique-api.up.railway.app/api/citas/" + id;
            axios.get(dir)
                .then(res => {
                    this.citaEdit = res.data;
                }).catch(error => {
                    if (error.response) {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.request.data.error;
                    } else {
                        this.citaError.error = true;
                        this.citaError.error_msg = error.message;
                    }
                });

            this.editCita = true;
        },
        deleteCita(id) {
            const dir = "https://psique-api.up.railway.app/api/citas/" + id;

            this.$swal.fire({
                title: `¿Eliminar cita ${id}?`,
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
                            this.getCitas();

                            this.$swal.fire({
                                title: '¡Cita eliminada con éxito!',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                                color: '#ececec',
                                background: '#222222'
                            });

                            return res;
                        }).catch(error => {
                            if (error.response) {
                                this.citaError.error = true;
                                this.citaError.error_msg = error.response.data.error;
                            } else if (error.request) {
                                this.citaError.error = true;
                                this.citaError.error_msg = error.request.data.error;
                            } else {
                                this.citaError.error = true;
                                this.citaError.error_msg = error.message;
                            }
                        });
                }
            })
        },
        filter() {
            this.citas = this.citasData;

            if (this.filterDoctor)
                this.citas = this.citas.filter(item => { return item.nifDoctor.includes(this.filterDoctor) })
            if (this.filterEspecialidad)
                this.citas = this.citas.filter(item => { return item.especialidad.includes(this.filterEspecialidad) })
            if (this.filterPaciente)
                this.citas = this.citas.filter(item => { return item.nifPaciente.includes(this.filterPaciente) })
        },
        clear() {
            this.citaError.error = false;
            this.cita.nifDoctor = '';
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
        clearFilters() {
            this.filterDoctor = '';
            this.filterEspecialidad = '';
            this.filterPaciente = '';
            this.citas = this.citasData;
        },
        showFilters() {
            if (this.showFiltersBool) {
                this.showFiltersBool = false
            } else {
                this.showFiltersBool = true
            }
        },
        btnNewCita() {
            this.newCita = true;
        },
        atras() {
            this.editCita = false;
            this.newCita = false;
            this.citaError.error = false;
            this.clear();
        },
        cerrarError() {
            this.citaError.error = false;
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

        if (this.rolUsuario == 'ROLE_PACIENTE' || this.rolUsuario == 'ROLE_DOCTOR') {
            this.getCitas();
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
