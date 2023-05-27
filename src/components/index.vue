<template>
    <div>
        <navbar @buscarLivros="buscarLivros" />
        <h2>Bem vindo, {{ this.nome }}!</h2>
        <listaReservados v-if="temReservas" titulo="MINHAS RESERVAS" :ra="ra" />
        <listaLivros v-if="!termoBusca" titulo="LIVROS DISPONÍVEIS" :ra="ra" />
        <listaLivros v-if="termoBusca" titulo="RESULTADOS DA BUSCA" :ra="ra" :termoBusca="termoBusca" />
    </div>
</template>

<script>
import navbar from './navbar.vue';
import listaLivros from './lista-livros.vue';
import listaReservados from './lista-livros-reservados.vue'
export default {
    name: 'index',
    components: {
        navbar,
        listaLivros,
        listaReservados
    },
    data: function () {
        return {
            ra: null,
            nome: null,
            temReservas: false,
            termoBusca: ''
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
                localStorage.setItem('ra', response.body['user']['ra'])
                const userRa = localStorage.getItem('ra')
                this.ra = response.body['user']['ra'];
                this.nome = response.body['user']['name'];
                this.fetchLivroReservadoData()
            },
            (error) => {
                console.log(error);
            }
        )
    }, methods: {
        fetchLivroReservadoData() {
            const userRa = localStorage.getItem('ra');
            this.$http
                .get('https://libraryapi-e5on.onrender.com/bookings/userlist/' + userRa)
                .then(response => {
                    this.temReservas = response.body['data'].length > 0;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        buscarLivros(termo) {
            this.termoBusca = termo;
        }
    }
};
</script>

<style scoped>
h2 {
    padding-top: 20px;
    display: flex;
    justify-content: right;
    padding-bottom: 5px;
    font-size: 30px;
    margin-right: 20px;
}
</style>