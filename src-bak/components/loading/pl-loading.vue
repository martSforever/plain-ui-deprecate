<template>
    <div class="pl-loading" :class="[`pl-loading-color-${color}`]">
        <pl-icon loading :icon="`pl-loading-${type}`" v-if="type !== 'default'"/>
        <div v-else class="pl-loading-item" v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]" :class="[`pl-loading-${item}`]"></div>
    </div>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-loading",
        components: {PlIcon},
        props: {
            type: {type: String, default: 'default'},
            color: {type: String, default: 'black'},
        },
    }
</script>