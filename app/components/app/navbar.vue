<script setup>

</script>

<template>
    <div class="navbar">
        <ul>
            <li><a href="#social"> Social </a></li>
            <li><a href="#psychological"> psychological </a> </li>
            <li><a href="#physical"> physical </a></li>
            <li><a href="#developmental"> developmental </a></li>
            <li><a href="#emtional"> Emotional </a> </li>
        </ul>

    </div>
</template>

<style scoped>
.navbar {
    width: 85%;
    margin: auto;
    padding: 35px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.navbar ul li {
    list-style: none;
    display: inline-block;
    margin: 0 20px;
    position: relative;

}

.navbar ul li a {
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
}

.navbar ul li::after {
    content: '';
    height: 3px;
    width: 0%;
    background: #009688;
    position: absolute;
    left: 0;
    bottom: -10px;
    transition: 0.5s;
}

.navbar ul li:hover::after {
    width: 100%;
}
</style>