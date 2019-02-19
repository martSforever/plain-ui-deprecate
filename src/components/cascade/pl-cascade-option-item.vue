<template>
    <div class="pl-cascade-option-item" @click="p_click">
        <span class="pl-cascade-option-item-label">{{data[labelKey]}}</span>
        <pl-icon class="pl-cascade-option-item-icon" icon="pl-arrow-right-light" v-if="p_hasChildren"/>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-cascade-option-item",
        components: {PlIcon},
        props: {
            data: {},
            labelKey: {type: String},
            childrenKey: {type: String},
            valueKey: {type: String, required: true},
            disabledKey: {type: String},
            current: {required: true},
        },
        computed: {
            classes() {
                return {
                    'pl-cascade-option-item-active': this.p_isSelected,
                    'pl-cascade-option-item-disabled': !!this.disabledKey && this.data[this.disabledKey]
                }
            },
            p_isSelected() {
                if (!this.current) return false
                return this.data[this.valueKey] === this.current[this.valueKey]
            },
            p_hasChildren() {
                return this.data[this.childrenKey] && this.data[this.childrenKey].length > 0
            },
        },
        methods: {
            p_click() {
                this.$emit('click', this)
            },
        }
    }
</script>

<style lang="scss">

</style>