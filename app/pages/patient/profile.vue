<script setup>
useHead({
    title: 'Patient Profile Form'
})

const { user, fetch:refreshSession } = useUserSession()

const updateProfileFormState = reactive({
    doB: user.value?.personalInfo?.doB ?? '',
    phone: user.value?.contactInfo?.phone ?? '',
    email: user.value?.contactInfo?.email ?? '',
    emergency: {
        names: user.value?.emergency?.names ?? '',
        phone: user.value?.emergency?.phone ?? '',
        relationship: user.value?.emergency?.relationship ?? '',
    }
})


const handleUpdateProfile = async function () {

    try {
        await $fetch('/api/patient/profile', {
            method: 'PUT',
            body: updateProfileFormState
        })

        await refreshSession()

        reloadNuxtApp()
    } catch (error) {
        console.error('Error updating profile', error)
    }
}

</script>

<template>
    <form class="bg-white" @submit.prevent="handleUpdateProfile">
        <h1>Update Profile Form</h1>

        <div class="input-group">
            <label for="dob">Date of Birth:</label>
            <input v-model="updateProfileFormState.doB" type="date" id="dob" name="dob">
        </div>

        <div class="input-group">
            <label for="contact">Contact Number:</label>
            <input v-model="updateProfileFormState.phone" type="tel" id="contact" name="contact">
        </div>

        <div class="input-group">
            <label for="email">Email Address:</label>
            <input v-model="updateProfileFormState.email" type="email" id="email" name="email">
        </div>

        <div class="input-group">
            <label for="emergencyName">Emergency Contact Name:</label>
            <input v-model="updateProfileFormState.emergency.names" type="text" id="emergencyName" name="emergencyName">
        </div>

        <div class="input-group">
            <label for="emergencyPhone">Emergency Contact Phone:</label>
            <input v-model="updateProfileFormState.emergency.phone" type="tel" id="emergencyPhone"
                name="emergencyPhone">
        </div>

        <div class="input-group">
            <label for="emergencyRelation">Relationship:</label>
            <input v-model="updateProfileFormState.emergency.relationship" type="text" id="emergencyRelation"
                name="emergencyRelation">
        </div>

        <button type="submit" class="bg-green">Save Profile</button>
    </form>

</template>


<style scoped>
form {
    width: 600px;
}

h1 {
    text-align: center;
    color: #2563eb;
    margin-bottom: 25px;
}

.input-group label {
 color:#333
}

</style>