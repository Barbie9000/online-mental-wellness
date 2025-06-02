<script setup>

const signupFormState = reactive({
  firstName: '',
  lastName: '',
  otherNames: '',
  gender: '',
  email: '',
  password: ''
})


const handleLogin = async function () {

  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: signupFormState
    })

    navigateTo('/auth/login')
  } catch (error) {
    console.error('Error signing up')
  }
}


</script>

<template>
  <form @submit.prevent="handleLogin">
    <h1>Sign Up Form </h1>
    <input v-model="signupFormState.firstName" id="first-name" name="firstName" type="text" placeholder="First Name"
      required>
    <input v-model="signupFormState.lastName" id="last-name" name="lastName" type="text" placeholder="Last Name"
      required>
    <input v-model="signupFormState.otherNames" id="other-names" name="otherNames" type="text"
      placeholder="Other Names">
    <select v-model="signupFormState.gender" id="gender" name="gender" required>
      <option value="">Select Gender</option>
      <option value="M">Male</option>
      <option value="F">Female</option>
    </select>
    <input v-model="signupFormState.email" type="email" placeholder="Email" required>

    <input v-model="signupFormState.password" type="password" placeholder="Password" required>


    <button type="submit" class="btn"> Sign Up </button>
    <p class="login-link">
      Already have an account?
      <NuxtLink to="/auth/login"> Log in</NuxtLink>
    </p>
  </form>
</template>

<style scoped>
form {
  width: 500px;
  border: 2px solid rgba(255, 255, 255, .2);
  border-radius: 20px;
}

h1 {
  font-size: 30px;
  text-align: center;
  color: white
}

input,
select {
  height: 25px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  border-radius: 40px;
  font-size: 16px;
  color: #fff;
  padding: 20px;
}

.input-group input::placeholder {
  color: #fff;
}

.btn {
  width: 100%;
  background-color: #fff;
  border-radius: 40px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.login-link {
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15px;
  color: white;
}

.login-link a {
  color: #f00;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>