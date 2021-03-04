<template>
    <Navbar />
    <Container>
        <router-view />
    </Container>
    <Footer />
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Container from "@/components/Container.vue"
import Footer from "@/components/Footer.vue"
export default {
    components: {
        Navbar,
        Container,
        Footer
    },
}
</script>

<style lang="scss"></style>
