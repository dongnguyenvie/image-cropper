import { TEMPLATE, IC_PREFIX, IC_VIEW_PREFIX, DEFAULT_OPTIONS, deepClone } from './constants';
import { ImageCropperCaches, ImageCropperOption, InputId, ImageCropperEvent, HTMLInputEvent, ImageCropperFile, ImageOptions } from './types';

export abstract class ImageCropperBase {
  protected readonly _caches: ImageCropperCaches = {};
  protected readonly _options!: ImageCropperOption;
  protected readonly _inputId!: InputId;
  protected readonly _events: ImageCropperEvent[] = [];
  protected _file: ImageCropperFile = null;
  protected _imageOptions: ImageOptions = {
    orientation: 1
  } as ImageOptions;

  constructor(inputId: InputId, options: Partial<ImageCropperOption>) {
    this._inputId = inputId;
    this._options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
  }

  protected _replace() {
    if (this._caches[this._inputId]) {
      return this._caches[this._inputId];
    }

    const inputElement = document.getElementById(this._inputId);

    if (!inputElement) {
      throw new Error('Input element not found');
    }

    const cloneInstance = deepClone(this);
    this._caches[this._inputId] = cloneInstance;

    this._drawTemplate(); // draw ui
    this._addEvents();
    this._listenEvents();
  }

  protected replaceOptions() {}

  protected _drawTemplate() {
    const inputElement = document.getElementById(this._inputId);
    const html = TEMPLATE.replace(/@%inputId%@/g, this._inputId)
      .replace(/@%icId%@/g, IC_PREFIX + this._inputId)
      .replace(/@%icViewId%@/g, IC_VIEW_PREFIX + this._inputId)
      .replace(/@%width%@/g, String(this._options.width))
      .replace(/@%height%@/g, String(this._options.height));
    inputElement!.insertAdjacentHTML('beforebegin', html);
    inputElement!.style.display = 'none';
  }

  protected _listenEvents() {
    this._events.forEach(function(event: any) {
      const element = document.getElementById(event.elementId);
      if (!element) {
        console.log('Element #' + event.elementId + ' not found');
        return;
      }
      element.addEventListener(event.name, event.func);
    });
  }

  protected _removeEventsListener() {
    this._events.forEach(event => {
      const element = document.getElementById(event.elementId);
      if (!element) {
        console.log('Element #' + event.elementId + ' not found');
        return;
      }
      element.removeEventListener(event.name, event.func as EventListenerOrEventListenerObject);
    });
  }

  protected _addImageChangeEvents() {
    // const inputElement = document.getElementById(this._inputId);
    const onChangeFile = (event: HTMLInputEvent) => {
      const files = event.target.files;
      if (files!.length > 0) {
        this._file = files![0];
        this._getOrientation(orientation => {
          this._imageOptions.orientation = orientation;
          this._changeImage();
        });
      } else {
        this._file = null;
        this._setImageToView('');
      }
    };
    this._events.push({
      elementId: this._inputId,
      name: 'change',
      func: onChangeFile
    });
  }

  protected _getOrientation(callback: (orientation: number) => void) {
    let reader = new FileReader();
    reader.onload = function(ev: ProgressEvent) {
      const view = new DataView((ev.target as any).result);
      if (view.getUint16(0, false) != 0xffd8) {
        return callback(-2);
      }
      let length = view.byteLength,
        offset = 2;
      while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xffe1) {
          if (view.getUint32((offset += 2), false) != 0x45786966) {
            return callback(-1);
          }
          const little = view.getUint16((offset += 6), false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + i * 12, little) == 0x0112) {
              return callback(view.getUint16(offset + i * 12 + 8, little));
            }
          }
        } else if ((marker & 0xff00) != 0xff00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(this._file!);
  }

  protected _changeImage() {
    let img = new Image();
    img.onload = () => {
      const width = img.width,
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

  protected _setImageToView(data: string) {
    const element = document.getElementById(IC_VIEW_PREFIX + this._inputId);
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
