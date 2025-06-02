<script setup>

useHead({
    title: 'Book Appointment'
})

const appointmentBookingFormState = reactive({
    date: null,
    message: ''
})


const requestAppointment = async function () {

    try {
        await $fetch('/api/patient/appointments', {
            method: 'POST',
            body: appointmentBookingFormState
        })

        navigateTo('/patient/appointments')
    } catch (error) {
        console.error('Could not book appointment', error)
    }
}

</script>

<template>
    <form @submit.prevent="requestAppointment" class="bg-white shadow">
        <h1 class="text-large">Book an Appointment</h1>


        <div class="input-group">
            <label>Date of Appointment:</label>
            <input v-model="appointmentBookingFormState.date" type="date" name="date" required>
        </div>

        <div class="input-group">
            <label>Message / Symptoms:</label>
            <textarea v-model="appointmentBookingFormState.symptoms" name="message" rows="4"
                placeholder="Describe your symptoms..."></textarea>
        </div>

        <button class="bg-green" type="submit">Submit Request</button>
    </form>

</template>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 30px;
}


label {
    color: #2c3e50;
}


</style>