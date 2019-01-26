<template>
    <div class="home">
        <div class="home-content-wrapper">
            <home-header/>
            <div class="home-content">
                <home-menu/>
                <home-body/>
            </div>
        </div>
    </div>
</template>

<script>
    import HomeHeader from "./home-header";
    import HomeMenu from "./home-menu";
    import HomeBody from "./home-body";

    export default {
        name: "home",
        components: {HomeBody, HomeMenu, HomeHeader}
    }
</script>

<style lang="scss">
    .home {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        .home-content-wrapper {
            width: 1000px;
            height: 100%;
            display: flex;
            flex-direction: column;
            .home-header {
                height: 64px;
            }
            .home-content {
                flex: 1;
                width: 100%;
                display: flex;
                flex-direction: row;

            }
        }
    }
</style>