<template>
    <div id="app">
        <router-view />
    </div>
</template>


<style>
html,
body {
    background-color: #1e1e1e !important;
    color: #ececec !important;
}

main {
    min-height: 100vh;
    background-color: #2e2d2d !important;
}

em {
    margin-right: 10px;
    color: #ececec !important;
}

svg {
    margin-right: 3px;
}

label {
    color: #ececec !important;
    opacity: 0.9 !important;
}

.navbar-nav .dropdown-menu {
    background-color: #2b2b2b !important;
    border-color: #2b2b2b !important;
}

.dropdown-toggle::after {
    margin-right: 15px;
}

.dropdown-item {
    color: #ececec !important;
}

.dropdown-item:hover,
.dropdown-item:active {
    background-color: #272626 !important;
    color: #ececec !important;
}

.modal {
    --bs-modal-width: 700px !important;
    --bs-modal-color: #ececec !important;
    --bs-modal-bg: #222222 !important;
    --bs-modal-padding: 50px !important;
    --bs-modal-border-radius: 0 !important;
    padding-top: 60px;
}

.modal .btn {
    --bs-btn-hover-color: #222222 !important;
    --bs-btn-active-color: #222222 !important;
    --bs-btn-border-radius: 0 !important;
}

.modal .modal-content {
    border-radius: 0;
}

.modal .campo {
    color: #eba100;
    font-size: 18px;
}

.modal img {
    width: 200px;
    height: 200px;
}

.swal2-popup {
    padding: 2em !important;
    border-radius: 0 !important;
    background: #222222 !important;
    color: #ececec !important;
}

.swal2-styled {
    border: 0;
    border-radius: 0 !important;
    color: #222222 !important;
    font-size: 16px !important;
    box-shadow: none !important;
}

::-webkit-calendar-picker-indicator {
    filter: invert(0.8) !important;
}

::-webkit-datetime-edit-day-field:focus,
::-webkit-datetime-edit-month-field:focus,
::-webkit-datetime-edit-year-field:focus,
::-webkit-datetime-edit-hour-field:focus,
::-webkit-datetime-edit-minute-field:focus {
    background-color: #333333;
}

::-webkit-scrollbar {
    width: 7px;
}

::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 14px rgba(82, 82, 82, 0.8);
}

@media screen and (max-width: 592px) {
    .modal img {
        display: none;
    }
}
</style>
