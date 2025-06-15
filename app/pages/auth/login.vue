<script setup>

const loginFormState = reactive({
    email: '',
    password: '',
    rememberMe: false
})


const handleLogin = async function () {

    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: loginFormState
        })

        reloadNuxtApp()

    } catch (error) {
        console.error('Error loging in')
    }
}


</script>

<template>
    <form @submit.prevent="handleLogin">
        <h1> Login </h1>
        <div class="input-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <circle cx="12" cy="8" r="3" stroke="currentColor" stroke-width="2" />
                <path d="M6.168 18.849A6 6 0 0 1 12 16a6 6 0 0 1 5.832 2.849" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" />
            </svg>

            <input v-model="loginFormState.email" type="text" placeholder="email" required>
        </div>
        <div class="input-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>

            <input v-model="loginFormState.password" type="password" placeholder="password" required>
        </div>
        <button type="submit"> Login </button>
        <p class="remember-me"><input type="checkbox" name="rememberMe" id="remember-me" /> <span>Remember me</span></p>
        <p class="register-link"> Do not have an account?
            <NuxtLink to="/auth/signup"> Sign up</NuxtLink>
        </p>
    </form>
</template>

<style scoped>
h1 {
    font-size: 36px;
    text-align: center;
    color: white
}

form {
    width: 500px;
    border: #333 solid 2px;
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, .2);
}

.input-box {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
}


.input-box input {
    background: transparent;
    flex-grow: 1;
    border: 2px solid rgba(255, 255, 255, .2);
    border-radius: 40px;
    font-size: 16px;
    color: #fff;
    padding: 20px 45px 20px 20px;
}

.input-box input::placeholder {
    color: #fff;
}

button [type="submit"] {
    width: 100%;
    background: #fff;
    font-size: 16px;
    color: #333;
    font-weight: 600;
    margin-top: 50px;
}

.register-link {
    font-size: 14.5px;
    text-align: center;
    margin: 20px 0 15px;
}

.remember-me {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 5px;
    justify-content: start;
}

.register-link {
    color: red
}

.register-link a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
}

.register-link a:hover {
    text-decoration: underline;
}
</style>