<template>
    <div>
        <navbar :role="role"/>
        <div class="containerForm">
            <form v-on:submit.prevent="addLivro" autocomplete="off">
                <div class="form-group">
                    <label name="isbn">ISBN:</label>
                    <input type="number" class="form-control" v-model="livro.isbn" id="isbn" required>
                </div>

                <div class="form-group">
                    <label name="titulo">Título:</label>
                    <input type="text" class="form-control" v-model="livro.title" id="titulo" required>
                </div>
                <div class="form-group">
                    <label name="autores">Autor:</label>
                    <input type="text" class="form-control" v-model="livro.author" id="autores" required>
                </div>

                <div class="form-group">
                    <label name="ano">Ano:</label>
                    <input type="number" class="form-control" v-model="livro.year" id="ano" required>
                </div>

                <div class="form-group">
                    <label name="editora">Editora:</label>
                    <input type="text" class="form-control" v-model="livro.pub" id="editora" required>
                </div>

                <div class="form-group">
                    <label name="editora">Gênero:</label>
                    <input type="text" class="form-control" v-model="livro.genre" id="genre" required>
                </div>

                <div class="form-group">
                    <label name="preco">Quantidade:</label>
                    <input type="number" class="form-control" v-model="livro.amount" id="amount" required>
                </div>

                <div class="form-grup">
                    <button class="botao-add">Adicionar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import navbar from '../navbar.vue';
export default {
    data() {
        return {
            livro: {},
            role: null
        }
    },
    mounted(){
        this.role = localStorage.getItem('role')
    },
    components: {
        navbar
    }, methods: {
        addLivro: function () {
            this.$http.post('https://libraryapi-e5on.onrender.com/books/insert', this.livro, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(
                    (response) => {
                        this.livro = {}
                        alert(response.body['msg'])
                        this.$router.push('livrosdisponiveis')
                    },
                    (response) => {
                        alert(response.body['msg'])
                    }
                )
        },
    }
}
</script>

<style>
.containerForm {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100%;
}

form {
    margin-top: 10px;
    width: 50%;
}

.botao-add {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: transparent;
    color: rgb(44, 83, 189);
    border: 1px solid rgb(44, 83, 189);
    font-weight: 600;
}

.botao-add:hover {
    background-color: rgb(44, 83, 189);
    color: white;
    cursor: pointer;
}

.form-group {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}

input {
    height: 30px;
}
</style>