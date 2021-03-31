<template>
	<h1 class="page-title">{{ text }}</h1>
</template>

<script>
export default {
	name: 'PageTitle',
	props: {
		text: String
	}
}
</script>

<style lang="scss" scoped>
.page-title {
	color: $primaryTextColor;
	font-size: 2rem;
	padding: 1rem 0 2rem 0;
}
</style>
