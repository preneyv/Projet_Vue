<template>
	<div class="modal">
		<div class="modal__container">
			<div class="modal__inner"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Modal",
	props: {
		project: Object,
	},
};
</script>


<style lang="scss" scoped>
.modal {
	width: 100vw;
	height: 100vh;
	background: lighten($black, 20%);
	&__container {
		
	}
}
</style>