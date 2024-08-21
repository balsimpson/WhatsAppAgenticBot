<template>
	<div class="w-full max-w-2xl p-4 mx-auto">
		<ContentDoc path="/help" class="prose prose-h1:pb-0"/>
	</div>
</template>

<style>
.prose :where(h1):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
    font-weight: 800;
    font-size: 2.25em;
    margin-top: 0;
    margin-bottom: 0.5em;
}

.prose :where(a):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
	margin-bottom: 0.5em;
	margin-top: 1em;
    text-decoration: none;
    font-weight: 500;
}

.prose :where(h2):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
    color: var(--tw-prose-headings);
    font-weight: 700;
    font-size: 1.5em;
    margin-top: 2em;
    margin-bottom: 0.5em;
    line-height: 1.3333333;
}

.prose h3 {
	margin-bottom: 0.5em;
	margin-top: 1em;
	text-decoration: none;
}

</style>