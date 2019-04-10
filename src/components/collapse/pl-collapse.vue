<template>
    <div class="pl-collapse" :class="{'pl-collapse-active':currentValue}">
        <div class="pl-collapse-head" @click="p_click">
            <slot name="head">
                <span v-if="!!title">{{title}}</span>
            </slot>
            <div class="pl-collapse-head-icon-wrapper" v-if="!noIcon">
                <pl-icon icon="pad-down" :color="iconColor"/>
            </div>
        </div>
        <pl-collapse-transition>
            <div class="pl-collapse-body" v-show="currentValue">
                <slot>
                    BODY
                </slot>
            </div>
        </pl-collapse-transition>
    </div>
</template>

<script>


    import PlCollapseTransition from "./pl-collapse-transition";
    import PlIcon from "../icon/pl-icon";
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: 'pl-collapse',
        components: {
            PlIcon,
            PlCollapseTransition
        },
        mixins: [ValueMixin],
        props: {
            title: {},
            value: {type: Boolean},
            noIcon: {type: Boolean},
            iconColor: {type: String},
            disabledClickHead: {type: Boolean},
        },
        data() {
            return {
                p_group: null,
            };
        },
        methods: {
            p_click() {
                this.$emit('clickHead')
                if (this.disabledClickHead) return
                if (!!this.p_group) this.p_group.p_click(this.currentValue, this)
                this.currentValue = !this.currentValue;
            },
        },
        mounted() {
            this.p_group = this.$plain.$dom.findComponentUpward(this, 'pl-collapse-p_group');
            if (!!this.p_group) this.p_group.p_add(this)
        },
        beforeDestroy() {
            if (!!this.p_group) this.p_group.p_remove(this)
        },
    };
</script>