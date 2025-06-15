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
        <TableView :data="appointments" :aliases="{ therapistName: 'Doctor' }">
            <template #field-status="{ item: appointment }">
                <span class="status" :class="[appointment.status]">{{ appointment.status }}</span>
            </template>
        </TableView>

    </template>

</template>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 25px;
}
</style>