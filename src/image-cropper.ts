import { ImageCropperBase } from './base';
import { InputId, ImageCropperOption } from './types';
import { IC_PREFIX } from './constants';

export class ImageCropper extends ImageCropperBase {
  constructor(inputId: InputId, options: Partial<ImageCropperOption> = {}) {
    super(inputId, options);
    this._replace();
  }

  get getCaches() {
    return this._caches;
  }

  public destroy() {
    const id = IC_PREFIX + this._inputId;
    const imageCropperContainer = document.getElementById(id);
    if (imageCropperContainer) {
      imageCropperContainer.remove();
    }
    delete this._caches[this._inputId];
  }
}

(window as any).ImageCropper = ImageCropper;
