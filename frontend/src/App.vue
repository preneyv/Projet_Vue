<template>
	<Navbar />
	<main>
		<router-view />
	</main>
	<Footer v-if="$route.name !== 'dashboard'" />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
	components: {
		Navbar,
		Footer,
	},
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 767px) {
	main {
		padding-top: space(24);
	}
}
</style>
