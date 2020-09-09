import { TEMPLATE, IC_PREFIX, IC_VIEW_PREFIX, DEFAULT_OPTIONS } from './constants';

export abstract class ImageCropperBase {
  protected readonly _instances: any = {};
  protected readonly _caches: any = {};
  protected readonly _options: any = {};
  protected readonly _inputId: any = null;
  protected readonly _events: any = [];
  protected _file: any = null;
  protected _imageOptions: any = {};

  constructor(inputId: any, options: any) {
    this._inputId = inputId;
    this._options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  protected _replace() {
    if (this._caches[this._inputId]) {
      return this._caches[this._inputId];
    }

    var inputElement = document.getElementById(this._inputId);

    if (!inputElement) {
      console.log('Input element not found');
      return null;
    }

    this._caches[this._inputId] = this;

    this._drawTemplate(); // vẽ giao diện
    this._addEvents();
    this._listenEvents();
  }

  protected replaceOptions() {}

  protected _drawTemplate() {
    var inputElement = document.getElementById(this._inputId);
    var html = TEMPLATE.replace(/@%inputId%@/g, this._inputId)
      .replace(/@%icId%@/g, IC_PREFIX + this._inputId)
      .replace(/@%icViewId%@/g, IC_VIEW_PREFIX + this._inputId)
      .replace(/@%width%@/g, this._options.width)
      .replace(/@%height%@/g, this._options.height);
    inputElement!.insertAdjacentHTML('beforebegin', html);
    inputElement!.style.display = 'none';
  }

  protected _listenEvents() {
    this._events.forEach(function (event: any) {
      var element = document.getElementById(event.elementId);
      if (!element) {
        console.log('Element #' + event.elementId + ' not found');
        return;
      }
      element.addEventListener(event.name, event.func);
    });
  }

  protected _removeEventsListener() {
    this._events.events.forEach(function (event: any) {
      var element = document.getElementById(event.elementId);
      if (!element) {
        console.log('Element #' + event.elementId + ' not found');
        return;
      }
      element.removeEventListener(event.name, event.func);
    });
  }

  protected _addImageChangeEvents() {
    var inputElement = document.getElementById(this._inputId);
    var onChangeFile = (event: any) => {
      const files = event.target.files;
      this._file = files.length > 0 ? files[0] : null;
      this._changeImage();
    };
    this._events.push({
      elementId: this._inputId,
      name: 'change',
      func: onChangeFile,
    });
  }

  protected _changeImage() {
    let img: any;
    img = new Image();
    img.onload = () => {
      var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      ctx!.drawImage(img, 0, 0);
      this._imageOptions.originWidth = width;
      this._imageOptions.originHeight = height;

      this._setImageToView(canvas.toDataURL());
    };
    img.src = URL.createObjectURL(this._file);
  }

  protected _setImageToView(data: any) {
    var element = document.getElementById(IC_VIEW_PREFIX + this._inputId);
    if (element && element.tagName == 'DIV') {
      element.style.backgroundImage = "url('" + data + "')";
    } else {
      console.log('Image view not set');
    }
  }

  protected _addEvents() {
    this._addImageChangeEvents();
  }
}
