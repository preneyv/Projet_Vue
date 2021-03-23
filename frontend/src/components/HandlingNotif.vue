<template>
	<transition  name="list-error"  mode="out-in" appear>
		<div class="errors-ctn"><span  :class="notifs.type">{{notifs.message}}<i class="bi bi-x" @click="removeNotif"></i></span></div>
	</transition>
</template>

<script>
export default {
	name:'HandlingNotif',
	props:{
		notifs : Object,
		removeNotif: Function
	},
	updated() {
		console.log('ok')
		const timer = setTimeout(()=>{
			
			this.$parent.removeNotif
		},2000)
		clearTimeout(timer)
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
			width:100%;
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

.list-error-enter-active, .list-error-leave-active {
	transition: all .5s ease-in;
}
.list-error-enter, .list-error-leave-to /* .list-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateX(30px);
}
</style>