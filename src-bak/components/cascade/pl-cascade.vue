<template>
    <pl-popover class="pl-cascade" :height="28*5" :width="null" disabled-equal v-model="p_show" @hide="p_hide">
        <pl-input :clear-icon="p_suffixIcon" :value="p_showLabel" :defaultClear="false" @clear="p_clear"/>
        <div slot="popper" class="pl-cascade-popper">
            <pl-cascade-option :cascade-width="cascadeWidth"
                               :data="data"
                               :label-key="labelKey"
                               :children-key="childrenKey"
                               :value-key="valueKey"
                               :disabled-key="disabledKey"
                               :current="p_tempValue[0]"
                               :load-data-func="loadDataFunc"
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
                    :load-data-func="loadDataFunc"
                    @select="itemData => p_select(itemData,index+1)"
                    @done="itemData => p_done(itemData)"/>
        </div>
    </pl-popover>

</template>

<script>
    import PlPopover from "../popper/pl-popover";
    import PlInput from "../input/pl-input";
    import PlCascadeOption from "./pl-cascade-option";
    import {CascadeMixin} from "./index";

    export default {
        name: "pl-cascade",
        components: {PlCascadeOption, PlInput, PlPopover},
        mixins: [CascadeMixin],
        props: {
            value: {type: Array, default: () => []},                                //双向绑定的数据
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
            p_suffixIcon() {
                return this.p_show ? 'pad-doubleup' : 'pad-doubledown'
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