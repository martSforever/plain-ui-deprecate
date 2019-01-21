<template>
    <div class="pl-navigator-header">
        <div class="pl-navigator-head-item" v-for="(menu,index) in menus" :key="`${menu.title}${index}`" @click="currentValue = index" @contextmenu.prevent="$emit('clickClose',index)">
            <div ref="labels" class="pl-navigator-head-item-label">
                <link-icon :icon="menu.icon"/>
                <span>{{menu.title}}</span>
            </div>
            <link-icon class="pl-navigator-header-close-icon" icon="pl-close" @click.stop="$emit('clickClose',index)"/>
        </div>
        <div class="pl-navigator-header-indicator" :style="indicatorStyles"></div>
    </div>

</template>

<script>
    export default {
        name: "pl-navigator-header",
        props: {
            menus: {},
            value: {},
        },
        watch: {
            value(val) {
                this.currentValue !== val && (this.currentValue = val)
                this.refresh();
            },
            currentValue(val) {
                this.$emit('input', val)
            },
        },
        data() {
            return {
                currentValue: this.value,
                indicatorLeft: 0,
                indicatorWidth: 0,
            }
        },
        computed: {
            indicatorStyles() {
                return {
                    left: `${this.indicatorLeft}px`,
                    width: `${this.indicatorWidth}px`,
                }
            },
        },
        methods: {
            refresh() {
                this.$nextTick(() => {
                    if (this.currentValue >= 0 && !!this.$refs.labels && !!this.$refs.labels[this.currentValue]) {
                        const {offsetLeft, offsetWidth} = this.$refs.labels[this.currentValue]
                        this.indicatorLeft = offsetLeft
                        this.indicatorWidth = offsetWidth
                    } else {
                        this.indicatorLeft = 0
                        this.indicatorWidth = 0
                    }
                })
            },
        },
        mounted() {
            this.$nextTick(() => this.refresh())
        },
    }
</script>

<style lang="scss">
    .pl-navigator-header {
        @include public-style;
        position: relative;
        border-bottom: solid 1px #f2f2f2;
        height: 48px;
        padding-left: 24px;
        .pl-icon {
            margin-right: 6px;
        }
        .pl-navigator-head-item {
            display: inline-flex;
            font-size: 12px;
            cursor: pointer;
            height: 100%;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            .pl-navigator-head-item-label {
                display: flex;
                align-items: center;
            }
            .pl-navigator-header-close-icon {
                opacity: 0;
                margin-left: 12px;
                @include transition-all;
            }
            &:hover {
                .pl-navigator-header-close-icon {
                    opacity: 1;
                }
            }
        }
        .pl-navigator-header-indicator {
            @include transition-all-cubic-bezier;
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 100px;
            height: 1px;
            background-color: #365D7E;
        }
    }
</style>