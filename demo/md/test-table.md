:::block-start

:::setting-start
title:'Props'
type:'table'
:::setting-end

## 属性Props

**自身属性**

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| :------ | :------ | :------ | :------ | :------ |
| label | string| --- | --- | 按钮文本 |
| active | boolean | true,false | --- | 按钮的选中状态 |

**Box盒子属性**

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| :------ | :------ | :------ | :------ | :------ |
| boxType | string| fill,line,none,dashed | fill | 盒子类型 |
| boxColor | string | primary,success,warn,error,info | primary | 盒子颜色 |
| boxShape | string | fillet,round,none | none | 盒子形状 |
| boxSize | string | large,default,small | default | 盒子大小 |
| prefixIcon | string | --- | --- | 前置图标 |
| suffixIcon | string | --- | --- | 后置图标 |
| clearIcon | string | --- | --- | 清除图标，当该属性存在时，hover自动为true，当value有值并且hovering时，显示pad-close，否则显示clearIcon |
| clearable | boolean | --- | true | 是否可清除,为false，则点击之后清空的默认动作不会执行 |
| loading | boolean | --- | --- | 显示loading状态 |
| iconOnly | boolean | --- | --- | 只有图标，设置为true，则为圆形 |
| readonly | boolean | --- | --- | 只读，为true则点击不可用 |
| disabled | boolean | --- | --- | 禁用，为true，显示禁用样式并且点击不可用 |
| padding | boolean | --- | true | 默认的内部左右边距，为false则去除该边距 |
| long | boolean | --- | --- | 宽度占满父元素 |
| width | boolean | --- | --- | 盒子宽度 |
| hover | boolean | --- | --- | 是否监听鼠标hover事件，不设置为true，则无法监听hover事件：@hover |

:::block-end