<template>
    <div class="demo-block">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "demo-block",
        props: {
            file: {type: String, default: 'button.md'},
        },
        created() {
            this.p_getBlocks()
        },
        methods: {
            async p_decodeFile() {
                return new Promise((rs, rj) => {
                    import(`demo/md/${this.file}`)
                        .then(module => {
                            rs(module.default)
                        }).catch(rj)
                })
            },
            async p_getBlocks() {
                const blocksText = await  this.p_decodeFile()
                const blocks = blocksText.split("---")
                console.log(blocks)
            },
        }
    }
</script>

<style lang="scss">

</style>