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
    },
    {
        to: "/admin/patients",
        label: "Patients"
    },
    {
        to: "/admin/donations",
        label: "Donations"
    }
]

</script>


<template>
    <Sidebar :navLinks />
</template>