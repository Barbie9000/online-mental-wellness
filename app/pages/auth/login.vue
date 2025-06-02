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
            <i class='bx bx-user-circle'></i>
            <input v-model="loginFormState.email" type="text" placeholder="email" required>
        </div>
        <div class="input-box">
            <i class='bx bx-lock-alt'></i>
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

.input-box i {
    font-size: 36px;
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