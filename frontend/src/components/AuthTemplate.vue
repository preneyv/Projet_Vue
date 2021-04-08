<template>
	<div class="main-ctn">
		<div class="log-ctn">
			<div class="logo"><img src="../assets/logo.png" width="73"></div>
			<form>
				<BaseInput
					v-for="input in inputs"
					:key="input.id"
					v-bind="input"
					:onInput="updateFormData"
				/>

				<input
					type="submit"
					id="submit"
					name="submit"
					@click="submitForm"
					:value="typeOfAuth === 'signin' ? 'Se connecter' : `S'inscrire`"
				/>
			</form>
			<span @click="triggerBottomMessageClicked" class="switch-form">{{ bottomMessage }}</span>  
		</div>
		<HandlingNotif v-if="error" :notifs="error" :removeNotif="removeError"/>
	</div>
</template>

<script>
//Components Import
import BaseInput from '@/components/system/Input.vue'
import HandlingNotif from '@/components/HandlingNotif.vue'

//Files Import
import AuthService from '@/services/auth.js'

export default {
	name: 'AuthTemplate',
	inheritAttrs: false,
	components: {
		BaseInput,
		HandlingNotif
	},
	props: {
		inputs: Array,
		bottomMessage: String,
		typeOfAuth: String,
	},
	data() {
		return {
			formData: {},
			error: null
		}
	},
	methods: {
		triggerBottomMessageClicked() {     
			this.$emit('bottomMessageClicked') 
		},

		insertIntoDataStore({id, value}) {
			this.formData[id] = value
		},

		updateFormData(e) {
			this.insertIntoDataStore({
				id: e.target.id,
				value: e.target.value
			})
		},

		removeError() {
			this.error = null
		},

		submitForm(e) {
			e.preventDefault()
			const data = this.formData

			if (this.typeOfAuth === "signin") {
				AuthService.signin(
					data.email,
					data.password
				)
				.then(this.handleSuccess)
				.catch(error => this.handleError(error))
			}
			else {
				AuthService.signup(
					data.name,
					data.email,
					data.password,
					data.externals
				)
				.then(this.handleSuccess)
				.catch(error => this.handleError(error))
			}
		},

		handleError(error) {
			this.error = { type: "error" }
			this.error.message = error.response?.data?.message || "Erreur serveur"
		},

		handleSuccess() {
			this.$router.push("/account")
			window.location.reload()
		}
	}
}
</script>

<style lang="scss" scoped>
.main-ctn {
	width:max-content;
	height: fit-content;
	min-width: 400px;
}

.log-ctn {
	width:auto;
	padding: 12px;
	background-color: #252525;
	border-radius:5px;
	height: fit-content;
}

.logo {
	width: auto;
	display: flex;
	justify-content: center;
	margin-bottom: 55px;
}

form {
	@include flex(column, flex-start, stretch);
	gap: 16px;
	margin-bottom: 15px;
}

input[type=submit] {
    border: none;
    @include btn_component(1,5,4);
    margin: 10px auto;
    &:hover{
        cursor: pointer;
    }
}


.switch-form {
	margin-top: 10px;
	width: 100%;
	display: block;
	text-align: center;
	font-size:var(--font-base);

	&:hover {
		text-decoration: underline;
		cursor: pointer;
	}
}
</style>