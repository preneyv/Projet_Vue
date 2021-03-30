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
				<div
					v-for="profil, i in neededProfils"
					:key="i"
					class="submit-project__needed-profil">
					<BaseSelect
						:id="`project-needed-profil-type-${i}`"
						:name="`needed-profil-type-${i}`" 
						label="Profils recherchés"
						:items="profilTypesForSelect"
						:value="profilTypes[profil.type] || null"
						@change="e =>handleProfilTypeChange(e, i)"
						allowSearch
					/>
					<BaseInput
						type="number"
						:id="`project-needed-profil-number-${i}`"
						:name="`needed-profil-number-${i}`" 
						:min="0"
					/>
					<BaseSelect
						:id="`project-needed-profil-skills-${i}`"
						:name="`needed-profil-skills-${i}`" 
						:items="profilTypes[profil.type]?.skills || []"
						allowSearch
						multiple
					/>
				</div>
				<button type="button" @click="addProfil">Ajouter un profil</button>
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
		return {
			licenses,
			categories,
			officialLinkTypes,
			profilTypes,
			profilTypesForSelect: Object.keys(profilTypes).map(key => ({ value: key, ...profilTypes[key] })),
			neededProfils: []
		}
	},
	methods: {
		addProfil() {
			this.neededProfils.push({
				type: 'developer',
				number: 0,
				skills: []
			})
		},
		handleProfilTypeChange(e, index) {
			console.log(e.target.value, index)
			this.neededProfils[index].type = e.target.value
		}
	},
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
