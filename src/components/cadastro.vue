<template>
    <div>
        <form v-on:submit.prevent="addUser" autocomplete="off">
            <caption>
                <img :src="logo">
                <h3>Biblioteca Sapê</h3>
            </caption>
            <label>Cadastre-se</label>
            <input type="text" placeholder="Nome completo" v-model="user.name" name="name" id="name">
            <input type="text" placeholder="RA" v-model="user.ra" name="ra" id="ra">
            <input type="email" placeholder="Email" v-model="user.email" name="email" id="email">
            <input type="password" placeholder="Senha" v-model="user.password" name="password" id="password">
            <select name="role" v-model="user.role" id="role">
                <option value="aluno">Aluno</option>
                <option value="bibliotecário">Bibliotecário</option>
            </select>

            <button>Enviar</button>
        </form>
    </div>
</template>

<script>
import logo from "../assets/logo.png"
import { get } from 'http'

export default {
    data() {
        return {
            logo: logo,
            user: {}
        }
    },
    methods: {
        addUser: function () {
            this.$http.post('https://libraryapi-e5on.onrender.com/auth/register', this.user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(
                    (response) => {
                        this.user = {}
                        alert(response.body['msg'])
                        this.$router.push('/')
                    },
                    (response) => {
                        alert(response.body['msg'])
                    }
                )
        },
    }

}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

img{
    width: 40px;
    margin-right: 5px;
}

caption{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
}

label {
    display: flex;
    justify-content: center;
}

form {
    background-color: rgb(211, 240, 253);
    min-width: 20%;
    padding: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 2px 2px 2px #49494988;
}

form label,
input,
button {
    margin: 5px;
    max-width: 100%;
}

input {
    border-radius: 5px;
    width: 100%;
    height: 40px;
    border: none;
    padding: 5px;
}

select {
    width: 100%;
    height: 35px;
    padding: 5px;
    margin: 5px;
    border: none;
    border-radius: 5px;
}

input:focus {
    border: 2px solid #19A7CE;
    outline: 0;
    box-shadow: 0 0 0 0;
}

button {
    padding: 5px;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: #19A7CE;
    color: white;
}

button:hover{
    background-color: #14809e;
}

button:focus{
    cursor: progress;
}

</style>