<template>
    <div class="d-flex flex-column min-vh-100 pt-0">
        <HeaderView />

        <main class="container-fluid p-0">
            <SidebarView />

            <b-modal v-model="modalShow" hide-header hide-footer>
                <h3>Usuario {{ usuarioView.nif }}</h3>
                <hr>
                <div class="container-fluid">
                    <div class="p-2 row">
                        <div class="col-7">
                            <div><span class="campo">Nombre</span>
                                <p class="d-flex">{{ usuarioView.nombre }} {{ usuarioView.apellido1 }} {{ usuarioView.apellido2 }}</p>
                            </div>
                            <div><span class="campo">Email</span>
                                <p class="d-flex">{{ usuarioView.email }}</p>
                            </div>
                            <div><span class="campo">Rol</span>
                                <p class="d-flex">{{ usuarioView.rol }}</p>
                            </div>
                        </div>
                        <div class="col-5"><img :src="usuarioView.fotoPerfil" alt="Avatar" class="rounded-circle" />
                        </div>
                    </div>
                </div>
                <b-button class="mt-3" variant="outline-danger" @click="modalShow = !modalShow">Cerrar</b-button>
            </b-modal>

            <div :style="styleIfSidebar" class="content container-fluid p-0">
                <div id="carouselExampleSlidesOnly" class="carousel slide m-0 mb-5" data-ride="carousel">
                    <div class="carousel-inner">
                        <h1 class="title d-block w-100 py-5">
                            <font-awesome-icon icon="user" />Usuarios
                        </h1>
                    </div>
                </div>
                <div class="container px-3 mt-4">
                    <div v-if="editUsuario || newUsuario">
                        <div class="m-0 mb-3 alert alert-danger" role="alert" v-if="usuarioError.error">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                            <span>{{ usuarioError.error_msg }}</span>
                        </div>

                        <form class="p-4" @submit.prevent="sendUsuario" autocomplete="off">
                            <div class="col-12 form-group">
                                <div v-if="newUsuario" class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label class="mr-3">NIF usuario *</label>
                                        <input v-model="usuario.nif" type="text" class="form-control" id="nifUsuario" required>
                                        <small id="nifUsuario" class="form-text text-muted">Formato: 00000000T</small>
                                    </div>
                                </div>
                                <div v-else class="row">
                                    <div class="nif col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label class="mr-3">NIF usuario</label>
                                        <input v-model="usuarioEdit.nif" type="text" class="form-control" id="nifUsuario" disabled>
                                    </div>
                                </div>
                                <div class="row">
                                    <div v-if="newUsuario" class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Nombre *</label>
                                        <input v-model="usuario.nombre" type="text" class="form-control" required>
                                    </div>
                                    <div v-else class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Nombre</label>
                                        <input v-model="usuario.nombre" type="text" class="form-control" v-bind:placeholder="usuarioEdit.nombre">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Primer apellido</label>
                                        <input v-if="editUsuario" v-model="usuario.apellido1" type="text" class="form-control" v-bind:placeholder="usuarioEdit.apellido1 ? usuarioEdit.apellido1 : '--'">
                                        <input v-else v-model="usuario.apellido1" type="text" class="form-control">
                                    </div>
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Segundo apellido</label>
                                        <input v-if="editUsuario" v-model="usuario.apellido2" type="text" class="form-control" v-bind:placeholder="usuarioEdit.apellido2 ? usuarioEdit.apellido2 : '--'">
                                        <input v-else v-model="usuario.apellido2" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-5 col-sm-12 mb-3">
                                        <label>Email</label>
                                        <input v-if="editUsuario" v-model="usuario.email" type="text" class="form-control" v-bind:placeholder="usuarioEdit.email ? usuarioEdit.email : '--'">
                                        <input v-else v-model="usuario.email" type="email" class="form-control" id="email">
                                        <small id="email" class="form-text text-muted">Formato: foo@bar.es</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div v-if="newUsuario" class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label>Password *</label>
                                        <input v-model="usuario.password" type="password" class="form-control" id="password" required autocomplete="off">
                                    </div>
                                    <div v-else class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label>Password</label>
                                        <input v-model="usuario.password" type="password" class="form-control" id="password" autocomplete="off" placeholder="******">
                                    </div>
                                </div>
                                <div v-if="rolUsuario === 'ROLE_ADMIN'" class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                    <label for="rol">Rol</label>
                                    <select v-if="editUsuario" v-model="usuarioEdit.rol" id="rolEdit" class="select form-control" @change="changeOpacity('rolEdit')">
                                        <option value="ROLE_ADMIN">Administrador</option>
                                        <option value="ROLE_DOCTOR">Doctor</option>
                                        <option value="ROLE_PACIENTE">Paciente</option>
                                    </select>
                                    <select v-else v-model="usuario.rol" id="rol" class="form-control">
                                        <option selected disabled value="">--</option>
                                        <option value="ROLE_ADMIN">Administrador</option>
                                        <option value="ROLE_DOCTOR">Doctor</option>
                                        <option value="ROLE_PACIENTE">Paciente</option>
                                    </select>
                                </div>

                                <p><em><small>*: este campo es obligatorio</small></em></p>

                                <template v-if="!editUsuario">
                                    <button class="pill border-0 btn-activity mt-md-3">Crear usuario</button>
                                </template>
                                <template v-else>
                                    <button class="pill border-0 btn-activity mt-md-3">Modificar usuario</button>
                                </template>
                            </div>
                        </form>
                    </div>

                    <div v-else>
                        <div class="m-0 mb-3 alert alert-danger" role="alert" v-if="usuarioError.error">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                            <span>{{ usuarioError.error_msg }}</span>
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
                                        <label for="nifUsuario">NIF Usuario</label>
                                        <input v-on:keyup.enter="filter" v-model="filterUsuario" type="text" class="form-control" id="nifUsuario" autocomplete="off">
                                    </div>
                                    <div class="col-md-6 col-12">
                                        <label for="rol">Rol</label>
                                        <select v-model="filterRol" id="rol" class="form-control">
                                            <option selected disabled value="">--</option>
                                            <option value="ROLE_ADMIN">Administrador</option>
                                            <option value="ROLE_DOCTOR">Doctor</option>
                                            <option value="ROLE_PACIENTE">Paciente</option>
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
                                    <th scope="col">Apellidos</th>
                                    <th class="d-none d-md-table-cell" scope="col">Email</th>
                                    <th class="d-none d-md-table-cell" scope="col">Rol</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="usuario in usuarios" :key="usuario.nif">
                                    <th scope="row">{{ usuario.nif }}</th>
                                    <td>{{ usuario.nombre }}</td>
                                    <td>{{ usuario.apellido1 }} {{ usuario.apellido2 }}</td>
                                    <td class="d-none d-md-table-cell">{{ usuario.email }}</td>
                                    <td class="d-none d-md-table-cell">{{ usuario.rol }}</td>
                                    <td>
                                        <b-link id="ver" href="#">
                                            <font-awesome-icon icon="eye" @click="verUsuario(usuario.nif)" />
                                        </b-link>
                                        <b-link id="editar" href="#">
                                            <font-awesome-icon icon="edit" @click="modUsuario(usuario.nif)" />
                                        </b-link>
                                        <b-link id="eliminar" href="#">
                                            <font-awesome-icon icon="trash" @click="deleteUsuario(usuario.nif)" />
                                        </b-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div v-if="!newUsuario && !editUsuario"><button class="btn-flotante pill border-0" @click="btnNewUsuario()">Nuevo usuario</button></div>
                    </div>
                    <div v-if="newUsuario || editUsuario"><button class="btn-atras pill border-0" @click="atras()">Atrás</button></div>
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
    name: 'UsuariosView',
    components: {
        HeaderView,
        SidebarView
    },
    data: function () {
        return {
            usuario: {
                nif: '',
                nombre: '',
                apellido1: '',
                apellido2: '',
                email: '',
                password: '',
                rol: ''
            },
            usuarioView: '',
            usuarioEdit: '',
            usuariosData: '',
            usuarios: null,
            filterUsuario: '',
            filterRol: '',
            editUsuario: false,
            newUsuario: false,
            alertDelete: false,
            modalShow: false,
            usuarioError: {
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
        getUsuarios: function () {
            const dir = "https://psique-api.up.railway.app/api/usuarios";
            axios.get(dir)
                .then(res => {
                    this.usuariosData = res.data;
                    this.usuarios = this.usuariosData;
                }).catch(error => {
                    if (error.response) {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.request.data.error;
                    } else {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.message;
                    }
                });
        },
        sendUsuario: function () {
            if (this.editUsuario === false) {
                const dir = "https://psique-api.up.railway.app/api/usuarios";

                const json = {
                    "nif": this.usuario.nif,
                    "nombre": this.usuario.nombre,
                    "apellido1": this.usuario.apellido1,
                    "apellido2": this.usuario.apellido2,
                    "email": this.usuario.email,
                    "password": this.usuario.password,
                    "rol": this.usuario.rol
                };
                axios.post(dir, json)
                    .then(res => {
                        this.editUsuario = false;
                        this.newUsuario = false;
                        this.clear();
                        this.getUsuarios();

                        this.$swal.fire({
                            title: '¡Usuario creado con éxito!',
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
                            this.usuarioError.error = true;
                            this.usuarioError.error_msg = error.response.data.error;
                        } else if (error.request) {
                            this.usuarioError.error = true;
                            this.usuarioError.error_msg = error.request.data.error;
                        } else {
                            this.usuarioError.error = true;
                            this.usuarioError.error_msg = error.message;
                        }
                    });
            } else {
                const dir = "https://psique-api.up.railway.app/api/usuarios/" + this.usuarioEdit.nif;

                const json = {
                    "nif": this.usuario.nif,
                    "nombre": this.usuario.nombre,
                    "apellido1": this.usuario.apellido1,
                    "apellido2": this.usuario.apellido2,
                    "email": this.usuario.email,
                    "password": this.usuario.password,
                    "rol": this.usuarioEdit.rol
                };
                axios.put(dir, json)
                    .then(res => {
                        this.editUsuario = false;
                        this.clear();
                        this.getUsuarios();

                        this.$swal.fire({
                            title: '¡Usuario modificado con éxito!',
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
                            this.usuarioError.error = true;
                            this.usuarioError.error_msg = error.response.data.error;
                        } else if (error.request) {
                            this.usuarioError.error = true;
                            this.usuarioError.error_msg = error.request.data.error;
                        } else {
                            this.usuarioError.error = true;
                            this.usuarioError.error_msg = error.message;
                        }
                    });
            }
        },
        verUsuario(nif) {
            const dir = "https://psique-api.up.railway.app/api/usuarios/" + nif;
            axios.get(dir)
                .then(res => {
                    this.usuarioView = res.data;
                }).catch(error => {
                    if (error.response) {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.request.data.error;
                    } else {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.message;
                    }
                });
            this.modalShow = true;
        },
        modUsuario(nif) {
            const dir = "https://psique-api.up.railway.app/api/usuarios/" + nif;
            axios.get(dir)
                .then(res => {
                    this.usuarioEdit = res.data;
                }).catch(error => {
                    if (error.response) {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.response.data.error;
                    } else if (error.request) {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.request.data.error;
                    } else {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.message;
                    }
                });

            this.editUsuario = true;
            this.usuarioError.error = false;
        },
        deleteUsuario(nif) {
            this.usuarioError.error = false;

            const dir = "https://psique-api.up.railway.app/api/usuarios/" + nif;

            this.$swal.fire({
                title: `¿Eliminar usuario ${nif}?`,
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
                            this.getUsuarios();

                            this.$swal.fire({
                                title: '¡Usuario eliminado con éxito!',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                                color: '#ececec',
                                background: '#222222'
                            });

                            return res;
                        }).catch(error => {
                            if (error.response) {
                                this.usuarioError.error = true;
                                this.usuarioError.error_msg = error.response.data.error;
                            } else if (error.request) {
                                this.usuarioError.error = true;
                                this.usuarioError.error_msg = error.request.data.error;
                            } else {
                                this.usuarioError.error = true;
                                this.usuarioError.error_msg = error.message;
                            }
                        });
                }
            })
        },
        filter() {
            this.usuarios = this.usuariosData;

            if (this.filterUsuario)
                this.usuarios = this.usuarios.filter(item => { return item.nif.includes(this.filterUsuario) })
            if (this.filterRol)
                this.usuarios = this.usuarios.filter(item => { return item.rol.includes(this.filterRol) })
        },
        clear() {
            this.usuarioError.error = false;
            this.usuario.nif = '';
            this.usuario.nombre = '';
            this.usuario.apellido1 = '';
            this.usuario.apellido2 = '';
            this.usuario.email = '';
            this.usuario.password = '';
            this.usuario.rol = '';
        },
        clearFilters() {
            this.filterUsuario = '';
            this.filterRol = '';
            this.usuarios = this.usuariosData;
        },
        showFilters() {
            if (this.showFiltersBool) {
                this.showFiltersBool = false
            } else {
                this.showFiltersBool = true
            }
        },
        btnNewUsuario() {
            this.usuarioError.error = false;
            this.newUsuario = true;
        },
        atras() {
            this.editUsuario = false;
            this.newUsuario = false;
            this.usuarioError.error = false;
            this.clear();
        },
        cerrarError() {
            this.usuarioError.error = false;
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
            this.getUsuarios();
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
</style>
