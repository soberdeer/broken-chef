import React, { useEffect } from "react";
import cx from "clsx";
import { X } from "react-feather";
import { CSSTransition } from "react-transition-group";
import { ComponentType } from "../ComponentType";
import Title from "../Title/Title";
import classes from "./Modal.module.scss";
import { useClickOutside } from "./use-click-outside";

export interface TextProps {
  className?: string;
  innerClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  htmlFor?: string;
}

export default function Modal<T extends React.ElementType = "p">({
  className,
  innerClassName,
  contentClassName,
  opened = false,
  onClose = Function.prototype,
  title,
  width,
  renderHeader,
  children = null,
  ...others
}: TextProps & ComponentType<T>) {
  // const classes = useStyles();
  // const innerRef = useRef(null);
  const closeOnEscape = (event) => event.key === "Escape" && onClose();
  const ref = useClickOutside(onClose);

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  // useClickOutside(innerRef, onClose);

  return (
    <CSSTransition
      in={opened}
      timeout={100}
      unmountOnExit
      classNames={{
        enter: classes.enter,
        enterActive: classes.enterActive,
        exit: classes.leave,
        exitActive: classes.leaveActive,
      }}
    >
      <div style={{ position: "absolute" }}>
        <div
          className={cx(classes.wrapper, className)}
          {...others}
          data-modal-container
        >
          <div
            className={cx(classes.inner, classes.white, innerClassName)}
            style={{ width }}
            ref={ref}
            data-modal-inner
          >
            {renderHeader && (
              <div className={classes.header} data-modal-header>
                <Title className={classes.title} data-modal-title>
                  {title}
                </Title>
                <button
                  className={classes.close}
                  onClick={onClose}
                  type="button"
                  data-modal-close
                >
                  <X size={14} />
                </button>
              </div>
            )}
            <div
              className={cx(classes.content, contentClassName)}
              data-modal-children
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
