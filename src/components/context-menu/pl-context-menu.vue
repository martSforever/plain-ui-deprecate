<template>
    <transition name="pl-context-menu">
        <div class="pl-context-menu" :style="styles" v-show="show">
            <pl-scroll>
                <div class="pl-context-menu-item" v-for="(item,index) in data"
                     v-if="!!data"
                     :key="index">
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
                data: ['北京', '天津', '上海', '杭州', '南京', '无锡', '南昌', '广州', '南宁', '柳州', '防城港', '汕头', '厦门'],
                value: null,
                labelKey: null,
                valueKey: null,
                multiple: null,
                width: null,
                height: null,
                target: null,

                show: false,
                defaultWidth: '150px',
                defaultHeight: '200px',
                p_top: null,
                p_left: null,
                p_targetWidth: null,
                p_targetHeight: null,
                p_targetTop: null,
                p_targetLeft: null,
            }
        },
        watch: {
            target: {
                immediate: true,
                handler(target) {
                    if (!target) return
                    this.p_targetWidth = target.offsetWidth
                    this.p_targetHeight = target.offsetHeight
                    const {top, left} = target.getBoundingClientRect()
                    this.p_targetTop = top
                    this.p_targetLeft = left

                },
            },
        },
        computed: {
            styles() {
                return {
                    width: this.width || this.defaultWidth,
                    height: this.height || this.defaultHeight,
                    top: `${this.p_targetTop}px`,
                    left: `${this.p_targetLeft}px`,
                }
            },
        },
        mounted() {
            document.body.addEventListener('click', this.p_click)
        },
        methods: {
            p_click(e) {
                if (!this.$el.contains(e.target)) {
                    this.show = false
                }
            },
        },
        beforeDestroy() {
            document.body.removeEventListener('click', this.p_click)
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
            &:hover {
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