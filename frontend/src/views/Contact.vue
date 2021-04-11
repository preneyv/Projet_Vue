<template>
	<div class="container">
		<h1 class="h-1">Contactez-nous</h1>
		<form @submit.prevent="submitContact">
			<BaseInput v-for="input in contactInputs" :key="input.id" v-bind="input" />
			<div class="form-textarea">
				<label for="message">Ecrivez votre message</label>
				<textarea name="message" id="message" v-model="message" rows="10"></textarea>
			</div>
			<button type="submit" class="btn btn-primary">Envoyer</button>
			<span class="error">{{result}}</span>
		</form>
	</div>
</template>

<script>
import api from "@/config/api";
import BaseInput from "@/components/system/Input.vue";

export default {
	name: "Contact",
	data() {
		return {
			result: null,
			message: null,
			contactInputs: [
				{
					id: "name",
					name: "name",
					prefix: "Nom",
					placeholder: "Saisir un nom",
					required: true
				},
				{
					id: "email",
					name: "email",
					type: "email",
					prefix: "Email",
					placeholder: "Saisir un email",
					required: true
				}
			]
		};
	},
	components: {
		BaseInput
	},
	methods: {
		async submitContact(e) {
			const data = {
				name: e.target.querySelector("input[name=name]").value,
				email: e.target.querySelector("input[name=email]").value,
				message: this.message
			};
			const res = await api.post("/contact", data);
			this.result = res.data.result;
		}
	}
};
</script>


<style lang="scss" scoped>
h1 {
	text-align: center;
	margin-bottom: space(12);
}

.error {
	display: block;
	@extend %mx-auto;
}

form {
	@extend %mx-auto;
	max-width: space(150);
	margin-bottom: space(12);
	@include flex($direction: column, $justify: flex-start, $align: stretch);

	& > * + * {
		margin-top: space(4);
	}

	button[type="submit"] {
		@extend %mx-auto;
	}

	textarea {
		width: 100%;
		font: inherit;
		border: 1px solid lighten(#252525, 15);
		background: transparent;
		color: map-get($colors, "white");
		padding: space(3);
	}
}

.form-textarea {
	textarea {
		margin-top: space(2);
	}
}
</style>