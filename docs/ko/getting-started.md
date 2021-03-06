# π μμνκΈ°

## μ€μΉνκΈ°

TOAST UI Editorλ ν¨ν€μ§ λ§€λμ λ₯Ό μ΄μ©νκ±°λ, μ§μ  μμ€ μ½λλ₯Ό λ€μ΄λ°μ μ¬μ©ν  μ μλ€. νμ§λ§ ν¨ν€μ§ λ§€λμ  μ¬μ©μ κΆμ₯νλ€.

### ν¨ν€μ§ λ§€λμ μ¬μ©νκΈ° (npm)

κ° ν¨ν€μ§ λ§€λμ κ° μ κ³΅νλ CLI λκ΅¬λ₯Ό μ¬μ©νλ©΄ μ½κ² ν¨ν€μ§λ₯Ό μ€μΉν  μ μλ€. npm μ¬μ©μ μν΄μ  [Node.js](https://nodejs.org/ko/)λ₯Ό λ―Έλ¦¬ μ€μΉν΄μΌ νλ€.

```sh
$ npm install --save @toast-ui/editor # μ΅μ  λ²μ 
$ npm install --save @toast-ui/editor@<version> # νΉμ  λ²μ 
```

npmμ ν΅ν΄ μ€μΉνλ€λ©΄, μλμ κ°μ κ΅¬μ‘°λ‘ TOAST UI Editorκ° μ€μΉλ κ²μ λ³Ό μ μλ€.

```
- node_modules/
   ββ @toast-ui/editor/
   β     ββ dist/
   β     β    ββ toastui-editor.js
   β     β    ββ toastui-editor-viewer.js
   β     β    ββ toastui-editor.css
   β     β    ββ toastui-editor-viewer.css
   β     β    ββ toastui-editor-only.css
```

### Contents Delivery Network (CDN) μ¬μ©νκΈ°

TOAST UI Editorλ CDNμ ν΅ν΄ μ¬μ©ν  μ μλ€.

```html
...
<body>
  ...
  <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
</body>
...
```

νΉμ  λ²μ μ μ¬μ©νλ €λ©΄ url κ²½λ‘μμ `latest` λμ  λ²μ  νκ·Έλ₯Ό μ¬μ©ν΄μΌ νλ€.

CDNμ μλμ κ°μ λλ ν λ¦¬ κ΅¬μ‘°λ‘ κ΅¬μ±λλ€.

```
- uicdn.toast.com/
   ββ editor/
   β     ββ latest/
   β     β    ββ toastui-editor-all.js
   β     β    ββ toastui-editor-all.min.js
   β     β    ββ toastui-editor-viewer.js
   β     β    ββ toastui-editor-viewer.min.js
   β     β    ββ toastui-editor-editor.js
   β     β    ββ toastui-editor-editor.min.js
   β     β    ββ toastui-editor-editor.css
   β     β    ββ toastui-editor-editor.min.css
   β     β    ββ toastui-editor-viewer.css
   β     β    ββ toastui-editor-viewer.min.css
   β     ββ 3.0.0/
   β     β    ββ ...
```

## μ¬μ©νκΈ°

### μ»¨νμ΄λ μμ μΆκ°

TOAST UI Editor(μ΄ν 'μλν°'λ‘ λͺμ)κ° μμ±λ  μ»¨νμ΄λ μμλ₯Ό μΆκ°νλ€.

```html
...
<body>
  <div id="editor"></div>
</body>
...
```

### μλν° μμ±μ ν¨μ λΆλ¬μ€κΈ°

μλν°λ μμ±μ ν¨μλ₯Ό ν΅ν΄ μΈμ€ν΄μ€λ₯Ό μμ±ν  μ μλ€. μμ±μ ν¨μμ μ κ·ΌνκΈ° μν΄μλ νκ²½μ λ°λΌ μ κ·Όν  μ μλ μΈ κ°μ§ λ°©λ²μ΄ μ‘΄μ¬νλ€.

#### Node.js νκ²½μμμ λͺ¨λ μ¬μ©

- ES6 λͺ¨λ

```javascript
import Editor from '@toast-ui/editor';
```

- CommonJS

```javascript
const Editor = require('@toast-ui/editor');
```

#### λΈλΌμ°μ  νκ²½μμμ namespace μ¬μ©

```javascript
const Editor = toastui.Editor;
```

### CSS νμΌ μΆκ°

μλν° μ¬μ©μ μν΄ CSSνμΌμ μΆκ°ν΄μΌ νλ€. Node.js νκ²½μμλ CSS νμΌμ κ°μ Έμ μ¬μ©νλ©°, CDNμ μ¬μ©ν  λλ html νμΌμ CSS νμΌ μμ‘΄μ±μ μΆκ°νμ¬ μ¬μ©νλ€.

#### Node.js νκ²½

- ES6 λͺ¨λ

```javascript
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor μ€νμΌ
```

- CommonJS

```javascript
require('@toast-ui/editor/dist/toastui-editor.css');
```

#### CDN νκ²½

```html
...
<head>
  ...
  <!-- Editor's Style -->
  <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
</head>
...
```

### μΈμ€ν΄μ€ μμ±νκΈ°

μ΅μκ³Ό ν¨κ» μΈμ€ν΄μ€λ₯Ό μμ±νμ¬ λ€μν APIλ₯Ό νΈμΆν  μ μλ€.

```js
const editor = new Editor({
  el: document.querySelector('#editor')
});
```

![getting-started-01](https://user-images.githubusercontent.com/37766175/121855586-7d576000-cd2e-11eb-9196-0c20270d1221.png)

```js
const editor = new Editor({
  el: document.querySelector('#editor'),
  height: '600px',
  initialEditType: 'markdown',
  previewStyle: 'vertical'
});
```

![getting-started-02](https://user-images.githubusercontent.com/37766175/121464762-71e2fc80-c9ef-11eb-9a0a-7b06e08d3ccb.png)

λνμ μΈ κΈ°λ³Έ μ΅μμ μλμ κ°λ€.

- `height`: μλν° μμ­μ λκΈ° κ°. λ¬Έμμ΄ κ°μ κ°μ§λ€. `300px` | `auto`
- `initialEditType`: μ΅μ΄λ‘ λ³΄μ¬μ€ μλν° νμ. `markdown` | `wysiwyg`
- `initialValue`: μ½νμΈ  μ΄κΈ°κ°. λ°λμ λ§ν¬λ€μ΄ λ¬Έμμ΄ ννμ¬μΌ νλ€.
- `previewStyle`: λ§ν¬λ€μ΄ νλ¦¬λ·° μ€νμΌ. `tab` | `vertical`
- `usageStatistics`: μλν°λ₯Ό μ¬μ©νλ μΉ μ¬μ΄νΈμ _νΈμ€νΈλͺ_μ μ μ‘νλ€. μ΄λ ν μ¬μ©μκ° μλν°λ₯Ό μ¬μ©νκ³  μλμ§ μμ§νκΈ° μν©λλ€. μ΄ μ΅μμ λΆλ¦¬μΈ κ°μ μ§μ νμ¬ λΉνμ±νν  μ μλ€. `true` | `false`

λ λ§μ μ΅μμ [μ¬κΈ°](https://nhn.github.io/tui.editor/latest/ToastUIEditor)μ λ³Ό μ μλ€.

## μμ 

μμ λ [μ¬κΈ°](https://nhn.github.io/tui.editor/latest/tutorial-example01-editor-basic)μ νμΈν  μ μλ€.
