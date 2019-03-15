## Button按钮

**Plain 的按钮功能比较单一，主要是提供快速设置按钮样式的功能**

:::demo-start

:::title-start
按钮的基本用法
:::title-end

:::desc-start
默认情况下，可以通过label属性设置按钮文本，可以通过插槽设置文本内容，当设置插槽时，label属性将不可用
:::desc-end

:::min-height-start
200
:::min-height-end

```html
<link-button label="简单按钮1"/>
<link-button>
    <span>简单按钮2</span>
    <link-icon icon="pl-search"/>
</link-button>
```
```js
export default{
    data(){
        return {}
    },
}
```
:::demo-end

:::demo-start
:::title-start
按钮的颜色:color
:::title-end
```html
<link-button label="primary" box-color="primary"/>
<link-button label="success" box-color="success"/>
<link-button label="warn" box-color="warn"/>
<link-button label="error" box-color="error"/>
<link-button label="info" box-color="info"/>
```
```js
export default{
    data(){
        return {}
    },
}
```
:::demo-end

:::demo-start
:::title-start
加载状态的按钮:loading
:::title-end
```html
<link-button label="加载中" loading/>
```
```js
export default{
    data(){
        return {}
    },
}
```
:::demo-end

:::demo-start
:::title-start
左右图标:prefix-icon, suffix-icon
:::title-end
```html
<link-button label="搜索日期"  prefix-icon="pl-date" suffix-icon="pl-search"/>
```
```js
export default{
    data(){
        return {}
    },
}
```
:::demo-end

:::demo-start
:::title-start
只有图标:icon-only
:::title-end
```html
<link-button label="primary" prefix-icon="pl-search" icon-only/>
```
:::demo-end


| 一个普通标题 | 一个普通标题 | 一个普通标题 |
| ------ | ------ | ------ |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |

