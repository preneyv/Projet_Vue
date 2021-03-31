<template>
	<div class="submit-project">
		<form>
			<PageTitle text="Soumettre un projet"/>

			<h2 class="submit-project__form-section-title">Informations générales</h2>

			<div class="submit-project__input-container">
				<BaseInput
					type="text"
					id="project-name"
					name="name"
					placeholder="Mon super projet"
					label="Nom"
					required
					:error="errors.title"
					@input="e => formData.title = e.target.value"
				/>
			</div>

			<div class="submit-project__input-container">
				<BaseInput
					type="text"
					id="project-sumup"
					name="sumup"
					placeholder="Court aperçu du projet"
					label="Résumé"
					required
					:error="errors.sumup"
					@input="e => formData.sumup = e.target.value"
				/>
			</div>

			<div class="submit-project__input-container">
				<BaseTextarea
					id="project-description"
					name="description"
					placeholder="Ce projet a pour but..."
					label="Description"
					@input="e => formData.description = e.target.value"
				/>
			</div>

			<div class="submit-project__input-container">
				<BaseSelect
					id="project-license"
					name="license" 
					label="Licence"
					:items="licenses"
					required
					:error="errors.license"
					@change="e => formData.licence = e.target.value"
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
					:error="errors.tags"
					@change="e => formData.tags = e.target.getValues()"
				/>
			</div>

			<div class="submit-project__input-container">
				<BaseInput
					type="text"
					id="project-contact"
					name="contact"
					placeholder="Email, téléphone, etc..."
					label="Contact"
					required
					:error="errors.contact"
					@input="e => formData.contact = e.target.value"
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
						@input="e => formData.links[type.value] = e.target.value"
					/>
				</div>
			</div>

			<h2 class="submit-project__form-section-title">Profils recherchés</h2>

			<div class="submit-project__input-container">
				<span v-if="errors.jobs" class="submit-project__profils-error">{{ errors.jobs }}</span>

				<div
					v-for="profil, i in formData.jobs"
					:key="profil"
					class="submit-project__needed-profil">

					<font-awesome-icon
						icon="times"
						class="submit-project__needed-profil__close-btn"
						@click="() => removeProfil(profil)"
					/>

					<h3 class="submit-project__form-section-subtitle">Profil n°{{ i + 1 }}</h3>

					<BaseInput
						type="number"
						label="Nombre de postes"
						:id="`project-needed-profil-number-${i}`"
						:name="`needed-profil-number-${i}`" 
						:min="1"
						:value="`${profil.requiredNb}`"
						@input="e => profil.requiredNb = parseInt(e.target.value)"
						required
					/>
					<BaseSelect
						label="Type de poste"
						:id="`project-needed-profil-type-${i}`"
						:name="`needed-profil-type-${i}`"
						:items="profilTypesForSelect"
						:initialValue="profilTypes[profil.type] || null"
						@change="e => profil.type = e.target.value"
						allowSearch
						required
					/>
					<BaseSelect
						label="Compétences recherchées"
						:id="`project-needed-profil-skills-${i}`"
						:name="`needed-profil-skills-${i}`" 
						:items="profilTypes[profil.type]?.skills || []"
						:initialValue="profil.skillsNeeded"
						@change="e => profil.skillsNeeded = e.target.getValues()"
						allowSearch
						multiple
						required
					/>
				</div>
				<div class="submit-project__add-profil-btn-container">
					<button type="button" class="btn btn-primary" @click="addProfil">Ajouter un profil</button>
				</div>
			</div>
			<div class="submit-project__sumbit-btn-container">
				<button type="submit" class="btn btn-secondary submit-project__btn-submit" @click="submitForm">Terminer</button>
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
import ProjectsService from '@/services/projects.js'

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
			formData: {
				title: null,
				sumup: null,
				description: null,
				licence: null,
				tags: [],
				contact: null,
				links: {},
				jobs: []
			},
			errors: {
				title: null,
				sumup: null,
				license: null,
				tags: null,
				contact: null,
				jobs: null
			}
		}
	},
	methods: {
		addProfil() {
			this.formData.jobs.push({
				type: 'developer',
				requiredNb: 1,
				skillsNeeded: []
			})
		},

		removeProfil(profil) {
			this.formData.jobs = [...this.formData.jobs.filter(job => job !== profil)]
		},

		validateForm() {
			const data = this.formData
			this.errors.title = !data.title?.trim() ? "Nom obligatoire" : null
			this.errors.sumup = !data.sumup?.trim() ? "Résumé obligatoire" : null
			this.errors.license = !data.licence ? "Veuillez choisir une licence" : null
			this.errors.tags = data.tags.length === 0 ? "Veuillez sélectionner au moins 1 catégorie" : null
			this.errors.contact = !data.contact?.trim() ? "Veuillez renseigner un moyen de contact" : null

			data.jobs.every(job => {
				if (!job.type || !job.requiredNb || job.requiredNb < 1 || job.skillsNeeded.length === 0) {
					this.errors.jobs = "Veuillez compléter tous les champs de tous les profils"
					return false
				}

				this.errors.jobs = null
			});
		},

		hasErrors() {
			const errors = Object.keys(this.errors).filter(key => this.errors[key] !== 0)
			return errors.length !== 0
		},

		submitForm(e) {
			e.preventDefault()
			this.validateForm()

			if (!this.hasErrors()) {
				ProjectsService.createProject(this.formData)
					.then(res => window.location.href = `/project/${res._id}`)
			}
		}
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

		&__form-section-title {
			font-size: 1.5rem;
		}

		&__form-section-subtitle {
			font-size: 1.25rem;
		}

		&__profils-error {
			color: var(--color-error);
			font-size: 12px;
		}

		&__needed-profil {
			background-color: rgba(255, 255, 255, 0.06);
			padding: 1rem;
			margin-top: 1rem;

			& > div {
				margin-top: 1rem;
			}

			&__close-btn {
				float: right;
				cursor: pointer;
			}
		}

		&__add-profil-btn-container {
			margin-top: 1rem;
		}

		&__btn-submit {
			margin: auto;
		}
	}
</style>
