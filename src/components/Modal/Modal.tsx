// @ts-nocheck
import closeImg from "@images/modal-close.svg";
import { ssrMode } from "@mzawadie/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactSVG } from "react-svg";

import { Button } from "..";
import overlayStyles from "../Overlay/scss/index.module.scss";
import styles from "./scss/index.module.scss";

interface IModalProps {
    target?: HTMLElement | null;
    title: string;
    hide: () => void;
    cancelBtnText?: string;
    submitBtnText?: string;
    loading: boolean;
    formId?: string;
    show: boolean;
}

const modalRoot = !ssrMode ? document.getElementById("modal-root") : undefined;

const Modal: React.FC<IModalProps> = ({
    cancelBtnText,
    children,
    hide,
    loading,
    formId = "modal-submit",
    submitBtnText,
    target = modalRoot,
    show,
    title,
}) =>
    target && show
        ? ReactDOM.createPortal(
              <div className={`${overlayStyles.overlay} ${overlayStyles.overlay}--modal`}>
                  <div className={overlayStyles.overlay__modal}>
                      <div className={styles.modal}>
                          <div className={styles.modal__title}>
                              <p>{title}</p>
                              <ReactSVG src={closeImg} className={styles.modal__close} onClick={hide} />
                          </div>

                          <div className={styles.modal__content}>{children}</div>

                          <div className={styles.modal__footer}>
                              {cancelBtnText && (
                                  <button className={styles.modal__cancelBtn} onClick={hide}>
                                      {cancelBtnText}
                                  </button>
                              )}

                              {submitBtnText && (
                                  <Button type="submit" form={formId} disabled={loading} className={styles.modal__button}>
                                      {loading ? "Loading" : submitBtnText}
                                  </Button>
                              )}
                          </div>
                      </div>
                  </div>
              </div>,
              target
          )
        : null;

export default Modal;
