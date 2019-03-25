<template>
    <tr class="pl-table-cell-controller" :is="tag">
        <slot></slot>
    </tr>
</template>

<script>
    export default {
        name: "pl-table-cell-controller",
        props: {
            tag: {type: String, default: 'tr'},
            defaultEditing: {type: Boolean},
        },
        data() {
            return {
                items: [],
            }
        },
        methods: {
            /**
             * 添加子编辑组件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_add(item) {
                this.items.push(item)
                !!this.defaultEditing && item.enableEdit()
            },
            /**
             * 不添加子编辑组件
             * @author  韦胜健
             * @date    2019/1/8 10:23
             */
            p_remove(item) {
                this.$plain.$utils.removeFromArray(this.items, item)
            },


            /**
             * 开启编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            async enableEdit() {
                this.items.forEach(item => item.enableEdit())
                await this.$nextTick()
                window.getSelection().empty()
            },
            /**
             * 关闭编辑状态
             * @author  韦胜健
             * @date    2019/1/8 10:24
             */
            disableEdit() {
                this.items.forEach(item => item.disableEdit())
            },
            /**
             * 校验
             * @author  韦胜健
             * @date    2019/1/14 16:52
             */
            validate() {
                // TODO 这里校验规则需要修正
                let flag = true                     //输入是否通过标识
                let validateMsg = null;             //输入不通过提示信息
                let field = null;                   //输入不通过字段

                this.items.forEach(item => {
                    const inputs = this.$plain.$dom.findComponentsDownward(item, 'link-input')
                    inputs.forEach(input => {
                        if (!flag) return
                        if (!input.validate()) {
                            flag = false
                            validateMsg = input.validateMsg
                            field = item.field
                        }
                    })
                })

                return {flag, field, validateMsg}
            },
        }
    }
</script>

<style lang="scss">

</style>