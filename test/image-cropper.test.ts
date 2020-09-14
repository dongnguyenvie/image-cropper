import { ImageCropper } from '../src';

describe('image-cropper', () => {
  document.body.innerHTML = `
    <div id="app">
        <div class="container">
            <div class="title">
                Image cropper
            </div>
            <form>
                <div class="content" id="content">
                    <input type="file" id="avatar" class="file-input" accept="image/x-png,image/jpeg" />
                </div>
            </form>
        </div>
    </div>
  `;

  it('Initial with option', () => {
    const inputId = 'avatar';
    let _instance = new ImageCropper(inputId, { width: 50 });
    expect(_instance.getCaches).toHaveProperty(inputId);
  });

  it('Initial without option', () => {
    const inputId = 'avatar';
    let _instance = new ImageCropper(inputId);
    expect(_instance.getCaches).toHaveProperty(inputId);
  });
});
