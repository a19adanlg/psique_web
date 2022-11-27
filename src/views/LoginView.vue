<template>
    <div v-if="loginView">
        <div class="d-flex flex-column min-vh-100 pt-0">
            <div id="inicio">
                <a href="/">
                    <font-awesome-icon icon="chevron-left" /> Volver al inicio
                </a>
            </div>

            <div class="form-signin text-center shadow-lg">
                <form v-on:submit.prevent="login" id="formLogin" autocomplete="off">
                    <div class="mb-2">
                        <img src="@/assets/logos/Psique_logo1.png" alt="Psique Logo" width="230" height="230">
                    </div>

                    <div v-if="loginError.error" class="m-0 alert alert-danger" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarAlert()"></button>
                        <small>{{ loginError.error_msg }}</small>
                    </div>

                    <div class="form-floating">
                        <input v-model="loginData.nif" type="text" class="form-control" id="nif" name="nif" required>
                        <label for="nif">NIF</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="loginData.password" type="password" class="form-control" id="password" name="password" required autocomplete="off">
                        <label for="password">Password</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-warning" type="submit">Login</button>
                </form>

                <a id="registro" href="#" @click="botonRegistrar()"><small>¿No tienes usuario? <b>Regístrate</b></small></a>
            </div>
        </div>
    </div>

    <div v-else>
        <div class="d-flex flex-column min-vh-100 pt-0">
            <div id="inicio">
                <a href="/">
                    <font-awesome-icon icon="chevron-left" /> Volver al inicio
                </a>
            </div>

            <div class="form-signin text-center shadow-lg">
                <form v-on:submit.prevent="registro" id="formLogin" autocomplete="off">
                    <div class="mb-2">
                        <img src="@/assets/logos/Psique_logo1.png" alt="Psique Logo" width="230" height="230">
                    </div>

                    <div v-if="registroError.error" class="m-0 alert alert-danger" role="alert">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close" @click="cerrarAlert()"></button>
                        <small>{{ registroError.error_msg }}</small>
                    </div>

                    <div class="form-floating">
                        <input v-model="registroData.nif" type="text" class="form-control" id="nif" name="nif" required>
                        <label for="nif">NIF *</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="registroData.nombre" type="text" class="form-control" id="nombre" name="nombre" required>
                        <label for="nombre">Nombre *</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="registroData.apellido1" type="text" class="form-control" id="apellido1" name="apellido1">
                        <label for="apellido1">Apellido (opcional)</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="registroData.password" type="password" class="form-control" id="password" name="password" required autocomplete="off">
                        <label for="password">Password *</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-warning" type="submit">Regístrate</button>
                </form>

                <a id="registro" href="#" @click="botonLogin()"><small>Volver al <b>login</b></small></a>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import setAuthHeader from '@/utils/setAuthHeader';

export default {
    name: 'LoginView',
    data: function () {
        return {
            loginData: {
                nif: "",
                password: "",
            },
            registroData: {
                nif: "",
                nombre: "",
                apellido1: "",
                password: "",
            },
            loginError: {
                error: false,
                error_msg: "",
            },
            registroError: {
                error: false,
                error_msg: "",
            },
            loginView: true,
        }
    },
    methods: {
        login: async function () {
            const json = {
                "nif": this.loginData.nif,
                "password": this.loginData.password
            };
            const url = "https://psique-api.up.railway.app/login";

            await axios.post(url, json).then(res => {
                this.loginError.error = false;
                localStorage.setItem("JWT", res.data.token);
                localStorage.setItem("nifUsuario", res.data.nifUsuario);
                localStorage.setItem("rolUsuario", res.data.rolUsuario);

                setAuthHeader(res.data.token);

                this.$swal.fire({
                    icon: 'success',
                    title: 'Bienvenido a Psique',
                    showConfirmButton: false,
                    timer: 1000,
                    color: '#ececec',
                    background: '#222222'
                });
                if (this.$route.query.redirect) {
                    this.$router.push(this.$route.query.redirect);
                } else {
                    this.$router.push('/');
                }
            }).catch(error => {
                console.clear();
                if (error.response) {
                    this.loginError.error = true;
                    this.loginError.error_msg = error.response.data.error;
                } else if (error.request) {
                    this.loginError.error = true;
                    this.loginError.error_msg = error.request.data.error;
                } else {
                    this.loginError.error = true;
                    this.loginError.error_msg = error.message;
                }
            });
        },
        registro: async function () {
            const json = {
                "nif": this.registroData.nif,
                "nombre": this.registroData.nombre,
                "apellido1": this.registroData.apellido1,
                "password": this.registroData.password
            };
            const url = "https://psique-api.up.railway.app/api/usuarios";

            await axios.post(url, json).then(res => {
                this.limpiarLogin();

                if (res.data.status) {
                    this.limpiarRegistro();

                    this.loginView = true;
                }
            }).catch(error => {
                if (error.response) {
                    this.registroError.error = true;
                    this.registroError.error_msg = error.response.data.error;
                } else if (error.request) {
                    this.registroError.error = true;
                    this.registroError.error_msg = error.request.data.error;
                } else {
                    this.registroError.error = true;
                    this.registroError.error_msg = error.message;
                }
            });
        },
        botonRegistrar: function () {
            this.limpiarRegistro();

            this.loginView = false;
        },
        botonLogin: function () {
            this.limpiarLogin();

            this.loginView = true;
        },
        limpiarLogin: function () {
            this.loginError.error = false;
            this.loginData.nif = "";
            this.loginData.password = "";
        },
        limpiarRegistro: function () {
            this.registroError.error = false;
            this.registroData.nif = "";
            this.registroData.nombre = "";
            this.registroData.apellido1 = "";
            this.registroData.password = "";
        },
        cerrarAlert() {
            this.loginError.error = false;
            this.registroError.error = false;
        }
    }
}
</script>


<style scoped>
.alert {
    padding-left: 0;
}

.btn-close {
    padding-right: 20px;
    font-size: 10px;
}

.btn-warning,
.btn-warning:hover,
.btn-warning:focus,
.btn-warning:active {
    background-color: #eba100;
    margin-bottom: 15px;
}

.form-signin {
    max-width: 330px;
    margin: auto;
    margin-top: 60px;
    padding: 30px;
    border-radius: 7%;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
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

#registro {
    color: #c4c4c4;
    text-decoration: none;
}

#inicio {
    padding: 25px;
}

#inicio a {
    color: #c4c4c4;
    text-decoration: none;
}
</style>
