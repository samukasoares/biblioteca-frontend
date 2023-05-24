<template>
    <div>
        <navbar />
        <listaLivros titulo="LIVROS DISPONÍVEIS" :ra="ra" />
    </div>
</template>

<script>
import navbar from './navbar.vue';
import listaLivros from './lista-livros.vue';
export default {
    name: 'index',
    components: {
        navbar,
        listaLivros
    },
    data: function(){
        return {
            ra: null,
        }
    },
    created: function () {
        this.$http.get('https://libraryapi-e5on.onrender.com/user/' + this.$route.params.id,{
                headers: {
                    'Authorization': "Bearer " + this.$route.params.token,
                    'Content-Type': 'application/json'
                }
            }).then(
                (response) => {
                    this.ra = response.body['user']['ra'];
                },
                (error) => {
                    console.log(error);
                }
            )
    }
};
</script>
