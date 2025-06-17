<script setup>
useHead({
    title: 'Patient Management'
})


const { data: patients, pending, error } = useFetch('/api/admin/patients')


async function deletePatient(patientId) {
    try {
        const deleteConsent = confirm('Are you sure you want to delete?')

        if (!deleteConsent) {
            alert('Operation aborted!')

            return;
        }

        await $fetch(`/api/admin/patients/${patientId}`, {
            method: 'delete'
        })

        patients.value = patients.value.filter(t => t.id !== patientId)
    } catch (error) {
        console.error("Error deleting patient")
    }
}

</script>

<template>


    <template v-if="pending">
        Fetching patients data
    </template>

    <template v-else-if="error">
        Error occured while fetching patients
    </template>

    <template v-else>
        <h1>
            All Registered patients
        </h1>
    
        <TableView :data="patients" :actions="[
            {
                class: 'delete',
                label: 'Delete',
                handler: patient => deletePatient(patient.id)
            }
        ]">

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

.delete {
    background-color: #bb0000;
    color: white;
}

.delete:hover {
    background-color: #ff0000;
}
</style>