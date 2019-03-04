<template>
    <transition name="pl-context-menu">
        <div class="pl-context-menu" :style="styles" v-show="show">
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
    </transition>
</template>

<script>
    import PlScroll from "../scroll/pl-scroll";

    export default {
        name: "pl-context-menu",
        components: {PlScroll},
        data() {
            return {
                /*['北京', '天津', '上海', '杭州', '南京', '无锡', '南昌', '广州', '南宁', '柳州', '防城港', '汕头', '厦门']*/
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

                show: false,                                    //当前是否显示
                defaultWidth: '150px',                          //默认宽度
                defaultHeight: '200px',                         //默认高度
                p_top: null,                                    //菜单顶部位置
                p_left: null,                                   //菜单左部位置
                p_targetWidth: null,                            //菜单依附目标宽度
                p_targetHeight: null,                           //菜单依附目标高度
                p_targetTop: null,                              //菜单依附目标顶部位置
                p_targetLeft: null,                             //菜单依附目标左部位置
            }
        },
        watch: {
            el: {
                immediate: true,
                handler(el) {
                    if (!el) return
                    this.p_saveTargetData(el)
                    this.p_top = this.p_targetTop + this.p_targetHeight
                    this.p_left = this.p_targetLeft
                },
            },
            event: {
                immediate: true,
                handler(e) {
                    if (!e) return
                    this.p_saveTargetData(e.target)
                    this.p_top = e.clientY
                    this.p_left = e.clientX
                },
            }
        },
        computed: {
            styles() {
                return {
                    width: this.width || this.defaultWidth,
                    height: this.height || this.defaultHeight,
                    top: `${this.p_top}px`,
                    left: `${this.p_left}px`,
                }
            },
        },
        mounted() {
            document.body.addEventListener('click', this.p_clickWindow)
        },
        methods: {
            /**
             * 点击窗口触发动作
             * @author  韦胜健
             * @date    2019/3/4 09:54
             */
            p_clickWindow(e) {
                if (!this.$el.contains(e.target)) {
                    this.show = false
                }
            },
            /**
             * 点击菜单选项触发动作
             * @author  韦胜健
             * @date    2019/3/4 09:54
             */
            p_clickItem(item) {
                !!this.onConfirm && this.onConfirm(item)
                this.show = false
                this.p_clearPosition()
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
        },
        beforeDestroy() {
            document.body.removeEventListener('click', this.p_click)
            this.show = false
        },
    }
</script>

<style lang="scss">
    .pl-context-menu {
        @include transition-all;
        @include public-style;
        padding: 4px 0;
        box-shadow: 0 0 15px 1px #ddd;
        position: fixed;
        left: 0;
        top: 0;
        background-color: white;
        z-index: 9999;

        .pl-context-menu-item {
            padding: 4px 10px;
            font-size: 12px;
            cursor: pointer;
            &:hover, &.pl-context-menu-item-active {
                background-color: $color-primary;
                color: white;
            }
        }
    }

    .pl-context-menu-enter-active, .pl-context-menu-leave-active {
        opacity: 1;
    }

    .pl-context-menu-enter, .pl-context-menu-leave-to {
        opacity: 0;
    }
</style>