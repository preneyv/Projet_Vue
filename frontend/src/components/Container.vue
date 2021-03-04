<template>
    <div class="container">
       <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Container"
}
</script>

<style lang="scss" scoped>
.container {
    padding: 0 10vw;
}
</style>
