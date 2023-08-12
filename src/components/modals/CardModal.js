import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import { FadingBackground, StyledModal } from "../../helpers/styledComponents";
//   ! All the props, states, etc are managed in the draggable component, then passed as a prop to this modal.
const CardModal = ({
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
  cardRef,
  isOpen,
  setIsOpen,
}) => {
  const [opacity, setOpacity] = useState(0);

  const toggleModal = e => {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  const beforeClose = () => {
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
                placeholder=""
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="configuration-modal__position">
                <label htmlFor="">
                  Limit (x) - {Math.round(props.bounds.x - drag.x)}
                  <input
                    type="text"
                    placeholder={Math.round(elementPosition.x)}
                    onChange={(e) =>
                      setPosition({
                        ...position,
                        x:
                          Number(e.target.value) <
                          Math.round(props.bounds.x - drag.x)
                            ? Number(e.target.value)
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
                    onChange={(e) =>
                      setPosition({
                        ...position,
                        y:
                          Number(e.target.value) <
                          Math.round(props.bounds.y - drag.y)
                            ? Number(e.target.value)
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
                    onChange={(e) => {
                      setFz(`${e.target.value}px`);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") modalSubmit();
                    }}
                  />
                </label>
                <label htmlFor="">
                  Font weight
                  <input
                    type="text"
                    placeholder="Font weight"
                    value={fw.replace("px", "")}
                    onChange={(e) => {
                      setFw(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") modalSubmit();
                    }}
                  />
                </label>
              </div>
              <div className="configuration-modal__bg">
                <input
                  type="radio"
                  name="bg"
                  onChange={(e) => {
                    e.target.checked
                      ? (cardRef.current.style.color = "#042a2b")
                      : (cardRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(e) => {
                    e.target.checked
                      ? (cardRef.current.style.color = "#ef7b45")
                      : (cardRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (cardRef.current.style.color = "#cbef43")
                      : (cardRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (cardRef.current.style.color = "#c45baa")
                      : (cardRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (cardRef.current.style.color = "#6c464f")
                      : (cardRef.current.style.color = "#fff");
                  }}
                />
                <input
                  type="radio"
                  name="bg"
                  onChange={(ev) => {
                    ev.target.checked
                      ? (cardRef.current.style.color = "#fff")
                      : (cardRef.current.style.color = "#fff");
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

export default CardModal;
