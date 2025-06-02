<script setup>
const navLinks = [
    {
        to: "/admin",
        label: "Dashboard"
    },
    {
        to: "/admin/appointments",
        label: "All Appointments"
    },
    {
        to: "/admin/therapists",
        label: "Therapists"
    }
]

</script>


<template>
    <Sidebar :navLinks />
</template>