<script setup>
const navLinks = [
    {
        to: "/therapist",
        label: "Dashboard"
    },
    {
        to: "/therapist/appointment-requests",
        label: "Appointment Requests"
    },
    {
        to: "/therapist/appointments",
        label: "My Appointments"
    },
    {
        to: "/therapist/my-status",
        label: "My Status"
    }
]

</script>


<template>
    <Sidebar :navLinks />
</template>