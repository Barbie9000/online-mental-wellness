<template>
    <div class="banner">
        <AppNavbar />
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.banner {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(/assets/images/img17.jpg);
    background-size: cover;
}

.content {
    width: 100%;
    flex-grow: 1;
    overflow-y: scroll;
}
</style>