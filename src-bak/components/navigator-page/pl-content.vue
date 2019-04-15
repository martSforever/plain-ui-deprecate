<template>
    <div class="pl-content" :style="styles" :class="{'pl-content-padding':padding}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "pl-content",
        props: {
            padding: {type: Boolean, default: true},
        },
        data() {
            return {
                page: null,
                pageLeft: null,
            }
        },
        mounted() {
            this.page = this.$plain.$dom.findComponentUpward(this, 'pl-page')
            this.pageLeft = this.page.left
            this.page.$on('move', (left) => {
                this.pageLeft = left
            })
        },
        computed: {
            styles() {
                return {
                    left: `${this.pageLeft}px`
                }
            },
        },
    }
</script>