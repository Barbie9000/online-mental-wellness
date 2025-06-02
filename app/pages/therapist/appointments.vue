<script setup>
useHead({
    title: 'My Appointments'
})


const { data: therapistAppointments, pending, error } = useFetch('/api/therapist/appointments')




async function updateAppointmentStatus(appointmentId, appointmentStatus) {
    try {


        await $fetch(`/api/therapist/appointments/${appointmentId}`, {
            method: 'PATCH',
            query: {
                status: appointmentStatus
            }
        })

    } catch (error) {
        console.error("Error updating appointment status", error)
    }
}


</script>

<template>

    <div class="main-content">



        <template v-if="pending">
            Fetching appointment requests data
        </template>

        <template v-else-if="error">
            Error occured while fetching appointment requests
        </template>

        <template v-else>
            <h1>
                All Appointment Requests
            </h1>

            <table class="requests-table">
                <thead class="bg-green">
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Symptoms</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="appointment in therapistAppointments" :key="appointment._id">
                        <td>{{ appointment.patientId }}</td>
                        <td>{{ appointment.patientName }}</td>
                        <td>{{ appointment.email }}</td>
                        <td>{{ appointment.phone }}</td>
                        <td>{{ appointment.date }}</td>
                        <td>{{ appointment.time }}</td>
                        <td :title="appointment.symptoms">{{ appointment.symptoms }}</td>
                        <td>
                            <select :value="appointment.status" 
                                @change="(e) => updateAppointmentStatus(appointment._id, e.target.value)">
                                <option :value="APPOINTMENT_STATUSES.UPCOMING">Upcoming</option>
                                <option :value="APPOINTMENT_STATUSES.COMPLETED">Completed</option>
                                <option :value="APPOINTMENT_STATUSES.CANCELLED">Cancelled</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

        </template>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    display: flex;
    justify-content: space-between;
    color: white;
    margin-bottom: 30px;
}
</style>