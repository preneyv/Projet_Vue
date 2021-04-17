<template>
	<div class="error">
        <h1 class="error__code">404</h1>
		<h2 class="error__name">Page introuvable</h2>
        <p class="error__message">Vous ne trouverez pas de projet par ici... <a href="/projects">Essayez plutôt ici</a>.</p>
	</div>
</template>

<script>
export default {
	name: "PageNotFound"
};
</script>

<style lang="scss" scoped>
.error {
    padding: 0 10vw;

    &__code {
        font-size: space(25);
        line-height: space(20);
        margin-top: 4rem;
    }

    &__name {
        font-size: space(10);
    }

    &__message {
        margin-top: 2rem;

        & > a {
            color: var(--color-primary);

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>