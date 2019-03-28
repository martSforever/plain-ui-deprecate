<template>
    <transition-group
            tag="div"
            @enter="enter"
            @afterEnter="afterEnter"
            @leave="leave"
            class="pl-nav-tabs-header">
        <div class="pl-nav-tabs-header-item"
             v-for="(item,index) in list"
             @click="$emit('click',{item,index})"
             :key="item">
            {{item}}
        </div>
    </transition-group>
</template>

<script>
    export default {
        name: "pl-nav-tabs-header",
        props: {
            list: {type: Array, default: () => []},
        },
        methods: {
            enter(el) {
                el.style.flex = 0
            },
            afterEnter(el) {
                el.style.flex = 1
            },
            leave(el) {
                el.style.flex = 0
            },
        }
    }
</script>

<style lang="scss">
    .pl-nav-tabs-header {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        .pl-nav-tabs-header-item {
            display: inline-block;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
            border: solid 1px #ddd;
            @include transition-all;
        }
    }
</style>