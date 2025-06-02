<script setup>
const navLinks = [
    {
        to: "/patient",
        label: "Dashboard"
    },
    {
        to: "/patient/profile",
        label: "Edit Profile"
    },
    {
        to: "/patient/appointments",
        label: "My Appointments"
    },
    {
        to: "/patient/book-appointment",
        label: "Request Appointment"
    }
]

</script>


<template>
    <Sidebar :navLinks />
</template>