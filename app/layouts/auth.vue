<template>

    <div class="wrapper">
        <main>
            <slot />
        </main>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("/assets/images/img10.jpg");
    background-size: cover;
    background-position: center;
    padding: 30px;
    overflow: hidden;
}

main {
    width: inherit;
    height: inherit;
    overflow-y: scroll;
}
</style>