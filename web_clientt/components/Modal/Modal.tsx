// import { useCallback, useEffect, useMemo, useRef } from "react";
// import styles from "../../styles/Modal.module.scss";

// export default function Modal({ open, locked, onClose, children, ...props }) {
//   const modalRef = useRef(null);

//   // work out which classes should be applied to the dialog element
//   const dialogClasses = useMemo(() => {
//     const _arr = [styles["modal"]];
//     if (!open) _arr.push(styles["modal--closing"]);

//     return _arr.join(" ");
//   }, [open]);

//   // Eventlistener: trigger onclose when cancel detected
//   const onCancel = useCallback(
//     (e) => {
//       e.preventDefault();
//       if (!locked) onClose();
//     },
//     [locked, onClose]
//   );

//   // Eventlistener: trigger onclose when click outside
//   const onClick = useCallback(
//     ({ target }) => {
//       const { current: el } = modalRef;
//       if (target === el && !locked) onClose();
//     },
//     [locked, onClose]
//   );

//   // Eventlistener: trigger close click on anim end
//   const onAnimEnd = useCallback(() => {
//     const { current: el } = modalRef;
//     if (!open) el.close();
//   }, [open]);

//   // when open changes run open/close command
//   useEffect(() => {
//     const { current: el } = modalRef;
//     if (open) el.showModal();
//   }, [open]);

//   return (
//     <dialog
//       ref={modalRef}
//       className={dialogClasses}
//       onClose={onClose}
//       onCancel={onCancel}
//       onClick={onClick}
//       onAnimationEnd={onAnimEnd}
//     >
//       <div className={styles["modal__container"]}>{children}</div>
//     </dialog>
//   );
// }
