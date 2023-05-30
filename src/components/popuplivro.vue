<template>
    <div class="LivroSelecionadoContainer" v-if="book">
        <!-- CONTEUDO DO POPUP -->
        <div class="LivroSelecionadoConteudo">
            <div class="group">
                <h3>{{ book.title }}</h3>
            </div>

            <div class="group">
                <label>ISBN:</label>
                <label>{{ book.isbn }}</label>
            </div>

            <div class="group">
                <label>Autor:</label>
                <label>{{ book.author }}</label>
            </div>

            <div class="group">
                <label>Ano de publicação:</label>
                <label>{{ book.year }}</label>
            </div>

            <div class="group">
                <label>Gênero:</label>
                <label>{{ book.genre }}</label>
            </div>


            <div class="group">
                <label>Sinopse:</label>
                <br>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae perferendis reiciendis incidunt
                    distinctio doloribus reprehenderit iste mollitia atque numquam, obcaecati dolor dolorem veniam
                    voluptatem laudantium eos, ut est neque iure!</p>

            </div>

            <div>
                <button @click="reservarLivro(ra, book.isbn)" class="reservar">Reservar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'popuplivro',
    props: {
        book: Object,
        ra: String
    },
    methods: {
        reservarLivro(userRa, bookIsbn) {
            const qrCode = 'https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=%27'+userRa+bookIsbn
            this.$http.post('https://libraryapi-e5on.onrender.com/booking/insert', { userRa, bookIsbn, qrCode }, {
            }).then(
                (response) => {
                    alert(response.body['msg'])
                    this.$router.go()
                },
                (response) => {
                    alert(response.body['msg'])
                }
            )
        }
    }
};
</script>

<style scoped>
.LivroSelecionadoContainer {
    position: fixed;
    background-color: rgb(255, 255, 255);
    max-width: 50%;
    padding: 15px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 2px 2px 2px #49494988;
}

.LivroSelecionadoConteudo {
    position: relative;
    background-color: #fff;
    padding: 20px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
}

.group {
    margin-bottom: 10px;
}

.reservar {
    border: 1px solid rgb(44, 83, 189);
    background-color: transparent;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
    padding: 10px;
}

.reservar:hover {
    background-color: rgb(44, 83, 189);
    color: white;
    cursor: pointer;
}
</style>
