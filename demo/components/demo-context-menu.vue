<template>
    <div class="demo-context-menu">
        <demo-row>
            <link-button label="open"/>
            <!--<pl-context-menu/>-->
        </demo-row>
        <demo-row>
            <link-button :label="`event service:${val[0]}`" @contextmenu.prevent.native="useService"/>
            <link-button :label="`el service:${val[0]}`" @contextmenu.prevent.native="useService2" ref="button"/>
        </demo-row>
    </div>
</template>

<script>
    import PlContextMenu from "../../src/components/context-menu/pl-context-menu";

    export default {
        name: "demo-context-menu",
        components: {PlContextMenu},
        data() {
            return {
                val: {
                    0: '',
                },
            }
        },
        methods: {
            async useService(e) {
                const ret = await this.$contextMenu.pick({
                    data: ['西瓜', '南瓜', '冬瓜', '茄子', '豆角', '皮豆腐'],
                    event: e,
                    value: this.val[0],
                })
                this.val[0] = ret
                this.$message.show(ret)
            },
            async useService2() {
                const ret = await this.$contextMenu.pick({
                    data: ['西瓜', '南瓜', '冬瓜', '茄子', '豆角', '皮豆腐'],
                    el: this.$refs.button.$el,
                    value: this.val[0],
                })
                this.val[0] = ret
                this.$message.show(ret)
            },
        }
    }
</script>

<style lang="scss">

</style>