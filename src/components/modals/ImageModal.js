import React, { useState } from "react";

import { ModalProvider } from "styled-react-modal";
import { FadingBackground, StyledModal } from "../../helpers/styledComponents";
//   ! All the props, states, etc are managed in the draggable component, then passed as a prop to this modal.
function ImageModal({
  props,
  setContent,
  drag,
  elementPosition,
  setPosition,
  position,
  checkboxRef,
  modalSubmit,
  setHtChange,
  ht,
  setHt,
  wd,
  setWd,
  setWdChange,
  aspect,
  ratio,
  setAspect,
  setFile,
  setRatio,
  htChange,
  wdChange,
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
            <h1>Image label ID - {props.index}</h1>
            <div className="configuration-modal">
              <input
                type="text"
                placeholder="Image title"
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
                  Height
                  <input
                    type="text"
                    placeholder="height"
                    disabled={checkboxRef?.current?.checked}
                    value={ht.replace("px", "")}
                    onChange={(ev) => {
                      setHt(`${ev.target.value}px`);
                      setHtChange(true);
                    }}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter") modalSubmit("ht");
                    }}
                  />
                </label>
                <label htmlFor="">
                  Width
                  <input
                    type="text"
                    placeholder="width"
                    value={wd.replace("px", "")}
                    onChange={(ev) => {
                      setWd(`${ev.target.value}px`);
                      setWdChange(true);
                      if (aspect) {
                        console.log(aspect, ratio);
                        setHt(`${ev.target.value / ratio}px`);
                        setHtChange(true);
                      }
                    }}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter") {
                        if (aspect) {
                          modalSubmit("htwd");
                        }
                        modalSubmit("wd");
                      }
                    }}
                  />
                </label>
                <label class="aspect-ratio-checkbox">
                  Preserve aspect ratio
                  <input
                    ref={checkboxRef}
                    type="checkbox"
                    onChange={() => {
                      if (checkboxRef.current.checked) {
                        setAspect(true);
                      } else {
                        setAspect(false);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            <input
              type="file"
              className="file-upload"
              onChange={(ev) => {
                setFile(URL.createObjectURL(ev.target.files[0]));
                var img = new Image();

                img.onload = function () {
                  var height = img.height;
                  var width = img.width;
                  console.log(height, width);
                  setRatio(width / height);
                };
                img.src = URL.createObjectURL(ev.target.files[0]);
              }}
            />
            <div className="configuration-modal__btn-group">
              <button
                onClick={() => {
                  if (htChange && wdChange) {
                    modalSubmit("htwd");
                    setHtChange(false);
                    setWdChange(false);
                  } else if (htChange) {
                    modalSubmit("ht");
                    setHtChange(false);
                  } else if (wdChange) {
                    modalSubmit("wd");
                    setWdChange(false);
                  } else {
                    modalSubmit();
                  }
                }}
              >
                Save changes
              </button>
              <button onClick={toggleModal}>Close</button>
            </div>
          </div>
        </StyledModal>
      </div>
    </ModalProvider>
  );
}

export default ImageModal;
