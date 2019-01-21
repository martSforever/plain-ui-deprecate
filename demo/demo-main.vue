<template>
    <div class="demo-main">
        <demo-header/>
        <div class="demo-body">
            <div class="demo-left-side">
                <demo-side-menu @clickMenu="menu=>$refs.tabs.push(menu.page)"/>
            </div>
            <div class="demo-right-side">
                <link-navigator :register="pages" ref="tabs" id="1544529635688" :init="init"/>
            </div>
        </div>
    </div>
</template>

<script>
    import DemoHeader from "./demo-header";
    import DemoSideMenu from "./demo-side-menu";
    import pages from './pages'

    export default {
        name: "demo-main",
        components: {DemoSideMenu, DemoHeader},
        data() {
            return {
                pages,
                init: [
                    {path: 'button'}
                ],
            }
        },
    }
</script>

<style lang="scss">
    .demo-main {
        height: 100%;
        width: 100%;
        .demo-body {
            width: 100%;
            display: flex;
            height: calc(100% - 64px);
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