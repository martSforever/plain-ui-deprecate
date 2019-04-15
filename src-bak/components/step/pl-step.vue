<template>
    <div class="pl-step" :class="classes">
        <pl-step-item v-for="(item,index) in data" :key="index"
                      :is-first="index === 0"
                      :is-last="index === data.length-1"
                      :vertical="vertical"
                      :active-index="currentValue"
                      :item-index="index"
                      :title="item.title"
                      :size="size"
                      :active-icon="item.activeIcon || activeIcon"
                      :active-color="item.activeColor || activeColor"
                      :inactive-icon="item.inactiveIcon || inactiveIcon"
                      :inactive-color="item.inactiveColor || inactiveColor">
            <slot :item="item" :index="index">
                <span class="pl-step-item-title">
                    {{item.title}}
                </span>
            </slot>
        </pl-step-item>
    </div>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";
    import PlStepItem from "./pl-step-item";

    export default {
        name: "pl-step",
        components: {PlStepItem},
        mixins: [ValueMixin],
        props: {
            data: {type: Array, default: () => [], required: true},             //渲染的数组数据
            size: {type: Number, default: 100},                                 //步骤的宽度（横向），高度（纵向）
            vertical: {type: Boolean},                                          //是否纵向
            activeIcon: {type: String, default: 'pl-circle-radio'},      //激活的时候的图标
            inactiveIcon: {type: String, default: 'pl-circle'},            //未激活的时候的图标
            activeColor: {type: String, default: '#02D173'},                    //激活的时候的颜色
            inactiveColor: {type: String, default: '#C4C5C8'},                  //未激活的时候的颜色
        },
        data() {
            return {}
        },
        computed: {
            classes() {
                return [
                    `pl-step-${!!this.vertical ? 'vertical' : 'horizontal'}`,   //
                ]
            },
        },
        methods: {},
    }
</script>