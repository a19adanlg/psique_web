<template>
    <div class="d-flex flex-column min-vh-100 pt-0">
        <HeaderView />

        <main class="container-fluid p-0">
            <SidebarView />

            <div :style="styleIfSidebar" class="content container-fluid">
                <div class="container px-0">
                    <b-carousel controls indicators :interval="4000" class="d-none d-md-flex" id="carousel-no-animation" style="text-shadow: 0px 0px 2px #000" no-animation>
                        <b-carousel-slide caption="Bienvenido a Psique 1"
                            img-src="https://s3-ap-south-1.amazonaws.com/startupuploads/wp-content/uploads/2017/03/07211425/mountains_ridge-1920x540.jpeg" />
                        <b-carousel-slide caption="Bienvenido a Psique 2"
                            img-src="https://wallpaperaccess.com/full/2535103.jpg" />
                        <b-carousel-slide caption="Bienvenido a Psique 3"
                            img-src="https://coolhdwall.com/storage/202101/space-abstract-illustration-background-2k-wallpaper-5120x1440.jpg" />
                    </b-carousel>

                    <br>
                    <div class="px-5 pt-5">
                        <h2>Lorem Ipsum</h2>
                        <hr>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et
                            dolore magna aliqua. Sed arcu non odio euismod lacinia at quis. Purus sit amet luctus
                            venenatis lectus
                            magna fringilla urna porttitor. At elementum eu facilisis sed. Massa ultricies mi quis
                            hendrerit dolor.
                            Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Nec ultrices
                            dui sapien
                            eget mi proin sed libero enim. Nisi porta lorem mollis aliquam ut. Phasellus faucibus
                            scelerisque
                            eleifend donec.
                        </p>
                    </div>

                    <div class="p-5">
                        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
                        <hr>
                        <p>
                            Vel quam elementum pulvinar etiam. Ultrices dui sapien eget mi proin sed. Erat imperdiet sed
                            euismod nisi
                            porta lorem mollis aliquam. Cursus vitae congue mauris rhoncus. Pellentesque nec nam aliquam
                            sem et
                            tortor. Nunc mattis enim ut tellus elementum sagittis. Id faucibus nisl tincidunt eget
                            nullam. Magnis
                            dis parturient montes nascetur ridiculus mus mauris vitae. Odio morbi quis commodo odio
                            aenean sed
                            adipiscing. Diam in arcu cursus euismod quis viverra nibh. Tincidunt nunc pulvinar sapien et
                            ligula
                            ullamcorper malesuada. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum
                            posuere.
                        </p>
                    </div>

                    <hr class="mx-4">
                    <br>
                </div>
            </div>
        </main>

        <FooterView />
    </div>
</template>


<script>
const HeaderView = () => import("@/components/HeaderView.vue");
const SidebarView = () => import("@/components/SidebarView.vue");
const FooterView = () => import("@/components/FooterView.vue");

export default {
    name: 'HomeView',
    components: {
        HeaderView,
        FooterView,
        SidebarView
    },
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

div.content {
    margin-left: 225px;
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
    color: #dddddd;
}

.opcion a:hover,
.opcion a:link {
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

    div.content {
        margin-left: 0 !important;
    }
}

@media screen and (max-width: 570px) {
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
