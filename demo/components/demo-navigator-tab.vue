<template>
    <div class="demo-navigator-tab">
        <demo-row>
            <demo-row-item title="操作按钮">
                <link-button label="Color推荐" @click="$refs.tabs.push('/demo-color','Color推荐')"/>
                <link-button label="Icon图标设置" @click="$refs.tabs.push('/demo-icon','Icon图标设置')"/>
                <link-button label="Radio单选复选" @click="$refs.tabs.push('/demo-radio','Radio单选复选')"/>
            </demo-row-item>
            <link-navigator-tab height="300px" ref="tabs"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-navigator-tab"
    }
</script>

<style lang="scss">

</style>