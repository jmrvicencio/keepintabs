import { MouseEvent, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { PopupMenu } from '../types';
import { useAtom } from 'jotai';
import { buttonHandleKeypress, buttonRole } from '@/util/buttonHandleKeypress';

import { X } from 'lucide-react';
import Panel from '../../../components/neubrutalist/Panel';
import { usePopupOverlay } from '../hooks/usePopupOverlay';
import { MainContentRefAtom } from '@/store/mainArea';

const Menu = ({ popup }: { popup: PopupMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [mainContentRef] = useAtom(MainContentRefAtom);
  const ref = popup.reference?.current?.getBoundingClientRect();
  const mainContainer = mainContentRef?.current;
  const menuRect = menuRef.current?.getBoundingClientRect();
  const mainRect = mainContentRef?.current?.getBoundingClientRect();
  const padding = 12;

  const [styleY, setStyleY] = useState<{ top?: number; bottom?: number }>({
    top: (ref?.bottom ?? 0) + (mainContentRef?.current?.scrollTop ?? 0),
  });

  const screen = {
    top: mainContainer?.scrollTop ?? 0,
    bottom: (mainContainer?.scrollTop ?? 0) + window.innerHeight,
    left: 0,
    right: window.innerWidth,
  };

  useLayoutEffect(() => {
    const isOverflowingY = (menuRect?.bottom ?? 0) + padding < screen.bottom;

    if (isOverflowingY) {
      setStyleY({
        top: (ref?.bottom ?? 0) + padding,
      });
    } else {
      setStyleY({
        bottom: 0 + padding,
      });
    }
  }, [popup.reference, menuRef.current, mainContentRef?.current]);

  // ----------------------------
  // Event Listeners
  // ----------------------------

  const handlePopupClicked = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={menuRef}
      style={{
        ...styleY,
        right: screen.right - (ref?.right ?? 0),
      }}
      className="absolute flex min-w-60 flex-col rounded-sm bg-white py-2"
      onClick={handlePopupClicked}
    >
      {popup.options.map((option, i) => (
        <div
          {...buttonRole(option.action)}
          key={i}
          className="border-ink-300/40 hover:bg-wheat-400/25 relative cursor-pointer px-4 py-3 transition-colors not-last:border-b"
        >
          {option.icon && (
            <option.icon className="stroke-ink-800/85 absolute top-1/2 left-4 aspect-square w-4 -translate-y-1/2" />
          )}
          {option.label}
        </div>
      ))}
    </div>
  );
};

const PopupOverlay = () => {
  const location = useLocation();
  const { showPopup, setShowPopup, popup, resetPopup } = usePopupOverlay();

  useEffect(() => {
    setShowPopup(false);
  }, [location.pathname]);

  const handlePopupClicked = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    resetPopup();
    if (popup.closeCallback) popup.closeCallback();
  };

  const padding = useMemo(() => {
    const style: { x?: number; y?: number } = {};

    if (popup.type != 'popup-overlay') return style;

    if (popup.options?.padding) {
      style.x = popup.options.padding.x;
      style.y = popup.options.padding.y;
    } else {
      style.x = 4;
      style.y = 4;
    }

    return style;
  }, [popup]);

  return showPopup ? (
    popup.type == 'popup-overlay' ? (
      <div
        data-testid="popup-overlay"
        className="absolute z-40 flex h-dvh w-dvw items-center justify-center bg-black/70 px-2"
        id="testing"
        onClick={handleClose}
      >
        <div
          data-testid="popup-menu"
          className="w-100 rounded-2xl border border-black bg-white"
          onClick={handlePopupClicked}
        >
          <div className="border-ink-300/40 relative flex items-center justify-center border-b p-4 font-semibold">
            {popup.title}
            <div
              className={`bg-accent-200 absolute right-2 cursor-pointer rounded-xl border p-1`}
              onClick={handleClose}
            >
              <X />
            </div>
          </div>
          <div
            style={{
              padding: `${padding.y! / 4}rem ${padding.x! / 4}rem `,
            }}
          >
            {popup.body}
          </div>
        </div>
      </div>
    ) : popup.type == 'popup-confirmation' ? (
      <div
        data-testid="popup-overlay"
        className="absolute z-40 flex h-dvh w-dvw items-center justify-center bg-black/70 px-2"
        id="testing"
        onClick={handleClose}
      >
        <div
          data-testid="popup-menu"
          className="w-100 rounded-2xl border border-black bg-white"
          onClick={handlePopupClicked}
        >
          <div className="border-ink-300/40 relative flex items-center justify-center border-b p-4 font-semibold">
            {popup.title}
          </div>
          <div className="flex flex-col gap-4 px-8 py-8">
            <p>{popup.body}</p>
            <div className="flex flex-row justify-end gap-2">
              <button type="button" className="cursor-pointer p-2 px-4" onClick={handleClose}>
                Cancel
              </button>
              <Panel
                className="cursor-pointer"
                padding="py-1 px-4"
                bgColor="bg-accent-200"
                onClick={() => {
                  if (popup.confirmCallback) popup.confirmCallback();
                  handleClose();
                }}
              >
                Yes
              </Panel>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div data-testid="popup-overlay" className="absolute inset-0 z-40 bg-black/70" onClick={handleClose}>
        <Menu popup={popup} />
      </div>
    )
  ) : (
    <></>
  );
};

export default PopupOverlay;
