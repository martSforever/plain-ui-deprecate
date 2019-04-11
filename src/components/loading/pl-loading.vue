<template>
    <pl-icon loading :icon="`pl-loading-${type}`"/>
</template>

<script>
    import PlIcon from "../icon/pl-icon";

    export default {
        name: "pl-loading",
        components: {PlIcon},
        props: {
            type: {type: String, default: 'default'},
        },
    }
</script>