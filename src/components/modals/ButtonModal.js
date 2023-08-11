import React, { useState, useEffect } from "react";
import { ModalProvider } from "styled-react-modal";
import { FadingBackground, StyledModal } from "../../helpers/styledComponents";
//   ! All the props, states, etc are managed in the draggable component, then passed as a prop to this modal.
function ButtonModal({
  props,
  setContent,
  drag,
  elementPosition,
  setPosition,
  position,
  fz,
  setFz,
  modalSubmit,
  fw,
  setFw,
  buttonRef,
  isOpen,
  setIsOpen,
}) {
  // ! for modal
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }
  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <div>
        <StyledModal
          isOpen={isOpen}
          afterOpen={afterOpen}
          beforeClose={beforeClose}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
          opacity={opacity}
          backgroundProps={{ opacity }}
        >
          <div className="configuration-modal-wrapper">
            <h1>Label ID - {props.index}</h1>
            <div className="configuration-modal">
              <input
                type="text"
                placeholder="Button name"
                onChange={(ev) => setContent(ev.target.value)}
              />
              <div className="configuration-modal__position">
                <label htmlFor="">
                  Limit (x) - {Math.round(props.bounds.x - drag.x)}
                  <input
                    type="text"
                    placeholder={Math.round(elementPosition.x)}
                    onChange={(ev) =>
                      setPosition({
                        ...position,
                        x:
                          Number(ev.target.value) <
                          Math.round(props.bounds.x - drag.x)
                            ? Number(ev.target.value)
                            : Math.round(props.bounds.x - drag.x),
                      })
                    }
                  />
                </label>
                <label htmlFor="">
                  Limit (y) - {Math.round(props.bounds.y - drag.y)}
                  <input
                    type="text"
                    placeholder={Math.round(elementPosition.y)}
                    onChange={(ev) =>
                      setPosition({
                        ...position,
                        y:
                          Number(ev.target.value) <
                          Math.round(props.bounds.y - drag.y)
                            ? Number(ev.target.value)
                            : Math.round(props.bounds.y - drag.y),
                      })
                    }
                  />
                </label>
              </div>
              <div className="configuration-modal__styling">
                <label htmlFor="">
                  Font size
                  <input
                    type="text"
                    placeholder="Font size"
                    value={fz.replace("px", "")}
                    onChange={(ev) => {
                      setFz(`${ev.target.value}px`);
                    }}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter") modalSubmit();
                    }}
                  />
                </label>
                <label htmlFor="">
                  Font weight
                  <input
                    type="text"
                    placeholder="Font weight"
                    value={fw.replace("px", "")}
                    onChange={(ev) => {
                      setFw(ev.target.value);
                    }}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter") modalSubmit();
                    }}
                  />
                </label>
              </div>
              <div className="configuration-modal__bg">
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (buttonRef.current.style.backgroundColor = "#042a2b")
                      : (buttonRef.current.style.backgroundColor = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (buttonRef.current.style.backgroundColor = "#ef7b45")
                      : (buttonRef.current.style.backgroundColor = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (buttonRef.current.style.backgroundColor = "#cbef43")
                      : (buttonRef.current.style.backgroundColor = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (buttonRef.current.style.backgroundColor = "#c45baa")
                      : (buttonRef.current.style.backgroundColor = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (buttonRef.current.style.backgroundColor = "#6c464f")
                      : (buttonRef.current.style.backgroundColor = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (buttonRef.current.style.backgroundColor = "#fff")
                      : (buttonRef.current.style.backgroundColor = "#fff");
                  }}
                />
              </div>
            </div>
            <div className="configuration-modal__btn-group">
              <button onClick={modalSubmit}>Save changes</button>
              <button onClick={toggleModal}>Close</button>
            </div>
          </div>
        </StyledModal>
      </div>
    </ModalProvider>
  );
}

export default ButtonModal;
