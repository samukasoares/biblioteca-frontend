<template>
    <div>
        <navbar :role="role" />
        <div class="containerTabelaUsuarios">
            <table class="usuariosPendentes">
                <caption>USUÁRIOS PENDENTES E SUSPENSOS</caption>
                <thead>
                    <tr>
                        <th style="width: 35%;">Nome</th>
                        <th style="width: 20%;">RA</th>
                        <th style="width: 20%;">Cargo</th>
                        <th style="width: 15%;">Ação</th>
                        <th style="width: 15%;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='user in usuariosPendentes' :key="user['_id']">
                        <td>{{ user['name'] }}</td>
                        <td>{{ user['ra'] }}</td>
                        <td>{{ user['role'] }}</td>
                        <td>
                            <button @click="aprovarUser(user['ra'])" class="acoesUsuariosV">Aprovar</button>
                            <label>|</label>
                            <button @click="reprovarUser(user['ra'])" class="acoesUsuariosR">Reprovar</button>
                        </td>
                        <td>{{ user['state'] }}</td>
                    </tr>
                </tbody>
            </table>

            <table class="todosUsuarios">
                <caption>TODOS OS USUÁRIOS</caption>
                <thead>
                    <tr>
                        <th style="width: 20%;">Nome</th>
                        <th style="width: 10%;">RA</th>
                        <th style="width: 25%;">Email</th>
                        <th style="width: 15%;">Cargo</th>
                        <th style="width: 20%;">Ação</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for='x in usuarios' :key="x['_id']">
                        <td>{{ x['name'] }}</td>
                        <td>{{ x['ra'] }}</td>
                        <td>{{ x['email'] }}</td>
                        <td>{{ x['role'] }}</td>
                        <td>
                            <button @click="suspenderUser(x['ra'])" class="acoesUsuariosR">Suspender</button>
                            <label>|</label>
                            <button @click="reprovarUser(x['ra'])" class="acoesUsuariosR">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <div class="botoesAcao">
            <router-link :to="{ name: 'cadastrolivro' }"><button class="btn">Cadastrar Livro</button></router-link>
            <router-link :to="{ name: 'reservas' }"><button class="btn">Ver Reservas</button></router-link>
            <router-link :to="{ name: 'livrosdisponiveis' }"><button class="btn">Livros</button></router-link>
        </div>-->
    </div>
</template>

<script>
import navbar from '../navbar.vue'
export default {
    name: 'telaAdmin',
    components: {
        navbar
    },
    data: function () {
        return {
            usuarios: [],
            usuariosPendentes: [],
            x: {},
            role:null,
        }
    },
    mounted: function () {
        const token = localStorage.getItem('token'); // Recupere o token do localStorage
        const id = localStorage.getItem('id'); // Recupere o id do localStorage
        this.$http.get('https://libraryapi-e5on.onrender.com/user/' + id, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                localStorage.setItem('role',response.body['user']['role'])
                this.role = response.body['user']['role']
                this.fetchUserData()
                this.fetchUserPData()
                
            },
            (error) => {
                console.log(error);
            }
        )
    },

    methods: {
        fetchUserData: function () {
            this.$http.get('https://libraryapi-e5on.onrender.com/users/approved/list').then(
                (response) => {
                    this.usuarios = response.body['data']
                },
                (response) => { }
            )
        },
        fetchUserPData: function () {
            this.$http.get('https://libraryapi-e5on.onrender.com/users/pendent/list').then(
                (response) => {
                    this.usuariosPendentes = response.body['data']
                },
                (response) => { }
            )
        },
        aprovarUser(ra) {
            const x = { ra }
            this.$http.patch('https://libraryapi-e5on.onrender.com/users/approving', x).then(
                response => {
                    console.log(response.body['msg'])
                    this.fetchUserData()
                    this.fetchUserPData()
                },
                error => {
                    console.error(error);
                }
            )
        },
        reprovarUser(ra) {
            const x = { ra }
            this.$http.patch('https://libraryapi-e5on.onrender.com/users/reproving', x).then(
                response => {
                    alert(response.body['msg'])
                    this.fetchUserData()
                    this.fetchUserPData()
                },
                error => {
                    console.error(error);
                }
            )
        },
        suspenderUser(ra) {
            const x = { ra }
            this.$http.patch('https://libraryapi-e5on.onrender.com/users/suspending', x).then(
                response => {
                    alert(response.body['msg'])
                    this.fetchUserData()
                    this.fetchUserPData()
                },
                error => {
                    console.error(error);
                }
            )
        },
    }
}
</script>

<style scoped>
.containerTabelaUsuarios {
    display: flex;
    justify-content: space-between;
    max-height: 550px;
}

caption {
    font-weight: 600;
    padding: 5px;
}

.acoesUsuariosV {
    font-size: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.acoesUsuariosV:hover {
    color: rgb(0, 175, 15);
}

.acoesUsuariosR:hover {
    color: rgb(255, 0, 0);
    cursor: pointer;
}

.acoesUsuariosR:active {
    cursor: progress;
}

.acoesUsuariosR {
    font-size: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}


.usuariosPendentes,
.todosUsuarios {
    width: 50%;
}

table {
    border-collapse: collapse;
    margin: 5px;
}

table,
td,
th {
    border: 1px solid black;
    text-align: center;
    height: 30px;
}

th {
    background-color: rgb(44, 83, 189);
    color: white;
    font-weight: 400;
}

.botoesAcao {
    display: flex;
    justify-content: center;
}

.btn {
    padding: 10px;
    width: 200px;
    margin-left: 40px;
    margin-top: 10px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid rgb(44, 83, 189);
}

.btn:hover {
    background-color: rgb(44, 83, 189);
    color: white;
    cursor: pointer;
}
</style>