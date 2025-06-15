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

        <TableView :data="appointments">
            <template #field-status="{ value: status }">
                <span :class="['status', status]">
                    {{ status }}
                </span>
            </template>
        </TableView>

    </template />

</template>

<style scoped>
h1 {
    margin-bottom: 30px;
}
</style>