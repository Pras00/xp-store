import styles from "./Modal.module.scss";
import { useRef } from "react";

type Proptypes = {  
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = (props: Proptypes) => {
  const { children, onClose } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div className={styles.modal} ref={modalRef} onClick={handleClickOutside}>
      <div className={styles.modal__content}>
        {children}
      </div>
    </div>
  )
}

export default Modal;