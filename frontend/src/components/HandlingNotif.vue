<template>
		<div class="errors-ctn"><span  :class="notifs.type">{{notifs.message}}<i class="bi bi-x" @click="removeNotif"></i></span></div>
</template>

<script>
export default {
	name:'HandlingNotif',
	props:{
		notifs : Object,
		removeNotif: Function
	},
	mounted(){
		this.startTimer()
	},
	updated() {

		this.startTimer()
	},
	methods: {
		startTimer() {
			let timer = setTimeout( () => {
				this.removeNotif()
				clearTimeout(timer)
			},3000)
		}
	}

}
</script>
<style lang="scss" scoped>

	.errors-ctn {
		width: 100%;
		color: black;
		height: auto;
		margin-top: 0.5rem;
		@include flex(column);
		span {
			width: 100%;
			padding: 0.5rem 1rem;

			border-radius: 3px;

			&.success {
				background-color: #46fc8c;
			}
			&.error {
				background-color: #FC4646;
			}
			@include flex(row,space-between);

			i{
				&:hover{
					cursor: pointer;
				}
			}
		}
	}

</style>