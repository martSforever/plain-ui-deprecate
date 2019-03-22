<template>
    <div class="demo-card">
        <demo-row title="基本用法">
            <link-card>
                <link-card-header>卡片标题</link-card-header>
                <link-card-content>
                    卡片内容
                </link-card-content>
            </link-card>
        </demo-row>
        <demo-row title="图片">
            <link-card>
                <img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" alt="Hamburg" style="width: 100%;height: 100%">
            </link-card>
        </demo-row>
        <demo-row title="阴影">
            <link-card shadow="always">
                <link-card-header>一直存在</link-card-header>
                <link-card-content>
                    卡片内容
                </link-card-content>
            </link-card>
            <link-card shadow="hover">
                <link-card-header>鼠标悬浮存在</link-card-header>
                <link-card-content>
                    卡片内容
                </link-card-content>
            </link-card>
            <link-card shadow="never">
                <link-card-header>永不存在</link-card-header>
                <link-card-content>
                    卡片内容
                </link-card-content>
            </link-card>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-card"
    }
</script>

<style lang="scss">

</style>