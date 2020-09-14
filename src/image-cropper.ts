import { ImageCropperBase } from './base';
import { InputId, ImageCropperOption } from './types';

export class ImageCropper extends ImageCropperBase {
  constructor(inputId: InputId, options: Partial<ImageCropperOption> = {}) {
    super(inputId, options);
    this._replace();
  }

  get getCaches() {
    return this._caches;
  }
}

(window as any).ImageCropper = ImageCropper;
