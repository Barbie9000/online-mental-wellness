<script setup>
useHead({
    title: 'Therapist Management'
})


const { data: therapists, pending, error } = useFetch('/api/admin/therapists')


async function deleteTherapist(therapistId) {
    try {
        const deleteConsent = confirm('Are you sure you want to delete?')

        if (!deleteConsent) {
            alert('Operation aborted!')

            return;
        }

        await $fetch(`/api/admin/therapists/${therapistId}`, {
            method: 'delete'
        })
        therapists.value = therapists.value.filter(t => t.id !== therapistId)
    } catch (error) {
        console.error("Error deleting therapist")
    }
}

</script>

<template>


    <template v-if="pending">
        Fetching Therapists data
    </template>

    <template v-else-if="error">
        Error occured while fetching therapists
    </template>

    <template v-else>
        <h1><span>All Registered Therapists</span>
            <NuxtLink class="bg-white" to="/admin/therapists/add">Add a therapist</NuxtLink>
        </h1>

        <TableView :data="therapists" :aliases="{ yearsOfExperience: 'Experience' }" :actions="[
            {
                class: 'delete',
                label: 'Delete',
                handler: therapist => deleteTherapist(therapist.id)
            }
        ]">

            <template #field-availability="{ item: therapist }">
                <span class="status" :class="[therapist.availability]">{{ therapist.availability }}</span>
            </template>
        </TableView>

    </template>
</template>

<style scoped>
h1 {
    display: flex;
    justify-content: space-between;
    color: white;
    margin-bottom: 30px;
}

h1 a {
    padding: 10px;
    font-size: 20px;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.delete {
    background-color: #bb0000;
    color: white;
}

.delete:hover {
    background-color: #ff0000;
}
</style>