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
		<HandlingErrors v-if="errors.length !== 0" :errors="errors"/>
	</div>
</template>

<script>
import Axios from 'axios'
import BaseInput from '@/components/system/Input.vue'
import HandlingErrors from '@/components/HandlingErrors.vue'
import config from '@/config.js'

export default {
	name:'AuthTemplate',
	inheritAttrs: false,
	components:{
		BaseInput,
		HandlingErrors
	},
	data() {
		return {
			formData: {},
			errors: []
		}
	},
	props:{
		inputs: Array,
		bottomMessage: String,
		typeOfAuth: String,
	},
	methods:{
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

		removeError(i) {
			this.errors.splice(i, 1)
		},

		submitForm(e) {
			e.preventDefault()
			const self = this

			Axios.post(this.getActionURI, this.formData)
			.then(res => {
				console.log(res) // TODO
			})
			.catch(error => {
				if (error.response)
					self.errors = error.response.data
				else
					self.errors = [{message: 'Serveur injoignable'}]
			})
		},
	},
	computed:{
		getActionURI : function() {
			return `${config.API_URL}auth/${this.typeOfAuth}`
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