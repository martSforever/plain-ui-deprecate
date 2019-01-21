<template>
    <div class="lv-message-item"
         :class="[`lv-message-item-color-${TYPE[type].color}`]" @click="()=>!!click && click()">
        <lv-icon :icon="TYPE[type].icon"/>
        {{text}}
    </div>
</template>

<script>

    import {TYPE} from "../../index";
    import LvIcon from "../icon/lv-icon";

    export default {
        name: "lv-message-item",
        components: {LvIcon},
        props: {
            text: {type: String},
            type: {type: String},
            time: {type: Number},
            done: {type: Function},
            click: {type: Function},
        },
        created() {
            if (this.time !== null) this.timer = setTimeout(() => {
                this.$emit('done',)
                !!this.done && (this.done())
            }, this.time)
        },
        data() {
            return {
                TYPE,
                timer: null,
            }
        },
    }
</script>

<style lang="scss">
    .lv-message-item {
        @include public-style;
        padding: 6px 12px;
        white-space: nowrap;
        @each $key, $value in $list-color {
            &.lv-message-item-color-#{$key} {
                background-color: rgba($value, 0.8);
                color: white;
            }
        }
    }
</style>