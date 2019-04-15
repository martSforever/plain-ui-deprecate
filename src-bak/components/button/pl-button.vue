<template>
    <pl-box class="pl-button"
            v-bind="boxBinding"
            @click="e=>$emit('click',e)"
            :class="{
                'pl-button-active':active,
            }">
        <slot>
            {{label}}
        </slot>
    </pl-box>
</template>

<script>
    import PlBox from "../box/pl-box";
    import {BoxMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-button",
        components: {PlBox},
        mixins: [BoxMixin],
        props: {
            width: {default: null},                         //默认宽度自动撑开

            label: {},                                      //按钮显示的文本
            active: {type: Boolean},                        //按钮是否处于激活状态

            loadingType: {default: 'default'},
        },
    }
</script>