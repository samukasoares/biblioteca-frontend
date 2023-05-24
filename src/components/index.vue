<template>
    <div>
        <navbar />
        <h2>Bem vindo, {{ this.nome }}!</h2>
        <listaReservados titulo="MINHAS RESERVAS" :ra="ra"/>
        <listaLivros titulo="LIVROS DISPONÍVEIS" :ra="ra" />
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
            nome: null
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
                localStorage.setItem('ra',response.body['user']['ra'])
                const userRa = localStorage.getItem('ra')
                this.ra = response.body['user']['ra'];
                this.nome = response.body['user']['name'];
            },
            (error) => {
                console.log(error);
            }
        )
    }
};
</script>

<style scoped>
h2 {
    display: flex;
    justify-content: right;
    padding-bottom: 5px;
    font-size: 30px;
    margin-right: 20px;
}
</style>