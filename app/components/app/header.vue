<script setup>

const handleLogout = async function () {
    const { clear } = useUserSession()

    await clear()


    navigateTo('/auth/login')
}

</script>

<template>
    <div class="header">
        <h2> BETTERMIND ONLINE MENTAL WELLNESS SYSTEM</h2>
        <button @click="handleLogout" class="logout">Logout</button>
    </div>
</template>

<style scoped>
.header {
    background-color: seagreen;
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logout {
    color: #ecf0f1;
    background-color: transparent;
    border:none;
    text-decoration: none;
    font-weight: bold;
}
</style>