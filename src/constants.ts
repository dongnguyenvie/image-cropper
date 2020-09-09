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
  height: 200,
};
