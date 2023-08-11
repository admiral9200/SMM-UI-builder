import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import { FadingBackground, StyledModal } from "../../helpers/styledComponents";
//   ! All the props, states, etc are managed in the draggable component, then passed as a prop to this modal.
function LabelModal({
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
  labelRef,
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
                placeholder="Label name"
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
                      ? (labelRef.current.style.color = "#042a2b")
                      : (labelRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (labelRef.current.style.color = "#ef7b45")
                      : (labelRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (labelRef.current.style.color = "#cbef43")
                      : (labelRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (labelRef.current.style.color = "#c45baa")
                      : (labelRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (labelRef.current.style.color = "#6c464f")
                      : (labelRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (labelRef.current.style.color = "#fff")
                      : (labelRef.current.style.color = "#fff");
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

export default LabelModal;
