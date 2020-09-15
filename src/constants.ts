export const IC_PREFIX = 'ic-';
export const IC_VIEW_PREFIX = 'ic-view-';

export const TEMPLATE =
  '<div class="image-cropper-container" id="@%icId%@">' +
  '<div class="image-view" id="@%icViewId%@" style="width: @%width%@px;height: @%height%@px;"></div>' +
  '<label for="@%inputId%@" class="file-label">' +
  'Chọn ảnh' +
  '</label>' +
  '</div>';

export const DEFAULT_OPTIONS = {
  width: 200,
  height: 200
};

export const deepClone = <T = any>(val: T): T => {
  return JSON.parse(JSON.stringify(val));
};

export const zoom = {
  max: 5,
  min: 1,
  step: 1
};

export const getEmptyImageProperties = () => {
  return {
    width: 0,
    height: 0,
    size: 0
  };
};

export const getEmptyPosition = (imageBoxWidth: number, imageBoxHeight: number) => {
  return {
    x: 0,
    y: 0,
    minWidth: 1,
    size: {
      ratio: 1,
      width: imageBoxWidth,
      height: imageBoxHeight
    }
  };
};
