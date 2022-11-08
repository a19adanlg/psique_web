<template>
    <div v-if="rolUsuario">
        <ul class="sidebar justify-content-center">
            <div v-if="rolUsuario == 'ROLE_DOCTOR' || rolUsuario == 'ROLE_PACIENTE'">
                <b-nav-item class="opcion" href="/citas">
                    <font-awesome-icon icon="calendar" />Citas
                </b-nav-item>
            </div>
            <div v-if="rolUsuario == 'ROLE_DOCTOR' || rolUsuario == 'ROLE_ADMIN'">
                <b-nav-item class="opcion" href="/pacientes">
                    <font-awesome-icon icon="users" />Pacientes
                </b-nav-item>
            </div>
            <div v-if="rolUsuario == 'ROLE_ADMIN'">
                <b-nav-item class="opcion" href="/doctores">
                    <font-awesome-icon icon="stethoscope" />Doctores
                </b-nav-item>
            </div>
            <div v-if="rolUsuario == 'ROLE_ADMIN'">
                <b-nav-item class="opcion" href="/usuarios">
                    <font-awesome-icon icon="user" />Usuarios
                </b-nav-item>
            </div>
            <hr class="mx-3">
        </ul>
    </div>
</template>


<script>
export default {
    name: 'SidebarView',
    data: function () {
        return {
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
    }
}
</script>


<style scoped>
main {
    position: relative;
    overflow: hidden;
}

.sidebar {
    list-style: none;
    position: absolute;
    bottom: 0;
    margin: 0;
    padding: 0;
    padding-top: 15px;
    width: 225px;
    background-color: #1e1e1e;
    height: 100%;
    overflow: auto;
}

.opcion {
    padding-left: 25px;
    padding-right: 25px;
}

.opcion a {
    display: block;
    padding: 16px;
    text-decoration: none;
}

.opcion a,
.opcion a:visited {
    font-size: 20px;
    color: #ececec;
}

.opcion a:hover {
    font-size: 20px;
    color: #eba100;
}

@media screen and (min-width: 960px) {
    main {
        display: flex;
    }
}

@media screen and (max-width: 959px) {
    .sidebar {
        padding-top: 0;
        list-style: none;
        display: flex;
        width: 100%;
        height: auto;
        position: relative;
    }

    .sidebar a {
        float: left;
    }
}

@media screen and (max-width: 597px) {
    .sidebar {
        padding-top: 0;
        display: block;
        width: 100%;
        height: auto;
        position: relative;
    }

    .sidebar a {
        text-align: center;
        float: none;
    }
}
</style>
