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
    {
        label: "Patients",
        to: "/admin/patients",
        action: "Manage/Delete"
    },
    {
        label: "Donations",
        to: "/admin/donations",
        action: "Manage Funds"
    },
]

</script>

<template>

    <Dashboard :navLinks />

</template>


<style scoped></style>