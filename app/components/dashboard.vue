<script setup>


defineProps({
    navLinks: {
        type: Array,
        required: true
    }
})

const { user } = useUserSession()


const userName = user.value.personalInfo?.name?.first ?? user.value.auth?.role ?? ''
</script>

<template>

    <h1 class="text-white text-larger bolder">WELCOME {{ userName.toUpperCase() }},</h1>
    <div class="cards">
        <div v-for="link in navLinks" :key="link.to" class="card">
            <h3>{{ link.label }}</h3>
            <NuxtLink :to="link.to">{{ link.action }}</NuxtLink>
        </div>

    </div>

</template>


<style scoped>
h1 {
    text-align: center;
    margin-bottom: 40px;
}
</style>