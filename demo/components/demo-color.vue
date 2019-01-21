<template>
    <div class="demo-color">
        <demo-row title="概述">
            plain-UI 推荐使用一下调色板的颜色作为开发规范，以保证页面和组件默认色调之间的视觉一致。
        </demo-row>
        <demo-row title="主色">
            <div v-for="(item,index) in mainColors" class="demo-color-item" :style="{backgroundColor:item.color}" :key="index">
                <div class="demo-color-item-title">{{item.name}}</div>
                <div class="demo-color-item-color">{{item.color}}</div>
            </div>
        </demo-row>
        <demo-row title="辅助色">
            <div v-for="(item,index) in supportColors" class="demo-color-item" :style="{backgroundColor:item.color}" :key="index">
                <div class="demo-color-item-title">{{item.name}}</div>
                <div class="demo-color-item-color">{{item.color}}</div>
            </div>
        </demo-row>
        <demo-row title="中性色">
            <div v-for="(item,index) in normalColors" class="demo-color-item" :style="{backgroundColor:item.color}" :key="index">
                <div class="demo-color-item-title">{{item.name}}</div>
                <div class="demo-color-item-color">{{item.color}}</div>
            </div>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-color",
        data() {
            return {
                mainColors: [
                    {name: 'primary', color: '#1076ca'},
                    {name: 'primary-light', color: '#f0faff'},
                    {name: 'primary-dark', color: '#365D7E'},
                ],
                supportColors: [
                    {name: 'info', color: '#8d8e91'},
                    {name: 'success', color: '#02D173'},
                    {name: 'warn', color: '#FF9503'},
                    {name: 'error', color: '#FF4702'},
                ],
                normalColors: [
                    {name: 'title', color: '#17233d'},
                    {name: 'content', color: '#5c677b'},
                    {name: 'sub-color', color: '#808695'},
                    {name: 'disabled', color: '#c5c8ce'},
                    {name: 'border', color: '#dcdee2'},
                    {name: 'divider', color: '#e8eaec'},
                    {name: 'background', color: '#f8f8f9'},
                ],
            }
        },
    }
</script>

<style lang="scss">
    .demo-color {
        .demo-color-item {
            width: 150px;
            height: 78px;
            border-radius: 9px;
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            color: #ddd;
            padding: 12px;
            .demo-color-item-title {
                margin-bottom: 12px;
            }
        }
    }
</style>