<template>
    <div class="d-flex flex-column min-vh-100 pt-0">
        <HeaderView />

        <main>
            <div class="container-fluid p-0 h-100">
                <div id="carouselExampleSlidesOnly" class="carousel slide m-0 mb-5" data-ride="carousel">
                    <div class="carousel-inner">
                        <h1 class="title d-block w-100 py-5">
                            <font-awesome-icon icon="user" />Perfil
                        </h1>
                    </div>
                </div>
                <div class="container">
                    <div v-if="editUsuario">
                        <div class="m-0 mb-3 alert alert-danger" role="alert" v-if="usuarioError.error">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarError()"></button>
                            <span>{{ usuarioError.error_msg }}</span>
                        </div>
                        <form class="p-4" @submit.prevent="sendUsuario" autocomplete="off">
                            <div class="col-12 form-group">
                                <div class="row">
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label class="nif">NIF</label>
                                        <input type="text" class="nif form-control" disabled :placeholder="usuario.nif">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Nombre</label>
                                        <input v-model="usuarioEdit.nombre" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Primer apellido</label>
                                        <input v-model="usuarioEdit.apellido1" type="text" class="form-control">
                                    </div>
                                    <div class="col-lg-5 col-md-5 col-sm-12 mb-3">
                                        <label>Segundo apellido</label>
                                        <input v-model="usuarioEdit.apellido2" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-5 col-sm-12 mb-3">
                                        <label>Email</label>
                                        <input v-model="usuarioEdit.email" type="email" class="form-control" id="email">
                                        <small id="email" class="form-text text-muted">Formato: foo@bar.es</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                                        <label>Password</label>
                                        <input v-model="usuarioEdit.password" type="password" class="form-control" id="password" autocomplete="off">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <label>Foto de perfil</label>
                                        <input v-model="usuarioEdit.fotoPerfil" type="text" class="form-control">
                                    </div>
                                </div>

                                <p><em><small>*: este campo es obligatorio</small></em></p>

                                <template>
                                    <button class="pill border-0 btn-activity mt-md-3">Modificar usuario</button>
                                </template>
                            </div>
                        </form>
                    </div>

                    <div v-else>
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="card col-lg-9 mb-0 pb-5">
                                <div class="row ">
                                    <div class="card-side col-md-4 text-center">
                                        <img :src="usuario.fotoPerfil" alt="Avatar" class="rounded-circle img-fluid mt-5" />
                                        <h5>{{ usuario.nombre }} {{ usuario.apellido1 }} {{ usuario.apellido2 }}</h5>
                                        <p>{{ usuario.nif }}</p>
                                        <div v-if="rolUsuario === 'ROLE_DOCTOR'">
                                            <p class="h4 py-4">DOCTOR</p>
                                        </div>
                                        <div v-else-if="rolUsuario === 'ROLE_PACIENTE'">
                                            <p class="h4 py-4">PACIENTE</p>
                                        </div>
                                        <div v-else-if="rolUsuario === 'ROLE_ADMIN'">
                                            <p class="h4 py-4">ADMINISTRADOR</p>
                                        </div>
                                        <i class="far fa-edit mb-5"></i>
                                    </div>
                                    <div class="col-md-8 card-body">
                                        <div>
                                            <h6>Información del usuario</h6>
                                            <hr class="mt-0 mb-4">
                                            <div class="row pt-1">
                                                <div class="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <div v-if="usuario.email">
                                                        <p>{{ usuario.email }}</p>
                                                    </div>
                                                    <div v-else>
                                                        <p class="text-muted">VACÍO</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6>
                                                <div v-if="rolUsuario === 'ROLE_DOCTOR'">
                                                    <p>Otros datos del doctor</p>
                                                </div>
                                                <div v-else-if="rolUsuario === 'ROLE_PACIENTE'">
                                                    <span>Otros datos del paciente</span>
                                                </div>
                                                <div v-else-if="rolUsuario === 'ROLE_ADMIN'">
                                                    <p>Otros datos del administrador</p>
                                                </div>
                                            </h6>
                                            <hr class="mt-0 mb-4">
                                            <div class="row pt-1">
                                                <div v-if="usuario.fecNac" class="col-6 mb-3">
                                                    <div class="col-6 mb-3">
                                                        <h6>Fecha de nacimiento</h6>
                                                        <p>{{ usuario.fecNac }}</p>
                                                    </div>
                                                </div>
                                                <div v-if="usuario.telefono" class="col-6 mb-3">
                                                    <h6>Teléfono</h6>
                                                    <div>
                                                        <p>{{ usuario.telefono }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row pt-1">
                                                <div class="col-6 mb-3" v-if="usuario.especialidad">
                                                    <div class="col-6 mb-3">
                                                        <h6>Especialidad</h6>
                                                        <p>{{ usuario.especialidad }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row pt-1">
                                                <div class="col-12 mb-3" v-if="usuario.direccionPostal">
                                                    <div class="col-12 mb-3">
                                                        <h6>Dirección postal</h6>
                                                        <p>
                                                            <span v-if="usuario.direccionPostal.direccion">
                                                                {{ usuario.direccionPostal.direccion }},
                                                            </span>
                                                            <span v-if="usuario.direccionPostal.ciudad">
                                                                {{ usuario.direccionPostal.ciudad }},
                                                            </span>
                                                            <span v-if="usuario.direccionPostal.cp">
                                                                {{ usuario.direccionPostal.cp }},
                                                            </span><br>
                                                            <span v-if="usuario.direccionPostal.provincia">
                                                                {{ usuario.direccionPostal.provincia }},
                                                            </span>
                                                            <span v-if="usuario.direccionPostal.pais">
                                                                {{ usuario.direccionPostal.pais }}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <div v-if="!editUsuario"><button class="btn-flotante pill border-0" @click="modUsuario(usuario.nif)">Editar
                usuario</button></div>
        <div v-else><button class="btn-atras pill border-0" @click="atras()">Atrás</button></div>
    </div>
</template>


<script>
import axios from 'axios';

const HeaderView = () => import("@/components/HeaderView.vue");

export default {
    name: 'ProfileView',
    components: {
        HeaderView,
    },
    data: function () {
        return {
            usuario: '',
            usuarioEdit: {
                nombre: '',
                apellido1: '',
                apellido2: '',
                email: '',
                password: '',
                rol: '',
                fotoPerfil: ''
            },
            rolUsuario: '',
            editUsuario: false,
            nifEditUsuario: '',
            usuarioError: {
                error: false,
                error_msg: "",
            }
        }
    },
    methods: {
        getUsuario: function () {
            const dir = 'https://psique-api.up.railway.app/api/usuarios/me';
            axios.get(dir)
                .then(res => {
                    this.usuario = res.data;
                }).catch(error => {
                    if (error.response) {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.response.statusText;
                    } else if (error.request) {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.request.statusText;
                    } else {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.message;
                    }
                });
        },
        sendUsuario: function () {
            const dir = "https://psique-api.up.railway.app/api/usuarios/" + this.nifEditUsuario;

            const json = {
                "nombre": this.usuarioEdit.nombre,
                "apellido1": this.usuarioEdit.apellido1,
                "apellido2": this.usuarioEdit.apellido2,
                "email": this.usuarioEdit.email,
                "password": this.usuarioEdit.password,
                "rol": this.usuarioEdit.rol,
                "fotoPerfil": this.usuarioEdit.fotoPerfil,
            };
            axios.put(dir, json)
                .then(res => {
                    this.editUsuario = false;
                    this.clear();
                    this.getUsuario();

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
                        this.usuarioError.error_msg = error.response.statusText;
                    } else if (error.request) {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.request.statusText;
                    } else {
                        this.usuarioError.error = true;
                        this.usuarioError.error_msg = error.message;
                    }
                });
        },
        modUsuario(nif) {
            this.nifEditUsuario = nif;
            this.editUsuario = true;
            this.usuarioError.error = false;
        },
        clear() {
            this.usuarioError.error = false;
            this.usuarioEdit.nombre = '';
            this.usuarioEdit.apellido1 = '';
            this.usuarioEdit.apellido2 = '';
            this.usuarioEdit.email = '';
            this.usuarioEdit.password = '';
            this.usuarioEdit.rol = '';
            this.usuarioEdit.fotoPerfil = '';
        },
        atras() {
            this.editUsuario = false;
            this.usuarioError.error = false;
            this.clear();
        },
        cerrarError() {
            this.usuarioError.error = false;
        }
    },
    mounted: function () {
        if (localStorage.rolUsuario) {
            this.rolUsuario = localStorage.rolUsuario;
        }

        this.getUsuario();
    }
}
</script>


<style scoped>
.rounded-circle {
    width: 150px;
    height: 150px;
    margin-bottom: 40px;
}

.slide {
    text-align: center;
    background-color: #1e1e1e;
    color: #ececec;
}

.card {
    background-color: transparent;
    border-color: transparent;
}

.card-side {
    color: #eba100;
    background-color: #222222;
    height: inherit;
}

.card-body {
    background-color: #eba100;
    color: #222222;
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

.nif {
    opacity: .25 !important;
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

small, .text-muted {
    color: #6c757d !important;
}
</style>
