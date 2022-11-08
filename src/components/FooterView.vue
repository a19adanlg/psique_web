<template>
    <footer class="mt-auto py-3 mt-4">
        <ul class="nav justify-content-center pb-3 mb-3">
            <li class="nav-item">
                <a href="/" class="nav-link px-2 text-muted">
                    <font-awesome-icon icon="home" />Inicio
                </a>
            </li>
            <li class="nav-item">
                <a href="/equipo" class="nav-link px-2 text-muted">
                    <font-awesome-icon icon="user-nurse" />Equipo
                </a>
            </li>
            <li class="nav-item">
                <a href="/contacto" class="nav-link px-2 text-muted">
                    <font-awesome-icon icon="map-pin" />Contacto
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link px-2 text-muted">|</a>
            </li>

            <li class="nav-item">
                <a href="https://gitlab.iessanclemente.net/dawm/a19adanlg" class="nav-link px-2 text-muted">GitLab</a>
            </li>
        </ul>

        <hr>

        <p class="text-center text-muted">&copy; 2022 Psique</p>
    </footer>
</template>


<style scoped>
footer {
    margin-top: auto !important;
    background-color: #222222;
}

.nav-link:hover,
.nav-link:active {
    color: #6c757d !important;
}

.text-muted {
    --bs-text-opacity: 1;
    color: #ececec !important;
}
</style>
