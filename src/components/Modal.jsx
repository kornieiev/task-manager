import { forwardRef, useImperativeHandle, useRef } from "react";

import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
      close() {
        dialogRef.current.close();
      },
    };
  });

  return createPortal(
    <dialog
      className='flex-col hidden gap-5 p-12 mx-auto my-auto rounded-2xl backdrop:bg-black/50 open:flex'
      ref={dialogRef}
    >
      {children}
      <form className='flex justify-center' method='dialog'></form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
