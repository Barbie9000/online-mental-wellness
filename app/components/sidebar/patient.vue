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
    },
    {
        to: "/patient/donate",
        label: "Donate"
    }
]

</script>


<template>
    <Sidebar :navLinks />
</template>