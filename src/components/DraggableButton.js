import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import dots from "../assets/draggable-dots.svg";
import ButtonModal from "./modals/ButtonModal";
gsap.registerPlugin(Draggable);
function DraggableButton(props) {
  // ! Ref for the draggable div
  const dragRef = useRef(null);
  const buttonRef = useRef(null);
  // ! State to change the bounds
  const [bound, setBound] = useState("body");
  // ! State to update the content
  const [content, setContent] = useState("Button text");
  // ! State to manage the positions
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // ! State to manage the element's left and top position
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  // ! element's current position, to live update in the modal
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  // ! state for dimensions of the drag component
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  // ! Classname setting for dropping
  const [buttonClass, setButtonClass] = useState("drag drag-button");
  const [borderClass, setBorderClass] = useState("no-border");
  // ! State to manage the font size/weight
  const [fz, setFz] = useState("18px");
  const [fw, setFw] = useState("400");
  // ! initial render shift for textlabel
  const [firstSet, setFirstSet] = useState(true);
  // ! Show/hide inputbox
  const [showInput, setShowInput] = useState(false);
  const shiftTag = () => {
    gsap.to(dragRef.current, { y: "+=140", duration: 0 });
  };
  useEffect(() => {
    const elementPos = dragRef.current.getBoundingClientRect();
    // console.log("for button", elementPos);
    Draggable.create(dragRef.current, {
      onDragEnd: async () => {
        await setBound(props.boundRef.current);
        console.log("elementPos");
      },
      bounds: bound,
    });
    // ! Getting the element's position in the dom

    setLeft(elementPos.left);
    setTop(elementPos.top - 140);
    setDrag({ x: elementPos.width, y: elementPos.height - 140 });
  }, []);
  // ! effect for bound change
  useEffect(() => {
    Draggable.create(dragRef.current, {
      onDragEnd: function () {
        setBound(props.boundRef.current);
        setButtonClass("drag drag-button--dropped");
        const elementPos = dragRef.current.getBoundingClientRect();
        setElementPosition({ x: elementPos.x, y: elementPos.y });
        setPosition({
          x: Math.round(elementPosition.x),
          y: Math.round(elementPosition.y),
        });
        setShowInput(true);
        if (firstSet) {
          setFirstSet(false);
          shiftTag();
        }
        if (this.hitTest(props.bin.current, "30%")) {
          dragRef.current.style.display = "none";
        }
      },
      onPress: () => {
        setBorderClass("red-border");
      },
      onRelease: () => {
        setBorderClass("no-border");
      },
      bounds: bound,
      type: "x,y",
      liveSnap: {
        // ! snaps to the closest increment of 10 by default.
        x: function (value) {
          return Math.round(value / 10) * 10;
        },
        y: function (value) {
          return Math.round(value / 10) * 10;
        },
      },
    });
  }, [bound, firstSet, props.grid]);
  useEffect(() => {
    if (!props.grid) {
      Draggable.create(dragRef.current, {
        liveSnap: false,
        onDragEnd: function () {
          setBound(props.boundRef.current);
          setButtonClass("drag drag-button--dropped");
          const elementPos = dragRef.current.getBoundingClientRect();
          setElementPosition({ x: elementPos.x, y: elementPos.y });
          setPosition({
            x: Math.round(elementPosition.x),
            y: Math.round(elementPosition.y),
          });
          setShowInput(true);
          if (firstSet) {
            setFirstSet(false);
            shiftTag();
          }
          if (this.hitTest(props.bin.current, "30%")) {
            dragRef.current.style.display = "none";
          }
        },
      });
    }
  }, [props.grid]);
  // ! for modal
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
    console.log(isOpen);
  }

  function modalSubmit() {
    if (position.x !== 0 && position.y !== 0) {
      gsap.to(dragRef.current, {
        x: position.x - left,
        y: position.y - top,
      });
    }
    buttonRef.current.style.fontSize = fz;
    buttonRef.current.style.fontWeight = fw;
    toggleModal();
  }
  return (
    <div>
      <div className={buttonClass} ref={dragRef} onClick={toggleModal}>
        <img src={dots} alt="" />
        {!showInput ? <h2 className={borderClass}>{content}</h2> : null}
        {showInput ? (
          <button
            type="text"
            placeholder="input text here"
            className="btn"
            ref={buttonRef}
          >
            {content}
          </button>
        ) : null}
      </div>
      <ButtonModal
        props={props}
        setContent={setContent}
        drag={drag}
        elementPosition={elementPosition}
        setPosition={setPosition}
        position={position}
        fz={fz}
        setFz={setFz}
        modalSubmit={modalSubmit}
        fw={fw}
        setFw={setFw}
        buttonRef={buttonRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default DraggableButton;
