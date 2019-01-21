<template>
    <div class="demo-popover">
        <demo-row title="基本用法">
            <link-popover v-model="val1">
                <link-button label="reference"/>
                <div class="test-box" slot="popper">
                    popover content
                </div>
            </link-popover>
        </demo-row>

        <demo-row title="测试组件懒初始化以及销毁动作">
            <link-toggle v-model="val2"/>
            <link-popover v-if="val2">
                <link-button label="reference"/>
                <div class="test-box" slot="popper">
                    popover content
                    <demo-child title="hello"/>
                </div>
            </link-popover>
        </demo-row>

        <demo-row title="方向以，对其方式以及弹出动画">
            <link-button-group>
                <link-button label="top" @click="direction='top'" :active="direction === 'top'"/>
                <link-button label="bottom" @click="direction='bottom'" :active="direction === 'bottom'"/>
                <link-button label="left" @click="direction='left'" :active="direction === 'left'"/>
                <link-button label="right" @click="direction='right'" :active="direction === 'right'"/>
            </link-button-group>
            <link-button-group>
                <link-button label="start" @click="align='start'" :active="align === 'start'"/>
                <link-button label="center" @click="align='center'" :active="align === 'center'"/>
                <link-button label="end" @click="align='end'" :active="align === 'end'"/>
            </link-button-group>
            <link-button-group>
                <link-button label="drop" @click="animate='drop'" :active="animate === 'drop'"/>
                <link-button label="scale" @click="animate='scale'" :active="animate === 'scale'"/>
            </link-button-group>
            <link-button-group>
                <link-button label="arrow" @click="arrow = !arrow" :active="!!arrow"/>
            </link-button-group>
            <link-popover trigger="click" :direction="direction" :align="align" :animate="animate" :arrow="arrow" :value="false" :width="300" :height="100" disabled-equal>
                <link-button label="reference"/>
                <div class="test-box" slot="popper">
                    popover content
                </div>
            </link-popover>
        </demo-row>

        <demo-row title="内容缓存与不缓存" class="demo-popover-cache">
            <demo-row-item title="默认不缓存，每次隐藏销毁内容">
                <link-popover>
                    <link-button label="reference"/>
                    <div class="test-box" slot="popper">
                        popover content
                        <demo-child title="hello"/>
                    </div>
                </link-popover>
            </demo-row-item>
            <demo-row-item title="缓存内容，只有第一次打开的时候初始化，后续只做css显隐切换">
                <link-popover disabled-destroy-on-hide>
                    <link-button label="reference"/>
                    <div class="test-box" slot="popper">
                        popover content
                        <demo-child title="hello"/>
                    </div>
                </link-popover>
            </demo-row-item>
        </demo-row>


        <demo-row title="打开方式：hover,click">
            <link-popover trigger="hover">
                <link-button label="hover"/>
                <div class="test-box" slot="popper">
                    popover content
                </div>
            </link-popover>
            <link-popover>
                <link-button label="click"/>
                <div class="test-box" slot="popper">
                    popover content
                </div>
            </link-popover>
        </demo-row>

        <demo-row title="禁用点击外部关闭">
            <link-popover disabled-hide-on-click-outside ref="popover">
                <link-button label="reference"/>
                <div class="test-box" slot="popper">
                    <link-button label="close" @click="$refs.popover.hide()"/>
                </div>
            </link-popover>
        </demo-row>

        <demo-row title="初始化的就初始化内容">
            <link-popover initialized>
                <link-button label="reference"/>
                <div class="test-box" slot="popper">
                    <demo-child title="初始化的就初始化内容"/>
                </div>
            </link-popover>
        </demo-row>

        <demo-row title="设置大小">
            <link-popover width="200px" height="200px" disabled-equal>
                <link-button label="reference"/>
                <div class="test-box" slot="popper">
                    设置大小
                </div>
            </link-popover>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-popover",
        data() {
            return {
                val1: null,
                val2: true,
                direction: 'top',
                align: 'start',
                animate: 'drop',
                arrow: true,
            }
        },
    }
</script>

<style lang="scss">
    .demo-popover {
        padding: 12px;
        .demo-row-content {
            position: relative;
            overflow: hidden;
        }
        .demo-popover-cache {
            .demo-row-item-title {
                width: 300px;
            }
        }
    }

    .test-box {
    }
</style>