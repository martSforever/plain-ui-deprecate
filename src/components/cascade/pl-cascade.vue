<template>
    <pl-popover class="pl-cascade" :width="null" disabled-equal trigger="none" v-model="p_show">
        <pl-input clear-icon="pl-double-arrow-down" @click="p_show = true"/>
        <div slot="popper" class="pl-cascade-popper">
            <pl-cascade-option :cascade-width="cascadeWidth"
                               :data="data"
                               :label-key="labelKey"
                               :children-key="childrenKey"
                               :value-key="valueKey"
            />

            <!--<pl-cascade-item
                    v-for="(itemData,index) in p_tempValue"
                    :cascade-width="cascadeWidth"/>-->
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
    }
</script>

<style lang="scss">

</style>