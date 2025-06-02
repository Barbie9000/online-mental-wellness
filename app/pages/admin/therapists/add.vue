<script setup>
useHead({
    title: 'Add Therapist - Admin Dashboard'
})


const therapistFormState = reactive({
    firstName: '',
    lastName: '',
    otherName: '',
    gender: '',
    email: '',
    phone: '',
    yearRegistered: ''
})

async function addTherapist() {
    try {
        await $fetch('/api/admin/therapists/add', {
            method: 'post',
            body: therapistFormState
        })

        navigateTo('/admin/therapists')
    } catch (error) {

    }
}
</script>

<template>

    <div class="form-section">
        <form class="bg-white" @submit.prevent="addTherapist">
            <h2>Add Therapist</h2>

            <div class="input-group">
                <h5>Personal Infomation</h5>
                <input v-model="therapistFormState.firstName" id="first-name" name="firstName" type="text"
                    placeholder="First Name" required>
                <input v-model="therapistFormState.lastName" id="last-name" name="lastName" type="text"
                    placeholder="Last Name" required>
                <input v-model="therapistFormState.otherName" id="other-names" name="otherNames" type="text"
                    placeholder="Other Name">
                <select class="bg-white" v-model="therapistFormState.gender" id="gender" name="gender" required>
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>


            </div>

            <div class="input-group">
                <h5>Contact Information</h5>
                <input v-model="therapistFormState.email" id="email" name="email" type="email" placeholder="Email"
                    required>
                <input v-model="therapistFormState.phone" id="tel" name="tel" type="tel" placeholder="Phone" required>
            </div>

            <div class="input-group">
                <h5>Specialty Information</h5>
                <input v-model="therapistFormState.yearRegistered" id="year-registered" name="yearRegistered"
                    type="Number" :max="new Date().getFullYear()" placeholder="Year Registered" required>
            </div>

            <button class="bg-green" type="submit">Add Therapist</button>
        </form>
    </div>

</template>

<style scoped>
h2 {
    text-align: center;
    color: #2a4d69;
}

form {
    width: 600px;
}

</style>