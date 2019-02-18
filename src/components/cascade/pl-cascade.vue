<template>
    <pl-popover class="pl-cascade" :height="28*5" :width="null" disabled-equal trigger="none" v-model="p_show" @hide="p_hide">
        <pl-input clear-icon="pl-double-arrow-down" @click="p_show = true" :value="p_showLabel" :defaultClear="false" @clear="p_clear"/>
        <div slot="popper" class="pl-cascade-popper">
            <pl-cascade-option :cascade-width="cascadeWidth"
                               :data="data"
                               :label-key="labelKey"
                               :children-key="childrenKey"
                               :value-key="valueKey"
                               :current="p_tempValue[0]"
                               @select="itemData => p_select(itemData,0)"
                               @done="itemData => p_done(itemData)"/>
            <pl-cascade-option
                    v-for="(item,index) in p_tempValue"
                    :key="index"
                    :cascade-width="cascadeWidth"
                    :data="item[childrenKey]"
                    :label-key="labelKey"
                    :children-key="childrenKey"
                    :value-key="valueKey"
                    :disabled-key="disabledKey"
                    :current="p_tempValue[index+1]"
                    @select="itemData => p_select(itemData,index+1)"
                    @done="itemData => p_done(itemData)"/>
        </div>
    </pl-popover>

</template>

<script>
    import PlPopover from "../popper/pl-popover";
    import PlInput from "../input/pl-input";
    import PlCascadeOption from "./pl-cascade-option";

    export default {
        name: "pl-cascade",
        components: {PlCascadeOption, PlInput, PlPopover},
        props: {
            value: {type: Array, default: () => []},                                //双向绑定的数据

            data: {type: Array, default: () => []},                                 //显示的数据
            labelKey: {type: String, required: true},                               //显示文本的key
            childrenKey: {type: String, required: true},                            //子数据key
            valueKey: {type: String, required: true},                               //节点唯一标识的key
            disabledKey: {type: String},                                            //节点是否禁用key
            cascadeWidth: {type: Number, default: 100},                             //每列级联选择的宽度

            showAllLevels: {type: Boolean, default: true},                          //显示所有选中的文本，false的话，只会显示最后一级的文本
            changeOnSelect: {type: Boolean,},                                       //在选中的时候就改变值，默认是选中最后一级的时候才改变值

        },
        data() {
            return {
                p_show: false,
                p_value: this.$plain.$utils.deepCopy(this.value),
                p_tempValue: this.$plain.$utils.deepCopy(this.value),
            }
        },
        computed: {
            p_showLabel() {
                let array = this.p_value
                if (!array || array.length === 0) return
                if (this.showAllLevels) {
                    return array.map(item => item[this.labelKey]).join(',')
                } else {
                    return array[array.length - 1][this.labelKey]
                }
            },
        },
        methods: {
            p_select(itemData, optionPosition) {
                this.p_tempValue.splice(optionPosition, this.p_tempValue.length)
                this.p_tempValue.push(itemData)
                if (!!this.changeOnSelect) this.p_value = this.$plain.$utils.deepCopy(this.p_tempValue)
            },
            p_done() {
                this.$nextTick(() => {
                    this.p_value = this.$plain.$utils.deepCopy(this.p_tempValue)
                    this.p_show = false
                })
            },
            p_hide() {
                this.p_tempValue = this.$plain.$utils.deepCopy(this.p_value)
            },
            p_clear() {
                this.p_tempValue = []
                this.p_value = []
            },
        }
    }
</script>

<style lang="scss">
    .pl-cascade-popper {
        height: 100%;
        .pl-cascade-option {
            &:not(:last-child) {
                border-right: solid 1px #f2f2f2;
            }
        }
    }
</style>