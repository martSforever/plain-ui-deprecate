<template>
    <pl-popover class="pl-cascade" :height="28*5" :width="null" disabled-equal trigger="none" v-model="p_show">
        <pl-input clear-icon="pl-double-arrow-down" @click="p_show = true" :value="p_tempValue.map(item=>item[labelKey]).join(',')"/>
        <div slot="popper" class="pl-cascade-popper">
            <pl-cascade-option :cascade-width="cascadeWidth"
                               :data="data"
                               :label-key="labelKey"
                               :children-key="childrenKey"
                               :value-key="valueKey"
                               :current="p_tempValue[0]"
                               @select="itemData => p_select(itemData,0)"/>
            <pl-cascade-option
                    v-for="(itemData,index) in p_tempValue"
                    :key="index"
                    :cascade-width="cascadeWidth"
                    :data="itemData[childrenKey]"
                    :label-key="labelKey"
                    :children-key="childrenKey"
                    :value-key="valueKey"
                    :current="p_tempValue[index+1]"
                    @select="val => p_select(val,index+1)"/>
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
            value: {type: Array, default: () => []},

            data: {type: Array, default: () => []},
            labelKey: {type: String, required: true},
            childrenKey: {type: String, required: true},
            valueKey: {type: String, required: true},
            cascadeWidth: {type: Number, default: 100},
        },
        data() {
            return {
                p_show: true,
                p_value: this.$plain.$utils.deepCopy(this.value),
                p_tempValue: this.$plain.$utils.deepCopy(this.value),
            }
        },
        methods: {
            p_select(itemData, optionPosition) {
                this.p_tempValue.splice(optionPosition, this.p_tempValue.length)
                this.p_tempValue.push(itemData)
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