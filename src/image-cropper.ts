import { ImageCropperBase } from './base';

export class ImageCropper extends ImageCropperBase {
  constructor(inputId: any, options: any = {}) {
    super(inputId, options);
    this._replace();
  }
}

(window as any).ImageCropper = ImageCropper;
