<template>
    <div class="container">
        <h3>{{ titulo }}</h3>
        <div class="container-livros">
            <div class="card" v-for='x in livrosFiltrados' :key="x['_id']">
                <a @click="togglePopup(x)" class="open-popup">
                    <img :src="x.thumb">
                </a>
                <h4>{{ x['title'] }}</h4>
            </div>
            <popuplivro :ra="ra" :book="selectedBook" v-if="selectedBook" @close="closePopup" />
        </div>

    </div>
</template>

<script>
import popuplivro from './popuplivro.vue'
import livroCapa from '../assets/CapaLivro.jpeg'
export default {
    name: 'lista-livros',
    components: {
        popuplivro
    },
    props: {
        titulo: String,
        ra: String,
        termoBusca: String
    },
    data: function () {
        return {
            livroCapa: livroCapa,
            livros: [],
            selectedBook: null,
        }
    },
    mounted: function () {
        this.fetchLivroData()
    },
    computed: {
        livrosFiltrados() {
            if (!this.termoBusca) {
                return this.livros;
            } else {
                const termo = this.termoBusca.toLowerCase();
                return this.livros.filter(livro => livro.title.toLowerCase().includes(termo));
            }
        },
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
        togglePopup(book) {
            if (this.selectedBook && this.selectedBook['_id'] === book['_id']) {
                this.closePopup();
            } else {
                this.openPopup(book);
            }
        },
        openPopup(book) {
            this.selectedBook = book;
        },
        closePopup() {
            this.selectedBook = null;
        }
    }
}
</script>

<style scoped>
img {
    width: 150px;
    height: 200px;
    border-radius: 5px;
}

h3 {
    padding-bottom: 5px;
    font-size: 20px;
    margin-left: 5px;
}

h4 {
    display: flex;
    justify-content: center;
}

.container {
    margin-left: 5px;
}

.card {
    display: flex;
    flex-direction: column;
    width: 150px;
    padding: 5px;
}

.container-livros {
    display: flex;
    flex-wrap: wrap;
    justify-content: last baseline;
}

.open-popup {
    cursor: pointer;
}
</style>