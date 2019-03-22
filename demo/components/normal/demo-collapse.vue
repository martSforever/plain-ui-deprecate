<template>
    <div class="demo-collapse">
        <demo-row title="使用折叠动画">
            <link-button label="toggle" @click="show1=!show1" :active="show1"/>
            <link-collapse-transition>
                <div v-if="show1">
                    <div class="demo-collapse-box">
                        demo-collapse-box
                    </div>
                </div>
            </link-collapse-transition>
        </demo-row>

        <demo-row title="使用折叠组件">
            <link-collapse>
                <div slot="head">
                    折叠标题
                </div>
                <div class="demo-collapse-box">
                    折叠内容
                </div>
            </link-collapse>
        </demo-row>

        <demo-row title="使用折叠组件">
            <link-collapse-group :limit="1">
                <link-collapse>
                    <div slot="head">
                        折叠标题
                    </div>
                    <div class="demo-collapse-box">
                        折叠内容
                    </div>
                </link-collapse>
                <link-collapse>
                    <div slot="head">
                        折叠标题
                    </div>
                    <div class="demo-collapse-box">
                        折叠内容
                    </div>
                </link-collapse>
                <link-collapse>
                    <div slot="head">
                        折叠标题
                    </div>
                    <div class="demo-collapse-box">
                        折叠内容
                    </div>
                </link-collapse>
            </link-collapse-group>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-collapse",
        data() {
            return {
                show1: false
            }
        },
    }
</script>

<style lang="scss">
    .demo-collapse-box {
        @include public-style;
        height: 100px;
        font-size: 12px;
        padding: 12px 16px;
    }
</style>