<template>
    <div class="containerReservas">
        <navbar />
        <div class="containerBody">
            <table>
                <caption>RESERVAS</caption>
                <thead>
                    <tr>
                        <th>RA</th>
                        <th>ISBN</th>
                        <th>Data Reserva</th>
                        <th>Data Entrega</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="reserva in reservas" :key="reserva">
                        <td>{{ reserva['userRa'] }}</td>
                        <td>{{ reserva['bookIsbn'] }}</td>
                        <td>{{ reserva['startDate'] | formatarData }}</td>
                        <td>{{ reserva['endDate'] | formatarData }}</td>
                        <td>{{ reserva['status'] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import navbar from '../navbar.vue'


export default {
    components: {
        navbar
    },
    data: function () {
        return {
            reservas: []
        }
    },
    created: function () {
        this.fetchReservaData()
    },
    methods: {
        fetchReservaData: function () {
            this.$http.get('https://libraryapi-e5on.onrender.com/booking/list/').then(
                (response) => {
                    this.reservas = response.body['data']
                },
                (response) => { }
            )
        },
    },
    filters: {
        formatarData(valor) {
            const opcoes = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'UTC'
            }

            const formatoData = new Intl.DateTimeFormat('pt-BR', opcoes)
            const dataFormatada = formatoData.format(new Date(valor))

            return dataFormatada
        }
    },
}
</script>

<style scoped>
.containerBody {
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
</style>