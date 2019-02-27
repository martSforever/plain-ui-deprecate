<template>
    <div class="pl-time-spin">
        <pl-scroll-option :data="data" label-key="val" value-key="val" disabled-key="disabled" :width="width" v-model="currentValue" :shadow="false"/>
    </div>
</template>

<script>
    import PlScrollOption from "../scroll-option/pl-scroll-option";
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-time-spin",
        components: {PlScrollOption},
        mixins: [ValueMixin],
        props: {
            num: {type: Number,},
            width: {},
        },
        data() {
            return {}
        },
        computed: {
            data() {
                const ret = []
                let i = 0
                while (i < this.num) {
                    ret.push({
                        val: i,
                        disabled: false,
                    })
                    i++
                }
                return ret
            },
        },
        methods: {}
    }
</script>

<style lang="scss">

</style>