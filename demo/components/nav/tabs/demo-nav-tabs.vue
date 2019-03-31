<template>
    <div class="demo-nav-tabs">
        <div class="demo-nav-tabs-content">
            <div class="demo-nav-tabs-left">
                <link-button label="页面一" box-type="line" long/>
                <link-button label="页面二" box-type="line" long/>
            </div>
            <div class="demo-nav-tabs-right">
                <link-nav></link-nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-nav-tabs",
    }
</script>

<style lang="scss">
    .demo-nav-tabs {
        padding: 12px;
        box-sizing: border-box;
        .demo-nav-tabs-content {
            height: 100%;
            width: 100%;
            display: flex;
            & > div {
                height: 100%;
            }
            .demo-nav-tabs-left {
                width: 180px;
                padding-right: 12px;
                box-sizing: border-box;
                & > * {
                    margin-bottom: 12px;
                }
            }
            .demo-nav-tabs-right {
                flex: 1;
            }
        }
    }
</style>