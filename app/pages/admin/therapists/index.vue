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

        <table class="therapist-table">
            <thead class="bg-green">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Availability</th>
                    <th>Experience</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="therapist in therapists" :key="therapist.id">
                    <td>{{ therapist.id }}</td>
                    <td>{{ therapist.names }}</td>
                    <td>{{ therapist.email }}</td>
                    <td>{{ therapist.phone }}</td>
                    <td>
                        <span class="status" :class="[therapist.availability]">{{ therapist.availability }}</span>
                    </td>
                    <td>{{ therapist.yearsOfExperience }}</td>
                    <td>{{ therapist.rating }}</td>
                    <td>
                        <button class="delete" @click="() => deleteTherapist(therapist.id)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

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