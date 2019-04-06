<template>
    <div class="pl-message-item"
         :class="[`pl-message-item-color-${TYPE[type].color}`]" @click="()=>!!click && click()">
        <pl-icon :icon="TYPE[type].icon"/>
        {{text}}
    </div>
</template>

<script>

    import {TYPE} from "../../index";
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-message-item",
        components: {PlIcon},
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
    .pl-message-item {
        @include public-style;
        padding: 6px 12px;
        white-space: nowrap;
        @each $key, $value in $list-color {
            &.pl-message-item-color-#{$key} {
                background-color: $value;
                color: white;
            }
        }
        &.pl-message-item-color-black {
            background-color: rgba(black, 0.75);
            color: white;
            box-shadow: 0 0 15px 1px #999;
        }
        &.pl-message-item-color-white {
            background-color: white;
            color: var(--p-color-normal-content);
            box-shadow: 0 0 15px 3px #ddd;
        }
    }
</style>