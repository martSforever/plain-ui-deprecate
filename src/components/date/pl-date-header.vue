<template>
    <div class="pl-date-header">
        <div class="pl-date-header-left">
            <slot name="left">
                <template v-if="!hideLeftButton">
                    <pl-icon icon="pad-doubleleft" class="pl-date-header-label" @click="p_pickYear--" hover/>
                    <pl-icon icon="pad-left" class="pl-date-header-label" @click="p_previousMonth" hover/>
                </template>
            </slot>
        </div>
        <div class="pl-date-header-center">
            <slot name="center">
                <span class="pl-date-header-label" @click="$emit('changeMode','year')">{{p_pickYear}}</span>
                <template v-if="view !== 'year'">
                    <span>-</span>
                    <span class="pl-date-header-label" @click="$emit('changeMode','month')">{{$plain.$utils.zeroize(p_pickMonth+1)}}</span>
                </template>
                <slot name="time"></slot>
            </slot>
        </div>
        <div class="pl-date-header-right">
            <slot name="right">
                <template v-if="!hideRightButton">
                    <pl-icon icon="pad-right" class="pl-date-header-label" @click="p_nextMonth" hover/>
                    <pl-icon icon="pad-doubleright" class="pl-date-header-label" @click="p_pickYear++" hover/>
                </template>
            </slot>
        </div>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-date-header",
        components: {PlIcon},
        props: {
            pickYear: {},
            pickMonth: {},
            view: {},
            hideLeftButton: {type: Boolean},
            hideRightButton: {type: Boolean},
        },
        watch: {
            pickYear(val) {
                if (this.p_pickYear !== val) this.p_pickYear = val
            },
            p_pickYear(val) {
                if (this.pickYear !== val) this.$emit('update:pickYear', val)
            },
            pickMonth(val) {
                if (this.p_pickMonth !== val) this.p_pickMonth = val
            },
            p_pickMonth(val) {
                if (this.pickMonth !== val) this.$emit('update:pickMonth', val)
            },
        },
        data() {
            return {
                p_pickYear: this.pickYear,
                p_pickMonth: this.pickMonth,
            }
        },
        methods: {
            p_previousMonth() {
                if (this.p_pickMonth - 1 < 0) {
                    this.p_pickMonth = 11
                    this.p_pickYear--
                } else {
                    this.p_pickMonth--
                }
            },
            p_nextMonth() {
                if (this.p_pickMonth + 1 > 11) {
                    this.p_pickMonth = 0
                    this.p_pickYear++
                } else {
                    this.p_pickMonth++
                }
            },
        },
    }
</script>

<style lang="scss">
    .pl-date-header {
        @include public-style;
        height: 40px;
        width: $dateItemSize*7;
        display: flex;
        flex-direction: row;
        user-select: none;
        .pl-date-header-left, .pl-date-header-right {
            flex: 1;
            padding: 0 6px;
            box-sizing: border-box;
            font-size: 12px;
        }
        .pl-date-header-center {
            .pl-date-header-label {
                padding: 4px 9px;
                &:hover {
                    border-radius: 4px;
                    background-color: $color-primary-light;
                }
            }
        }
        .pl-date-header-left, .pl-date-header-center, .pl-date-header-right {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $color-normal-content;
            cursor: pointer;
            .pl-date-header-label {
                &:not(:last-child) {
                    margin-right: 3px;
                }
                &:hover {
                    color: $color-primary;
                }
            }
        }
        .pl-date-header-left {
            justify-content: flex-start;
        }
        .pl-date-header-right {
            justify-content: flex-end;
        }
    }
</style>