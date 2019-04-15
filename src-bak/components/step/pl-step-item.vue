<template>
    <div class="pl-step-item" :style="styles" :class="classes">
        <div class="pl-step-item-content">
            <div class="pl-step-item-icon">
                <div class="pl-step-item-line pl-step-item-line-left" :style="leftLineStyles"></div>
                <pl-radio
                        :value="activeIndex!=null && activeIndex>=itemIndex"
                        class="pl-step-item-radio"
                        readonly
                        :active-icon="activeIcon"
                        :inactive-icon="inactiveIcon"/>
                <div class="pl-step-item-line pl-step-item-line-right" :style="rightLineStyles"></div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import PlRadio from "../radio/pl-radio";

    export default {
        name: "pl-step-item",
        components: {PlRadio},
        props: {
            title: {type: String},                          //步骤标题
            vertical: {type: Boolean},                      //是否纵向
            activeIndex: {type: Number},                    //激活的索引
            itemIndex: {type: Number},                      //未激活的索引
            size: {type: Number},                           //步骤宽度（横向），高度（纵向）
            activeIcon: {type: String},                     //激活的图标
            inactiveIcon: {type: String},                   //未激活的图标
            activeColor: {type: String},                    //激活的时候的颜色
            inactiveColor: {type: String},                  //未激活的时候的颜色

            isFirst: {type: Boolean},                       //是否为第一个步骤
            isLast: {type: Boolean},                        //是否为最后一个步骤
        },
        computed: {
            styles() {
                return {
                    [!!this.vertical ? 'height' : 'width']: this.$plain.$utils.unit(this.size),
                    color: this.activeIndex != null && this.activeIndex >= this.itemIndex ? this.activeColor : this.inactiveColor
                }
            },
            leftLineStyles() {
                return {
                    backgroundColor: this.activeIndex != null && this.activeIndex >= this.itemIndex ? this.activeColor : this.inactiveColor
                }
            },
            rightLineStyles() {
                return {
                    backgroundColor: this.activeIndex != null && this.activeIndex > this.itemIndex ? this.activeColor : this.inactiveColor
                }
            },
            classes() {
                return {
                    'pl-item-first': !!this.isFirst,
                    'pl-item-last': !!this.isLast,

                }
            },
        }

    }
</script>