<template>
	<div class="entering-ctn">
		<transition name="form-change" mode="out-in">
			<AuthTemplate
				:key="status" 
				:inputs="status === 'in' ? signinInputs : signupInputs"
				:bottomMessage="status === 'in' ? `Tu n'as pas de compte ? Inscris-toi !` : `Déjà inscrit ? Connecte-toi !`"
				:typeOfAuth="`sign${status}`"
				@bottomMessageClicked="switchForm"
			/>
		</transition>
	</div>
</template>


<script>
import AuthTemplate from '@/components/AuthTemplate'

export default {
	name: 'Entering',
	components: {
		AuthTemplate,
	},
	data() {
		return {
			status: 'in',
			signinInputs: [
				{
					id: 'email',
					name: 'email',
					type: 'email',
					prefix: 'Email',
					placeholder: 'Saisir un email',
					required: true
				},
				{
					id: 'password',
					name: 'password',
					type: 'password',
					prefix: 'Mot de passe',
					placeholder: 'Saisir un mot de passe',
					required: true,
				}
			],
			signupInputs : [
				{
					id: 'name',
					name: 'name',
					prefix: 'Nom',
					placeholder: 'Saisir un nom',
					required: true
				},
				{
					id: 'email',
					name: 'email',
					type: 'email',
					prefix: 'Email',
					placeholder: 'Saisir un email',
					required: true
				},
				{
					id: 'password',
					name: 'password',
					type: 'password',
					prefix: 'Mot de passe',
					placeholder: 'Saisir un mot de passe',
					required: true,
				}
			]
		}
	},
	methods: {
		switchForm : function() {
			this.status = this.status === 'in' ? 'up' : 'in'
		}	
	}
}
</script>

<style lang="scss" scoped>
.entering-ctn{
	width:100%;
	height:100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.form-change-enter-active, .form-change-leave-active{
	transition: all .3s ease-in-out;
}

.form-change-enter, .form-change-leave-to{
	opacity:0
}
</style>