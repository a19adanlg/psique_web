<template>
    <div class="page-wrap">
        <div id="inicio">
            <a href="/">
                <font-awesome-icon icon="chevron-left" /> Volver al inicio
            </a>
        </div>
        <div class="error404 d-flex flex-row align-items-center">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12 text-center">
                        <span class="display-1 d-block">404</span>
                        <div class="mb-4 lead">Recurso no encontrado.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default ({
    name: "PageNotFound"
})
</script>


<style scoped>
.page-wrap {
    background-color: rgb(160, 0, 0) !important;
    color: #ececec;
}

.error404 {
    min-height: 80vh;
}

#inicio {
    padding: 25px;
}

#inicio a {
    color: #ececec;
    text-decoration: none;
}
</style>