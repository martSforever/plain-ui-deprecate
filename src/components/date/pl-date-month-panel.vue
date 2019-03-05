<template>
    <div class="pl-date-month-panel">
        <div class="pl-date-month-panel-content-wrapper">
            <div class="pl-date-month-panel-item-wrapper"
                 v-for="(item,index) in list"
                 @click="p_clickItem(item)"
                 :key="index">
                <div class="pl-date-month-panel-item"
                     :class="{'pl-date-month-panel-item-active':item===currentMonth,'pl-date-month-panel-item-now':item === nowMonth}">
                    <!--{{$amlocale.date.month[item]}}-->
                    {{item+1}}月
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
        },
        data() {
            return {
                list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                nowMonth: new Date().getMonth()
            }
        },
        methods: {
            p_clickItem(item) {
                this.currentValue = item
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
                    &:hover {
                        background-color: $color-primary-light;
                    }
                    &.pl-date-month-panel-item-now {
                        background-color: $color-success;
                        color: white;
                    }
                    &.pl-date-month-panel-item-active {
                        background-color: $color-primary;
                        color: white;
                    }
                }
            }
        }
    }

</style>