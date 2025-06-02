<script setup>
defineProps({
    navLinks: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="sidebar">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
    </div>
</template>


<style scoped>
.sidebar {
    width: calc(fit-content + 40px);
    max-width: 20vw;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 30px;
    height: 100%;
    padding: 20px 0;
}

.sidebar a {
    text-decoration: none;
    width: 100%;
    font-weight: bold;
    padding: 10px 20px;
    color: #34495e;
    text-wrap-mode:nowrap;
}

.sidebar a.router-link-exact-active {
    background-color: #bdc3c7;
}
</style>