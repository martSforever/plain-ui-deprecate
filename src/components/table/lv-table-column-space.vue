<template>
    <tr class="lv-table-column-space">
        <td v-for="(col,colIndex) in columns" :key="colIndex">
            <span :style="{width:$plain.$utils.unit(col.width)}"></span>
        </td>
    </tr>
</template>

<script>
    /**
     * 本组件用于撑开表格横向宽度
     * @author  韦胜健
     * @date    2019/1/5 17:42
     */
    export default {
        name: "lv-table-column-space",
        props: {
            columns: {},                    //要渲染的列数组
        },
    }
</script>

<style lang="scss">
    .lv-table-column-space {
        height: 0;
        span{
            display: block;
        }
    }
</style>