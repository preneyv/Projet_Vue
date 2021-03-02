<template>
    <nav class="navbar">
        <div class="navbar__container">
            <div class="navbar__logo">
                <router-link to="/">
                    <img src="../assets/logo.png" alt="Logo Vue" />
                </router-link>
            </div>
            <ul class="navbar__links">
                <li class="navbar__link">
                    <router-link to="/projects">Projet</router-link>
                </li>
                <li class="navbar__link">
                    <router-link to="/about">A propos</router-link>
                </li>
                <li class="navbar__link">
                    <router-link to="/submit">Soumettre un projet</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
}
</script>

<style lang="scss" scoped>
.navbar {
    &__container {
        margin-top: space(2);
        width: width(10);
        @include flex(row, space-between);
        @extend .mx-auto;
    }
    &__links {
      @include flex();
      display: inline-flex;
      
    }
}
</style>
