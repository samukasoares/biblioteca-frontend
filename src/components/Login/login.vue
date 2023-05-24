<template>
    <form v-on:submit.prevent="loginUser">
        <label>Entrar na Biblioteca</label>
        <input type="text" v-model="user.email" placeholder="Email" name="email" id="email">
        <input type="password" v-model="user.password" placeholder="Senha" name="password" id="password">
        <button class="btn-Enviar">Enviar</button>
        <router-link :to="{ name: 'cadastro' }"><a href="#">Cadastre-se</a></router-link>
    </form>
</template>

<script>

var token;
var id;

export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        loginUser: function () {
            this.$http.post('https://libraryapi-e5on.onrender.com/auth/login', this.user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(
                    (response) => {
                        this.user = {}

                        localStorage.setItem('token', response.body['token']);
                        localStorage.setItem('id', response.body['id']);

                        if (response.body['role'] == "aluno") {
                            this.$router.push({
                                name: 'index',
                                params: {
                                    token: response.body['token'],
                                    id: response.body['id'],
                                    role: response.body['role'],
                                }
                            });
                        } else {
                            this.$router.push({
                                name: 'telaAdmin'
                            });
                        }
                    },
                    (response) => {
                        alert(response.body['msg'])
                    }
                )
        },
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

label {
    display: flex;
    justify-content: center;
}

form {
    background-color: #F6F1F1;
    max-width: 30%;
    width: 40%;
    padding: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 2px 2px 2px #49494988;
}

input {
    border-radius: 5px;
    width: 100%;
    height: 40px;
    border: 1px solid gainsboro;
    padding: 5px;
}

input:focus {
    outline: 0;
    border: 1px solid #146C94;
}

form label,
input,
button {
    margin: 5px;
    max-width: auto;
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
    font: bold;
}

a {
    color: #146C94;
    display: flex;
    justify-content: center;
    font-size: 15px;
    text-decoration: none;
}

template {
    color: #146C94;
    background-color: #19A7CE;
}
</style>