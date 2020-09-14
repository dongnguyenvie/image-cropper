import { ImageCropperBase } from './base';

export type InputId = string;

export type ImageCropperCaches = Record<string, ImageCropperBase>;

export type ImageCropperFile = File | null;

export interface ImageCropperOption {
  width: number;
  height: number;
}

export interface ImageCropperEvent {
  elementId: string;
  name: string;
  func: (event: HTMLInputEvent) => void;
}

export interface ImageOptions {
  originWidth: number;
  originHeight: number;
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
