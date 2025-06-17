<script setup>

useHead({
    title: 'My Appointments'
})


const { data: appointments, pending, error } = useFetch('/api/patient/appointments')


async function updateAppointmentRating(appointmentId, newRating) {
    if (!appointmentId || !newRating || newRating <= 0 || newRating > 5) return;

    try {

        await $fetch(`/api/patient/appointments/${appointmentId}`, {
            method: 'PATCH',
            query: {
                rating: newRating
            }
        })

        appointments.value.find(appointment => appointment._id === appointmentId).rating = newRating

    } catch (error) {
        console.error("Error updating appointment rating", error)
    }
}


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

        <TableView :data="appointments" :actions="[
            {
                label: 'Rate',
                handler: updateAppointmentRating
            }
        ]">
            <template #field-status="{ value: status }">
                <span :class="['status', status]">
                    {{ status }}
                </span>
            </template>

            <template #field-rating="{ item: appointment }">
                <input type="number" :value="appointment.rating"
                    @change="e => updateAppointmentRating(appointment._id, e.target.value)">
            </template>
        </TableView>

    </template />

</template>

<style scoped>
h1 {
    margin-bottom: 30px;
}
</style>