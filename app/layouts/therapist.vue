<script setup>

useHead({
    title: "Patient dashboard"
})
</script>

<template>

    <div class="app">
        <AppHeader />

        <div class="container">
            <SidebarTherapist />

            <div class="main-content">
                <slot />
            </div>
        </div>
    </div>
</template>


<style scoped>
.app {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}

.container {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
    font-family: Arial, sans-serif;
    overflow: hidden;
}

.main-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url("/assets/images/img13.jpg");
    background-size: cover;
    background-position: center;
    overflow: auto;
    padding: 20px;
}
</style>