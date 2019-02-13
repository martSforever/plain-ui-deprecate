<template>
    <pl-radio
            :color="color"
            :size="size"
            :label="label"
            is-check-all-radio id="PL-CHECK-ALL"
            :inactive-icon="p_activeIcon"
            :active-icon="p_activeIcon"
            class="pl-check-all"
            @click="$emit('click')"
    />
</template>

<script>
    import PlRadio from "./pl-radio";

    export default {
        name: "pl-check-all",
        components: {PlRadio},
        props: {
            color: {type: String,},                             //颜色：primary|success|warn|error|info
            size: {type: String,},                              //大小：large|default|small
            label: {type: String, default: '全选'},              //文本
            status: {type: String, default: 'none'},            //当前全选状态
        },
        data() {
            return {
                STATUS: {
                    'all': 'pl-check-square',
                    'some': 'pl-square-minus',
                    'none': 'pl-square',
                },
            }
        },
        computed: {
            p_activeIcon() {
                return this.STATUS[this.status]
            },
        },
        methods: {}
    }
</script>

<style lang="scss">

</style>