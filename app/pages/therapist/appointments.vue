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

            <TableView :data="therapistAppointments">

                <template #field-status="{ item: appointment }">
                    <select :value="appointment.status"
                        @change="(e) => updateAppointmentStatus(appointment._id, e.target.value)">
                        <option :value="APPOINTMENT_STATUSES.UPCOMING">Upcoming</option>
                        <option :value="APPOINTMENT_STATUSES.COMPLETED">Completed</option>
                        <option :value="APPOINTMENT_STATUSES.CANCELLED">Cancelled</option>
                    </select>
                </template>
            </TableView>

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