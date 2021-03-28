<template>
	<Navbar />
	<main>
		<router-view />
	</main>
	<Footer v-if="$route.name !== 'Dashboard'" />
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
