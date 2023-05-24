<template>
    <div class="containerLivros">
        <navbar />
        <table>
            <caption>LIVROS DISPONÍVEIS NA BIBLIOTECA</caption>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autores</th>
                    <th>Editora</th>
                    <th>Gênero</th>
                    <th>Ação</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for='x in livros' :key="x['_id']">
                    <td>{{x['title']}}</td>
                    <td>{{ x['author'] }}</td>
                    <td>{{ x['pub'] }}</td>
                    <td>{{x['genre']}}</td>
                    <td>
                        <button @click="removerLivro(x['_id'])" class="acoesUsuariosR">Remover Livro</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="btns">
            <router-link :to="{name:'telaAdmin'}"><button class="navLinks">Tela Admin</button></router-link>
        </div>
        
    </div>
</template>

<script>
import navbar from '../navbar.vue'
export default {
    data: function(){
        return{
            livros: [],
        }
    },
    components: {
        navbar
    },
    created: function() {
        this.fetchLivroData()
    },
    methods: {
        fetchLivroData: function () {
            this.$http.get('https://libraryapi-e5on.onrender.com/books/list/').then(
                (response) => {
                    this.livros = response.body['data']
                },
                (response) => { }
            )
        },
        removerLivro(id) {
            this.$http.delete(`https://libraryapi-e5on.onrender.com/books/delete/${id}`).then(
                response => {
                    console.log(response.body.mensagem);
                    this.fetchLivroData()
                },
                error => {
                    console.error(error);
                }
            );
        }  
    }
}
</script>

<style scoped>
.containerLivros {
    margin: 5px;
}

table {
    border-collapse: collapse;
    width: 100%;
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

caption {
    font-weight: 600;
    padding: 5px;
}

.acoesUsuariosR:hover{
    color: rgb(255, 0, 0);
}

.acoesUsuariosR{
    font-size: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.btns{
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.navLinks{
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

.navLinks:hover{
    background-color: rgb(44, 83, 189);
    color: white;
    cursor: pointer;
}

</style>