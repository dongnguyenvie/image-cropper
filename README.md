# image-cropper library

An image cropper

```html
npm install @dongnguyen/image-cropper

Template html like that:
<div id="app">
  <div class="container">
    <div class="title">Image cropper</div>
    <form>
      <div class="content" id="content">
        <input type="file" id="avatar" class="file-input" accept="image/x-png,image/jpeg" />
      </div>
    </form>
  </div>
</div>
```

Use like that:

```typescript
const inputFileId = 'avatar';
const imageCropperInstance = new ImageCropper(inputFileId);
```
