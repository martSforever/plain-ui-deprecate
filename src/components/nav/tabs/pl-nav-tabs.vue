<template>
    <div class="pl-nav-tabs">
        <pl-nav-tabs-header :list="list" @click="p_remove"/>
        <div>
            <link-button @click="p_add">add</link-button>
        </div>
    </div>
</template>

<script>
    import PlNavTabsHeader from "../tabs-header/pl-nav-tabs-header";

    export default {
        name: "pl-nav-tabs",
        components: {PlNavTabsHeader},
        data() {
            const list = []
            for (let i = 0; i < 5; i++) {
                list.push(this.$plain.$utils.uuid())
            }
            return {
                list
            }
        },
        methods: {
            p_add() {
                this.list.push(this.$plain.$utils.uuid())
            },
            p_remove({item, index}) {
                this.list.splice(index, 1)
            },


        }
    }
</script>

<style lang="scss">
    .pl-nav-tabs {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
</style>