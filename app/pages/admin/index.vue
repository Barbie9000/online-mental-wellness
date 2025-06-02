<script setup>

useHead({
    title: "Admin dashboard"
})

const navLinks = [
    {
        label: "Therapists",
        to: "/admin/therapists",
        action: "View / Delete"
    },
    {
        label: "Appointments",
        to: "/admin/appointments",
        action: "View Appointments"
    },
    {
        label: "Add a Therapist",
        to: "/admin/therapists/add",
        action: "Add Now"
    },
]

</script>

<template>

    <Dashboard :navLinks />

</template>


<style scoped></style>