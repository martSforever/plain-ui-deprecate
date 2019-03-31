<template>
    <div class="demo-main">
        <demo-header/>
        <div class="demo-body">
            <div class="demo-left-side">
                <demo-side-menu @clickMenu="menu=>$refs.tabs.push(menu.page,menu.title)"/>
            </div>
            <div class="demo-right-side">
                <link-navigator-tab ref="tabs" id="1544529635688" :initPages="[{title:'Button按钮',path:'/normal/demo-button'}]"/>
            </div>
        </div>
    </div>
</template>

<script>
    import DemoHeader from "./demo-header";
    import DemoSideMenu from "./demo-side-menu";

    export default {
        name: "demo-main",
        components: {DemoSideMenu, DemoHeader},
    }
</script>

<style lang="scss">
    .demo-main {
        height: 100%;
        width: 100%;
        position: relative;
        .demo-body {
            width: 100%;
            display: flex;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 64px;
            .demo-left-side {
                width: 256px;
            }
            .demo-right-side {
                flex: 1;
                overflow-y: auto;
                overflow-x: hidden;
            }
        }

    }
</style>