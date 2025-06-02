<script setup>

useHead({
    title: 'My Appointments'
})


const { data: appointments, pending, error } = useFetch('/api/patient/appointments')

</script>
<template>

    <template v-if="pending">
        <p> Fetching appointments data
        </p>
    </template>

    <template v-else-if="error">
        <p> Error occured while fetching appointments data
        </p>
    </template>

    <template v-else>

        <h1 class="text-white text-large">My Appointments</h1>

        <table>
            <thead class="bg-green">
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Therapist</th>

                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(appointment, index) in appointments" :key="index">
                    <td>{{ appointment.date }}</td>
                    <td>{{ appointment.time }}</td>
                    <td>{{ appointment.therapist }}</td>

                    <td><span class="status" :class="[appointment.status]">
                            {{ appointment.status
                            }}</span>
                    </td>
                </tr>
            </tbody>
        </table>

    </template />

</template>

<style scoped>
h1 {
    margin-bottom: 30px;
}

</style>