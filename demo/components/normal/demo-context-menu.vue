<template>
    <div class="demo-context-menu">
        <demo-row>
            <link-button :label="`event service:${val[0]}`" @contextmenu.prevent.native="useService"/>
            <link-button :label="`el service:${val[0]}`" @contextmenu.prevent.native="useService2($refs.button1.$el)" ref="button1"/>
            <link-button :label="`el service:${val[0]}`" @contextmenu.prevent.native="useService2($refs.button2.$el)" ref="button2"/>
        </demo-row>
        <demo-row title="多选">
            <link-button label="多选" @contextmenu.prevent.native="multiplePick" ref="button3"/>
            <div>
                {{val[1]}}
            </div>
        </demo-row>
    </div>
</template>

<script>
    import PlContextMenu from "../../../src/components/context-menu/pl-context-menu";

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
            async useService2(el) {
                const ret = await this.$contextMenu.pick({
                    data: ['西瓜', '南瓜', '冬瓜', '茄子', '豆角', '皮豆腐'],
                    el,
                    value: this.val[0],
                    height:null,
                })
                this.val[0] = ret
                this.$message.show(ret)
            },
            async multiplePick() {
                const ret = await this.$contextMenu.pick({
                    data: ['北京', '天津', '上海', '杭州', '南京', '无锡', '南昌', '广州', '南宁', '柳州', '防城港', '汕头', '厦门'],
                    el: this.$refs.button3.$el,
                    value: this.val[1],
                    multiple: true,
                })
                this.val[1] = ret
                this.$message.show(ret.toString())
            },
        }
    }
</script>

<style lang="scss">

</style>