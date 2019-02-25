<template>
    <div class="pl-page">
        <slot></slot>
    </div>
</template>

<script>

    const pageTransitionDuration = 500

    export default {
        name: "pl-page",
        props: {
            name: {},
        },
        data() {
            return {
                totalWidth: null,
                left: null,
                tempLeft: 0,
                startX: 0,
                touching: false,
                navigator: null,
            }
        },
        watch: {
            left(val) {
                this.$emit('move', val)
            },
        },
        async mounted() {
            this.left = this.totalWidth = this.$el.offsetWidth
            !!this.name && console.log(`mounted>>>${this.name}`)
            this.navigator = this.$plain.$dom.findComponentUpward(this, 'pl-navigator-page')
            await this.$plain.nextTick()
            await this.show()
        },
        beforeDestroy() {
            !!this.name && console.log(`destroyed<<<${this.name}`);
        },
        computed: {},
        methods: {
            async show() {
                await this.$plain.nextTick()
                await this.$plain.$utils.delay(25)
                this.left = 0
                await this.$plain.$utils.delay(pageTransitionDuration)
                this.$emit('show')
            },
            async hide() {
                this.left = this.totalWidth
                await this.$plain.$utils.delay(pageTransitionDuration)
                this.$emit('hide')
            },
        },
    }
</script>

<style lang="scss">
    .pl-page {
        @include public-style;
        height: 100%;
        width: 100%;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>