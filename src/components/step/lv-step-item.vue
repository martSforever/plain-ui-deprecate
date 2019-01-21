<template>
    <div class="lv-step-item" :style="styles" :class="classes">
        <div class="lv-step-item-content">
            <div class="lv-step-item-icon">
                <div class="lv-step-item-line lv-step-item-line-left" :style="leftLineStyles"></div>
                <lv-radio
                        :value="activeIndex!=null && activeIndex>=itemIndex"
                        class="lv-step-item-radio"
                        readonly
                        :active-icon="activeIcon"
                        :inactive-icon="inactiveIcon"/>
                <div class="lv-step-item-line lv-step-item-line-right" :style="rightLineStyles"></div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import LvRadio from "../radio/lv-radio";

    export default {
        name: "lv-step-item",
        components: {LvRadio},
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
                    'lv-item-first': !!this.isFirst,
                    'lv-item-last': !!this.isLast,

                }
            },
        }

    }
</script>

<style lang="scss">
    .lv-step-item {
        .lv-step-item-content {
            .lv-step-item-icon, .lv-step-item-title {
                color: inherit;
            }
        }
        .lv-step-item-icon {
            .lv-step-item-line {
                flex: 1;
            }
            .lv-step-item-radio {
                font-size: 20px;
                color: inherit;
            }
        }
        &.lv-item-first {
            .lv-step-item-line-left {
                opacity: 0;
            }
        }
        &.lv-item-last {
            .lv-step-item-line-right {
                opacity: 0;
            }
        }
    }
</style>