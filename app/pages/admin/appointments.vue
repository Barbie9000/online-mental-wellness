<script setup>

useHead({
    title: 'Appointment Details - Admin Dashboard'
})

const { data: appointments, pending, error } = useFetch('/api/admin/appointments')


</script>

<template>

    <template v-if="pending">
        Fetching appointments data
    </template>

    <template v-else-if="error">
        Error occured while fetching appointments data
    </template>

    <template v-else>
        <h1 class="text-white text-large">Appointment Details</h1>
        <table>
            <thead class="bg-green">
                <tr>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Doctor</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="appointment in appointments" :key="appointment._id">
                    <td>{{ appointment.patientId }}</td>
                    <td>{{ appointment.patientName }}</td>
                    <td>{{ appointment.date }}</td>
                    <td>{{ appointment.time }}</td>
                    <td>{{ appointment.therapistName }}</td>
                    <td>
                        <span class="status" :class="[appointment.status]">{{ appointment.status }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>

</template>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 25px;
}
</style>