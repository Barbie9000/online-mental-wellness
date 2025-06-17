<script setup>
useHead({
    title: 'Donations Management'
})


const { data: donations, pending, error } = useFetch('/api/admin/donations')

</script>

<template>


    <template v-if="pending">
        Fetching donations data
    </template>

    <template v-else-if="error">
        Error occured while fetching donations
    </template>

    <template v-else>
        <h1>
            All donations
        </h1>
    
        <TableView :data="donations"/>

    </template>
</template>

<style scoped>
h1 {
    display: flex;
    justify-content: space-between;
    color: white;
    margin-bottom: 30px;
}
</style>