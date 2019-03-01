<template>
    <div class="demo-context-menu">
        <demo-row>
            <link-button label="open"/>
            <!--<pl-context-menu/>-->
        </demo-row>
        <demo-row>
            <link-button label="service" @click="useService"/>
        </demo-row>
    </div>
</template>

<script>
    import PlContextMenu from "../../src/components/context-menu/pl-context-menu";

    export default {
        name: "demo-context-menu",
        components: {PlContextMenu},
        methods: {
            useService(e) {
                this.$contextMenu.pick({
                    data: ['西瓜', '南瓜', '冬瓜', '茄子', '豆角', '皮豆腐'],
                    target: e.target
                })
            },
        }
    }
</script>

<style lang="scss">

</style>