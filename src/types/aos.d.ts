declare global {
  interface Window {
    AOS: {
      init: (options?: {
        duration?: number;
        easing?: string;
        once?: boolean;
        mirror?: boolean;
        offset?: number;
        delay?: number;
        anchorPlacement?: string;
      }) => void;
    };
  }
}

declare const AOS: {
  init: (options?: {
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    offset?: number;
    delay?: number;
    anchorPlacement?: string;
  }) => void;
};

export {};
