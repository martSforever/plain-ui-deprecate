<template>
    <transition name="pl-context-menu">
        <div class="pl-context-menu" :style="styles" v-show="p_show">
            <div class="pl-context-menu-content" :style="contentStyles">
                <pl-scroll>
                    <div class="pl-context-menu-item"
                         :class="{'pl-context-menu-item-active':p_isActive(item)}"
                         v-for="(item,index) in data"
                         :key="index"
                         v-if="!!data"
                         @click="p_clickItem(item)">
                        <span>{{!!labelKey?item[labelKey]:item}}</span>
                    </div>
                </pl-scroll>
            </div>
            <div class="pl-context-menu-footer" v-show="multiple">
                <div class="pl-context-menu-footer-content">
                    <pl-button label="确定" @click="p_confirm"/>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import PlScroll from "../scroll/pl-scroll";
    import PlButton from "../button/pl-button";

    export default {
        name: "pl-context-menu",
        components: {PlButton, PlScroll},
        data() {
            return {
                data: [],                                       //右侧选择的数据
                value: null,                                    //当前值
                labelKey: null,                                 //显示的文本key
                valueKey: null,                                 //值key
                multiple: null,                                 //是否多选
                width: null,                                    //菜单宽度
                height: null,                                   //菜单高度
                el: null,                                       //菜单依附dom对象
                event: null,                                    //菜单显示在鼠标的位置
                onConfirm: null,                                //点击触发回调函数
                sizeEqual: null,                                //是否与el宽度相同

                p_show: false,                                    //当前是否显示
                p_top: null,                                    //菜单顶部位置
                p_left: null,                                   //菜单左部位置
                p_targetWidth: null,                            //菜单依附目标宽度
                p_targetHeight: null,                           //菜单依附目标高度
                p_targetTop: null,                              //菜单依附目标顶部位置
                p_targetLeft: null,                             //菜单依附目标左部位置
            }
        },
        computed: {
            styles() {
                return {
                    top: `${this.p_top}px`,
                    left: `${this.p_left}px`,
                }
            },
            contentStyles() {
                return {
                    width: this.width,
                    height: this.height,

                }
            },
        },
        mounted() {
            document.body.addEventListener('mousedown', this.p_clickWindow)
        },
        methods: {
            show({data, labelKey, valueKey, value, multiple, width, height, sizeEqual, el, event, onConfirm}) {
                this.p_clearPosition()
                Object.assign(this, {data, labelKey, valueKey, value, multiple, width, height, sizeEqual, el, event, onConfirm})

                if (!!el) {
                    this.p_saveTargetData(el)
                    this.p_top = this.p_targetTop + this.p_targetHeight
                    this.p_left = this.p_targetLeft
                }
                if (!!event) {
                    this.p_saveTargetData(event.target)
                    this.p_top = event.clientY
                    this.p_left = event.clientX
                }

                this.p_show = true
            },
            /**
             * 点击窗口触发动作
             * @author  韦胜健
             * @date    2019/3/4 09:54
             */
            p_clickWindow(e) {
                if (!this.$el.contains(e.target)) {
                    this.p_show = false
                }
            },
            /**
             * 点击菜单选项触发动作
             * @author  韦胜健
             * @date    2019/3/4 09:54
             */
            p_clickItem(item) {
                if (!this.multiple) {
                    !!this.onConfirm && this.onConfirm(item)
                    this.p_show = false
                } else {
                    const ret = [].concat(this.value || [])
                    if (this.$plain.$utils.findOne(ret, (it) => !!this.valueKey ? it[this.valueKey] === item[this.valueKey] : it === item)) {
                        this.$plain.$utils.removeSome(ret, it => !!this.valueKey ? it[this.valueKey] === item[this.valueKey] : it === item)
                    } else {
                        ret.push(item)
                    }
                    this.value = ret
                }
            },
            /**
             * 保存目标dom位置大小信息
             * @author  韦胜健
             * @date    2019/3/4 09:54
             */
            p_saveTargetData(el) {
                this.p_targetWidth = el.offsetWidth
                this.p_targetHeight = el.offsetHeight
                const {top, left} = el.getBoundingClientRect()
                this.p_targetTop = top
                this.p_targetLeft = left
            },
            /**
             * 是否激活
             * @author  韦胜健
             * @date    2019/3/4 10:09
             */
            p_isActive(item) {
                if (!this.value) return false
                if (!this.multiple) {
                    return !!this.valueKey ? (item[this.labelKey] === this.value) : (item === this.value)
                } else {
                    return !!this.valueKey ? this.value.indexOf(item[this.labelKey]) > -1 : (this.value.indexOf(item) > -1)
                }
            },
            /**
             * 清除位置信息
             * @author  韦胜健
             * @date    2019/3/4 10:10
             */
            p_clearPosition() {
                this.p_top = null
                this.p_left = null
                this.p_targetTop = null
                this.p_targetLeft = null
                this.p_targetWidth = null
                this.p_targetHeight = null
            },
            /**
             * 点击确认按钮事件
             * @author  韦胜健
             * @date    2019/3/4 10:58
             */
            p_confirm() {
                !!this.onConfirm && this.onConfirm(this.value)
                this.p_show = false
            },
        },
        beforeDestroy() {
            document.body.removeEventListener('mousedown', this.p_click)
            this.p_show = false
        },
    }
</script>

<style lang="scss">
    .pl-context-menu {
        @include transition-all;
        @include public-style;
        box-shadow: 0 0 15px 1px #ddd;
        position: fixed;
        left: 0;
        top: 0;
        background-color: white;
        z-index: 9999;
        .pl-context-menu-content {
            padding: 4px 0;
        }

        .pl-context-menu-item {
            padding: 4px 10px;
            font-size: 12px;
            cursor: pointer;
            &:hover, &.pl-context-menu-item-active {
                background-color: var(--p-color-primary);
                color: white;
            }
        }
        .pl-context-menu-footer {
            height: 40px;
            position: relative;
            &:after {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                content: '';
                box-shadow: 0 0 15px 1px #ddd;
            }
            .pl-context-menu-footer-content {
                background-color: white;
                height: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 0 12px;
                position: relative;
                z-index: 1;
            }
        }
    }

    .pl-context-menu-enter-active, .pl-context-menu-leave-active {
        opacity: 1;
        transform-origin: top;
    }

    .pl-context-menu-enter, .pl-context-menu-leave-to {
        transform: scaleY(0.65) translateY(-10px);
        opacity: 0;
    }
</style>