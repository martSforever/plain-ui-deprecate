### 基本用法
```html
<link-button label="基本用法"/>
<link-button label="基本用法"/>
<link-button label="基本用法"/>
```
```js
export default{
    methods: {
        _click() {
            console.log("click");
        },
    }
}
```
```scss
.demo-button {
    .link-button {
        background-color: white;
    }
}
```
---
### 颜色
```html
<link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index"/>
```
```js
export default{
    methods: {
        _click() {
            console.log("color");
        },
    }
}
```
```scss
.demo-button {
    .link-button {
        background-color: blue;
    }
}
```

