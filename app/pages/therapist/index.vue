<script setup>

useHead({
    title: "Therapist dashboard"
})

const navLinks = [
    {
        label: "Appointment Requests",
        to: "/therapist/appointment-requests",
        action: "Approve / Delete"
    },
    {
        label: "My Appointments",
        to: "/therapist/appointments",
        action: "View /Update"
    },
    {
        label: "My Status",
        to: "/therapist/my-status",
        action: "Update Now"
    },
]

</script>

<template>

    <Dashboard :navLinks />

</template>


<style scoped>

</style>