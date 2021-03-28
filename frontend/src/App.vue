<template>
	<div class="app">
		<Navbar />
		<Container>
			<router-view />
		</Container>
		<Footer v-if="$route.name!=='Dashboard'"/>
	</div>
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
	mounted(){
		console.log(this.$route)
	}
}
</script>

<style lang="scss"></style>
