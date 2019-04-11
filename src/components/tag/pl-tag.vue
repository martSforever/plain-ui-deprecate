<template>
    <div class="pl-tag" :class="classes">
        {{label}}
        <slot></slot>
        <pl-icon icon="pad-close" class="pl-tag-close"/>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-tag",
        components: {PlIcon},
        props: {
            label: {type: String},                                          //显示的文本

            boxType: {type: String, default: 'fill',},                      //盒子类型
            boxColor: {type: String, default: 'primary'},                   //盒子颜色
            boxShape: {type: String, default: 'none'},                      //盒子形状
            boxSize: {type: String, default: 'default'},                    //盒子大小
        },
        computed: {
            classes() {
                return [
                    `pl-tag-type-${this.boxType}`,
                    `pl-tag-color-${this.boxColor}`,
                    `pl-tag-shape-${this.boxShape}`,
                    `pl-tag-size-${this.boxSize}`,
                ]
            },
        }
    }
</script>