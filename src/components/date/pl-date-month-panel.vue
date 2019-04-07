<template>
    <div class="pl-date-month-panel">
        <div class="pl-date-month-panel-content-wrapper">
            <div class="pl-date-month-panel-item-wrapper"
                 v-for="(item,index) in list"
                 @click="p_clickItem(item)"
                 :key="index">
                <div class="pl-date-month-panel-item"
                     :class="{
                        'pl-date-month-panel-item-active':item.active,
                        'pl-date-month-panel-item-pick-month':item.pickMonth,
                        'pl-date-month-panel-item-now':item .now,
                        'pl-date-month-panel-item-disabled':item.disabled,
                     }">
                    <!--{{$amlocale.date.month[item]}}-->
                    {{item.val+1}}月
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ValueMixin} from "../../mixin/component-mixin";

    export default {
        name: "pl-date-month-panel",
        mixins: [ValueMixin],
        props: {
            currentMonth: {},
            currentYear: {},
            pickYear: {},
            nowYear: {},                                    //当前年份
            nowMonth: {},                                   //当前月份
            nowDay: {},                                     //当前日
            maxTime: {},
            minTime: {},
            getTime: {type: Function},
        },
        data() {
            return {
                p_watchCurrentValue: false,
            }
        },
        computed: {
            list() {
                const ret = []
                for (let i = 0; i < 12; i++) {
                    const date = new Date(this.pickYear, i+1, 0, 0, 0, 0, 0)
                    const time = this.getTime(date)
                    ret.push({
                        val: i,
                        active: i === this.currentMonth && this.currentYear === this.pickYear,
                        pickMonth: i === this.currentValue,
                        now: i === this.nowMonth && this.nowYear === this.pickYear,
                        disabled: (!!this.maxTime && time > this.maxTime) || (!!this.minTime && time < this.minTime),
                    })
                }
                return ret
            },
        },
        methods: {
            p_clickItem(item) {
                if (!!item.disabled) return
                this.currentValue = item.val
                this.$emit('input', item.val)
            },
        },
    }
</script>

<style lang="scss">
    .pl-date-month-panel {
        @include public-style;
        width: 100%;
        height: 100%;
        padding: 9px;
        .pl-date-month-panel-content-wrapper {
            width: 100%;
            height: 100%;
            .pl-date-month-panel-item-wrapper {
                display: inline-flex;
                width: 33.33%;
                height: 55px;
                align-items: center;
                justify-content: center;
                .pl-date-month-panel-item {
                    border-radius: 4px;
                    cursor: pointer;
                    height: 24px;
                    width: 50px;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover, &.pl-date-month-panel-item-pick-month {
                        background-color: var(--p-color-primary-lighter);
                    }
                    &.pl-date-month-panel-item-now {
                        background-color: var(--p-color-success);
                        color: white;
                    }
                    &.pl-date-month-panel-item-active {
                        background-color: var(--p-color-primary);
                        color: white;
                    }
                    &.pl-date-month-panel-item-disabled {
                        background-color: var(--p-color-normal-background-error);
                    }
                }
            }
        }
    }

</style>