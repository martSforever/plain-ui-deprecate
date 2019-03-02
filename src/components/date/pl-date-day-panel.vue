<template>
    <div class="pl-date-day-panel">
        <div class="pl-date-day-panel-item"
             v-for="(weekName,index) in weekNames"
             :key="`_${index}`">
            <div class="pl-date-day-panel-item-inner">
                <span>{{weekName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pl-date-day-panel",
        data() {
            return {
                weekNames: ['日', '1', '二', '三', '四', '五', '六'],

            }
        },
    }
</script>

<style lang="scss">
    .pl-date-day-panel {
        @include public-style;
        display: inline-block;
        font-size: 12px;
        .pl-date-day-panel-item {
            height: 28px;
            width: 28px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: $color-primary-light;
            cursor: pointer;
            .pl-date-day-panel-item-inner {
                $size: 22px;
                height: $size;
                width: $size;
                line-height: $size;
                text-align: center;
                background-color: $color-primary;
                color: white;
                border-radius: 4px;
                transform: scale(0.9);
            }
        }
    }
</style>