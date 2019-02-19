<template>
    <div class="demo-navigator">
        <demo-row title="基本用法(右击标签可以关闭页签页面)">
            <demo-row-item title="操作按钮">
                <link-button label="打开页面icon" @click="$refs.tabs.push('demo-icon')"/>
                <link-button label="打开页面radio" @click="$refs.tabs.push('demo-radio')"/>
            </demo-row-item>
            <div class="demo-tabs-box">
                <link-navigator :register="pages" ref="tabs"/>
            </div>
        </demo-row>
        <demo-row title="初始化的时候就显示可以打开的页面">
            <div class="demo-tabs-box">
                <link-navigator :register="pages" :init="init"/>
            </div>
        </demo-row>
        <demo-row title="同一個页面是否可以打开多次">
            <demo-row-item title="操作按钮">
                <link-button label="打开页面icon" @click="$refs.tabs1.push('demo-icon')"/>
                <link-button label="打开页面radio" @click="$refs.tabs1.push('demo-radio')"/>
            </demo-row-item>
            <div class="demo-tabs-box">
                <link-navigator :register="pages" ref="tabs1" multiple/>
            </div>
        </demo-row>

        <demo-row title="设置id，缓存页面，刷新之后打开原来正在查看的页面">
            <demo-row-item title="操作按钮">
                <link-button label="打开页面icon" @click="$refs.tabs2.push('demo-icon')"/>
                <link-button label="打开页面radio" @click="$refs.tabs2.push('demo-radio')"/>
            </demo-row-item>
            <div class="demo-tabs-box">
                <link-navigator :register="pages" ref="tabs2" id="1545826196135"/>
            </div>
        </demo-row>
        <demo-row title="自定义过度动画">
            <div class="demo-tabs-box">
                <link-navigator :register="pages" :init="init" transition="scale"/>
            </div>
        </demo-row>
    </div>
</template>

<script>

    import pages from '../pages'

    export default {
        name: "demo-navigator",
        data() {
            return {
                pages,
                init: [
                    {path: 'demo-icon'},
                    {path: 'demo-radio'},
                ]
            }
        },
    }
</script>

<style lang="scss">
    .demo-tabs-box {
        height: 200px;
        box-shadow: 0 0 20px #ddd;

        .scale-enter-active, .scale-leave-active {
            transition: all 1s ease;
            transform: translateX(0);
        }

        .scale-enter, .scale-leave-active {
            opacity: 0;
            transform: translateX(100%);
        }
    }
</style>