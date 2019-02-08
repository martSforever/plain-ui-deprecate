<template>
    <div class="demo-progress">
        <demo-row>
            <link-progress :value="val1" ref="progress"/>
            <div>
                <link-button @click="val1+=0.1">add</link-button>
                <link-button @click="val1-=0.1">subtract</link-button>
                <link-button @click="$refs.progress.changeStatus('error')">error</link-button>
                <link-button @click="$refs.progress.changeStatus('normal')">normal</link-button>
            </div>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-progress",
        data() {
            return {
                val1: 0.4
            }
        },
    }
</script>

<style lang="scss">

</style>