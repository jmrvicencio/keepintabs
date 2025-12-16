import { ExoticComponent, ReactNode, RefObject } from 'react';

export type Popup = PopupOverlay | PopupMenu | PopupConfirmation;

export interface PopupOverlay {
  type: 'popup-overlay';
  title?: string;
  body: ReactNode;
  options?: {
    padding?: {
      x: number;
      y: number;
    };
  };
  closeCallback?: () => any;
}

export interface PopupConfirmation {
  type: 'popup-confirmation';
  title?: string;
  body?: string;
  confirmCallback?: () => any;
  closeCallback?: () => any;
}

export interface PopupMenu {
  type: 'menu';
  reference?: RefObject<HTMLElement | null>;
  options: {
    label: string;
    icon: ExoticComponent;
    action?: () => any;
  }[];
  closeCallback?: () => any;
}
