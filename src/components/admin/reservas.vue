<template>
<div class="containerReservas">
    <navbar />
    <div class="containerBody">
        <table>
            <caption>RESERVAS</caption>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>Data Reserva</th>
                    <th>Data Entrega</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Samuel Soares</td>
                    <td>202010687</td>
                    <td>05/02/2023</td>
                    <td>15/02/2023</td>
                    <td>Ativa</td>
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
    }
}
</script>

<style scoped>

.containerBody{
    margin:5px;
}
table{
    border-collapse: collapse;
    width: 100%;
}

table,td,th{
    border: 1px solid black;
    text-align: center;
    height: 30px;
}

th{
    background-color: rgb(44, 83, 189);
    color: white;
    font-weight: 400;
}

caption{
    font-weight: 600;
    padding: 5px;
}

</style>