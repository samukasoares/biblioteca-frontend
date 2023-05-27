<template>
    <div class="container">
        <div class="heading">
            <img :src="logo">
            <h1>Biblioteca Sapê</h1>
        </div>

        <div class="links">
            <router-link :to="{ name: 'index' }"><button class="menus">Início</button></router-link>
        </div>

        <div class="fim">
            <input type="text" v-model="termoBusca" placeholder="Buscar Livros..." @input="realizarBusca">

            <div class="dropdown">
                <img class="user-pic" :src="user">
                <div class="dropdown-content">
                    <button class="btnSair" @click="logout">Sair</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logo from "../assets/logo.png"
import user from "../assets/user.png"
export default {
    name: 'navbar',
    data: function () {
        return {
            logo: logo,
            user: user,
            termoBusca: ''
        }
    },
    methods: {
        logout() {
            localStorage.setItem('token', null); // Define o token como null
            localStorage.setItem('id', null); // Define o id como null
            localStorage.setItem('ra', null);
            // Redireciona para a página de login ou onde for apropriado
            this.$router.push({ name: 'login' });
        },
        realizarBusca() {
            this.$emit('buscarLivros', this.termoBusca);
        }
    },
}
</script>

<style scoped>
@font-face {
    font-family: 'montserrat';
    src: local("Montserrat"),
        url(../assets/fonts/Montserrat-Regular.ttf)format("truetype");
}

* {
    font-family: montserrat;
}

body {
    font-size: 15px;
}

.heading {
    display: flex;
    align-items: center;
    margin: 10px;
}

.container {
    background-color: rgb(211, 240, 253);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    box-shadow: 2px 2px 2px rgb(158, 158, 158);
}

.links {
    width: 200px;
    display: flex;
    justify-content: space-between;
}

img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
}

.btnSair {
    background-color: transparent;
    border: none;
    font-size: 20px;
    padding: 5px;
    width: 100%;
}

.btnSair:hover {
    cursor: pointer;
}

a {
    text-decoration: none;
    color: black;
    font-weight: 600;
}

input {
    height: 30px;
    border: none;
    border-radius: 5px;
    width: 100%;
    margin-right: 10px;
}

input:focus {
    border: 1px solid rgb(44, 83, 189);
    outline: none;
    border-radius: 5px;
}

.pesquisar {
    height: 30px;
    border: 1px solid rgb(44, 83, 189);
    border-radius: 5px;
    padding: 5px;
    background-color: transparent;
    width: 120px;
}

.pesquisar:hover {
    background-color: rgb(44, 83, 189);
    color: white;
    cursor: pointer;
}

.user-pic {
    width: 40px;
    height: 40px;
}

.fim {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
}

.dropbtn {
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.menus {
    border: none;
    font-weight: 1000;
    background-color: transparent;
}

.menus:hover {
    cursor: pointer;
    color: rgb(44, 83, 189);
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    margin-left: 10px;
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    border-radius: 5px;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    right: 0;
}

.dropdown-content:hover {
    background-color: rgb(194, 194, 194);
    cursor: pointer;
}

/* Links inside the dropdown */
.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}


/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
    display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
    background-color: #3e8e41;
}
</style>