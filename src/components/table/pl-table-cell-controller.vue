<template>
    <tr class="pl-table-cell-controller" :is="tag">
        <slot></slot>
    </tr>
</template>

<script>
    export default {
        name: "pl-table-cell-controller",
        props: {
            tag: {type: String, default: 'tr'},             //controller的dom标签
            defaultEditing: {type: Boolean},                //controller内的cell默认是否默认可编辑
            editable: {},                                   //不为null时，controller内的cell的editable使用controller的editable
            required: {},                                   //不为null时，controller内的cell的required使用controller的required
        },
        watch: {
            editable(val) {
                this.$nextTick(() => this.items.forEach(item => item.controllerEditable = val))
            },
            required(val) {
                this.$nextTick(() => this.items.forEach(item => item.controllerRequired = val))
            },
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
                item.controllerEditable = this.editable
                item.controllerRequired = this.required
                this.$emit('itemsChange', this.items)
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
                let col = null;

                this.items.forEach(item => {
                    const inputs = this.$plain.$dom.findComponentsDownward(item, 'link-input')
                    inputs.forEach(input => {
                        if (!flag) return
                        if (!input.validate()) {
                            flag = false
                            validateMsg = input.validateMsg
                            field = item.field
                            col = item.col
                        }
                    })
                })

                return {flag, field, validateMsg, col}
            },
        }
    }
</script>

<style lang="scss">

</style>
