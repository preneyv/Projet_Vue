<template>
	<h1>{{ $route.params.id }}</h1>
	<h1>{{ $route.params }}</h1>
</template>

<script>
export default {
	props: ["project"],
};
</script>
