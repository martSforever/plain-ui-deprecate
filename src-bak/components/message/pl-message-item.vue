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