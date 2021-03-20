<template>
	<div class="submit-project">
		<form>
			<PageTitle text="Soumettre un projet"/>

			<div class="submit-project__input-container">
				<BaseInput
					type="text"
					id="project-name"
					name="name"
					placeholder="Mon super projet"
					label="Nom"
					required
				/>
			</div>

			<div class="submit-project__input-container">
				<BaseTextarea
					id="project-description"
					name="description"
					placeholder="Ce projet a pour but..."
					label="Description"
				/>
			</div>

			<div class="submit-project__input-container">
				<BaseSelect
					id="project-license"
					name="license" 
					label="Licence"
					:items="licenses"
					required
				/>
			</div>

			<div class="submit-project__input-container">
				<BaseSelect
					id="project-categories"
					name="categories"
					label="Catégorie(s)"
					:items="categories"
					required
					multiple
				/>
			</div>

			<div class="submit-project__input-container">
				<BaseInput
					type="text"
					id="project-name"
					name="name"
					placeholder="Email, téléphone, etc..."
					label="Contact"
					required
				/>
			</div>

			<div class="submit-project__input-container">
				<div
					v-for="type, i in officialLinkTypes"
					:key="`link-${type.value}`"
					class="submit-project__input-container-sm"
				>
					<BaseInput
						type="text"
						:id="`project-${type.value}-link`"
						:name="`link-${type.value}`"
						:placeholder="type.example"
						:prefix="type.name"
						:label="i === 0 ? 'Liens officiels' : null"
					/>
				</div>
			</div>

			<div class="submit-project__input-container">
				<div class="submit-project__needed-profil">
					<BaseSelect
						id="project-needed-profil-type-0"
						name="needed-profil-type-0" 
						label="Profils recherchés"
						:items="profilTypes"
						allowSearch
					/>
					<BaseInput
						type="number"
						id="project-needed-profil-number-0"
						name="needed-profil-number-0"
						:min="0"
					/>
					<BaseSelect
						id="project-categories"
						name="categories"
						:items="null"
						allowSearch
						multiple
					/>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import BaseInput from '@/components/system/Input.vue'
import BaseSelect from '@/components/system/Select.vue'
import BaseTextarea from '@/components/system/Textarea.vue'
import { licenses, categories, officialLinkTypes } from '@/constants/project.js'
import { profilTypes } from '@/constants/contributor.js'

export default {
	name: 'SubmitProject',
	components: {
		PageTitle,
		BaseInput,
		BaseSelect,
		BaseTextarea
	},
	data() {
		return { licenses, categories, officialLinkTypes, profilTypes }
	}
}
</script>

<style lang="scss" scoped>
	form {
		max-width: 600px;
		margin: auto;
	}

	.submit-project {
		&__input-container {
			margin-bottom: 1rem;

			&-sm {
				margin-bottom: 3px;
			}
		}

		// &__needed-profil {

		// }
	}
</style>
