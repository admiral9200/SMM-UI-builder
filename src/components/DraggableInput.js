import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import dots from "../assets/draggable-dots.svg";
import InputModal from "./modals/InputModal";
gsap.registerPlugin(Draggable);
function DraggableInput(props) {
  // ! Ref for the draggable div
  const dragRef = useRef(null);
  const inputRef = useRef(null);
  // ! State to change the bounds
  const [bound, setBound] = useState("body");
  // ! State to update the content
  const [content, setContent] = useState("Input text");
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
  const [inputClass, setInputClass] = useState("drag drag-input");
  const [borderClass, setBorderClass] = useState("inputBox no-border");
  // ! State to manage the font size/weight
  const [fz, setFz] = useState("18px");
  const [fw, setFw] = useState("400");
  const [ht, setHt] = useState("max-content");
  const [wd, setWd] = useState("250px");
  // ! initial render shift for textlabel
  const [firstSet, setFirstSet] = useState(true);
  // ! Show/hide inputbox
  const [showInput, setShowInput] = useState(false);
  const shiftTag = () => {
    gsap.to(dragRef.current, { y: "+=70", duration: 0 });
  };
  useEffect(() => {
    const elementPos = dragRef.current.getBoundingClientRect();
    // console.log("for input", elementPos);
    Draggable.create(dragRef.current, {
      onDragEnd: () => {
        setBound(props.boundRef.current);
        console.log("elementPos");
      },
      bounds: bound,
    });
    // ! Getting the element's position in the dom

    setLeft(elementPos.left);
    setTop(elementPos.top - 70);
    setDrag({ x: elementPos.width, y: elementPos.height - 70 });
  }, []);
  // ! effect for bound change
  useEffect(() => {
    Draggable.create(dragRef.current, {
      onDragEnd: function () {
        setBound(props.boundRef.current);
        setInputClass("drag drag-input--dropped");
        const elementPos = dragRef.current.getBoundingClientRect();
        setElementPosition({ x: elementPos.x, y: elementPos.y });
        setPosition({
          x: Math.round(elementPosition.x),
          y: Math.round(elementPosition.y),
        });
        setShowInput(true);
        if (firstSet) {
          // console.log(firstSet);
          setFirstSet(false);
          shiftTag();
        }
        if (this.hitTest(props.bin.current, "30%")) {
          dragRef.current.style.display = "none";
        }
      },
      dragClickable: false,
      onPress: () => {
        setBorderClass("inputBox red-border");
      },
      onRelease: () => {
        setBorderClass("inputBox no-border");
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
          setInputClass("drag drag-input--dropped");
          const elementPos = dragRef.current.getBoundingClientRect();
          setElementPosition({ x: elementPos.x, y: elementPos.y });
          setPosition({
            x: Math.round(elementPosition.x),
            y: Math.round(elementPosition.y),
          });
          setShowInput(true);
          if (firstSet) {
            // console.log(firstSet);
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
  }

  function modalSubmit() {
    if (position.x !== 0 && position.y !== 0) {
      gsap.to(dragRef.current, {
        x: position.x - left,
        y: position.y - top,
      });
    }
    inputRef.current.style.fontSize = fz;
    inputRef.current.style.fontWeight = fw;
    inputRef.current.style.height = ht;
    inputRef.current.style.width = wd;
    toggleModal();
  }
  return (
    <div>
      <div className={inputClass} ref={dragRef} onClick={toggleModal}>
        <img src={dots} alt="" />
        {!showInput ? <h2 className={borderClass}>{content}</h2> : null}

        {showInput ? (
          <input
            type="text"
            placeholder="input text here"
            className={borderClass}
            value={content}
            ref={inputRef}
          />
        ) : null}
      </div>
      <InputModal
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
        inputRef={inputRef}
        ht={ht}
        setHt={setHt}
        wd={wd}
        setWd={setWd}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default DraggableInput;
