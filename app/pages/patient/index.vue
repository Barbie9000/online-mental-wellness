<script setup>

useHead({
    title: "Patient dashboard"
})

const navLinks = [
    {
        label: "My Profile",
        to: "/patient/profile",
        action: "View / Edit"
    },
    {
        label: "Appointments",
        to: "/patient/appointments",
        action: "View Appointments"
    },
    {
        label: "Book Appointment",
        to: "/patient/book-appointment",
        action: "Request Now"
    },
    {
        label: "Donate",
        to: "/patient/donate",
        action: "Support our Mission"
    },
]

</script>

<template>

    <Dashboard :navLinks />

</template>


<style scoped></style>