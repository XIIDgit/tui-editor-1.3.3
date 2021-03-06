# π λ·°μ΄

## λ·°μ΄λ λ¬΄μμΌκΉ?

TOASE UI Editor(μ΄ν 'Editor'λΌκ³  λͺμ)λ μλν°λ₯Ό λ‘λ©νμ§ μκ³  _λ§ν¬λ€μ΄_ μ½νμΈ λ₯Ό λ³΄μ¬μ€ μ μλλ‘ **λ·°μ΄**λ₯Ό μ κ³΅νλ€. λ·°μ΄κ° μλν°λ³΄λ€ ν¨μ¬ **λ κ°λ³λ€**.

## λ·°μ΄ μ¬μ©νκΈ°

λ·°μ΄λ₯Ό μ¬μ©νλ λ°©λ²μ μλν°μ μ μ¬νλ€.

> μ°Έκ³ . [Getting Started](https://github.com/nhn/tui.editor/blob/master/docs/ko/getting-started.md)

### μ»¨νμ΄λ μμ μΆκ°

λ·°μ΄κ° μμ±λ  μ»¨νμ΄λ μμλ₯Ό μΆκ°νλ€.

```html
...
<body>
  <div id="viewer"></div>
</body>
...
```

### λ·°μ΄ μμ±μ ν¨μ λΆλ¬μ€κΈ°

λ·°μ΄λ μμ±μ ν¨μλ₯Ό ν΅ν΄ μΈμ€ν΄μ€λ₯Ό μμ±ν  μ μλ€. μμ±μ ν¨μμ μ κ·ΌνκΈ° μν΄μλ νκ²½μ λ°λΌ μ κ·Όν  μ μλ μΈ κ°μ§ λ°©λ²μ΄ μ‘΄μ¬νλ€.

#### Node.js νκ²½μμμ λͺ¨λ μ¬μ©

- ES6 λͺ¨λ

```javascript
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
```

- CommonJS

```javascript
const Viewer = require('@toast-ui/dist/toastui-editor-viewer');
```

#### λΈλΌμ°μ  νκ²½μμμ namespace μ¬μ©

```javascript
const Viewer = toastui.Editor;
```

CDNμμ λ·°μ΄λ λ€μμ²λΌ μ¬μ©νλ€.

```html
...
<body>
  ...
  <script src="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.js"></script>
</body>
...
```

### CSS νμΌ μΆκ°

λ·°μ΄ μ¬μ©μ μν΄ CSSνμΌμ μΆκ°ν΄μΌ νλ€. Node.js νκ²½μμλ CSS νμΌμ κ°μ Έμ μ¬μ©νλ©°, CDNμ μ¬μ©ν  λλ html νμΌμ CSS νμΌ μμ‘΄μ±μ μΆκ°νμ¬ μ¬μ©νλ€.

#### Using in Node Environment

- ES6 λͺ¨λ

```javascript
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
```

- CommonJS

```javascript
require('@toast-ui/editor/dist/toastui-editor-viewer.css');
```

#### CDN νκ²½

```html
...
<head>
  ...
  <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css" />
</head>
...
```

### μΈμ€ν΄μ€ μμ±νκΈ°

μ΅μκ³Ό ν¨κ» μΈμ€ν΄μ€λ₯Ό μμ±νμ¬ λ€μν APIλ₯Ό νΈμΆν  μ μλ€.

```js
const viewer = new Viewer({
  el: document.querySelector('#viewer'),
  height: '600px',
  initialValue: '# hello'
});
```

![viewer-01](https://user-images.githubusercontent.com/37766175/121862304-a3ccc980-cd35-11eb-92c8-02b0e6fcf3cf.png)

λνμ μΈ κΈ°λ³Έ μ΅μμ μλμ κ°λ€.

- `height`: μλν° μμ­μ λκΈ° κ°. λ¬Έμμ΄ κ°μ κ°μ§λ€. `300px` | `auto`
- `initialValue`: μ½νμΈ  μ΄κΈ°κ°. λ°λμ λ§ν¬λ€μ΄ λ¬Έμμ΄ ννμ¬μΌ νλ€.

λ λ§μ μ΅μμ [μ¬κΈ°](https://nhn.github.io/tui.editor/latest/ToastUIEditorViewer)μ λ³Ό μ μλ€.

## λ·°μ΄λ₯Ό μ¬μ©νλ λ€λ₯Έ λ°©λ²

μλν°μ μ΄λ―Έ λ·°μ΄ κΈ°λ₯μ΄ ν¬ν¨λμ΄ μμΌλ―λ‘ μλν°μ λ·°μ΄κ° λμμ λ‘λλμ§ μλλ‘ μ£Όμν΄μΌ νλ€. λν `Editor.factory()` μ μ  λ©μλλ₯Ό μ¬μ©νμ¬ λ·°μ΄λ₯Ό μ¬μ©ν  μ μλ€. μλ μ½λμ²λΌ `viewer` μ΅μμ `true`λ‘ μ€μ νλ©΄ λ·°μ΄κ° μμ±λλ€.

```js
import Editor from '@toast-ui/editor';

const viewer = Editor.factory({
  el: document.querySelector('#viewer'),
  viewer: true,
  height: '500px',
  initialValue: '# hello'
});
```

## μμ 

μμ λ [μ¬κΈ°](https://nhn.github.io/tui.editor/latest/tutorial-example04-viewer)μ νμΈν  μ μλ€.
