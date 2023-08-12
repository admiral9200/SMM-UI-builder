// @desc This component is used to add a draggable button to page...
// @created 08/10/2023
// @author Shingen Morikawa 

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

import dots from "../assets/draggable-dots.svg";
import ButtonModal from "./modals/ButtonModal";

gsap.registerPlugin(Draggable);

const DraggableButton = props => {

  const dragRef = useRef(null); // ref for the draggable div
  const buttonRef = useRef(null);

  const [bound, setBound] = useState("body"); // setting bound...
  const [content, setContent] = useState("Button text"); // setting content...
  const [position, setPosition] = useState({ x: 0, y: 0 }); // setting position...
  const [left, setLeft] = useState(0); // setting left pos...
  const [top, setTop] = useState(0); // setting top pos...

  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [buttonClass, setButtonClass] = useState("drag drag-button");
  const [borderClass, setBorderClass] = useState("no-border");

  const [fz, setFz] = useState("18px");
  const [fw, setFw] = useState("400");

  const [firstSet, setFirstSet] = useState(true);
  const [showInput, setShowInput] = useState(false);

  /**
   * @desc This method is used to add an animation...
   */
  const shiftTag = () => {
    gsap.to(dragRef.current, { y: "+=140", duration: 0 });
  };

  /**
   * @desc initializing...
   */
  useEffect(() => {
    const elementPos = dragRef.current.getBoundingClientRect();

    Draggable.create(dragRef.current, {
      onDragEnd: async () => {
        await setBound(props.boundRef.current);
      },
      bounds: bound,
    });

    setLeft(elementPos.left);
    setTop(elementPos.top - 140);
    setDrag({ x: elementPos.width, y: elementPos.height - 140 });
  }, []);
  
  /**
   * @desc bound changing...
   */
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
        x: function (value) {
          return Math.round(value / 10) * 10;
        },
        y: function (value) {
          return Math.round(value / 10) * 10;
        },
      },
    });
  }, [bound, firstSet, props.grid]);

  /**
   * @desc adding a button...
   */
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
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  /**
   * @desc toggling modal...
   * @param {*} e 
   */
  const toggleModal = e => {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  /**
   * @desc submitting a modal
   */
  const modalSubmit = () => {
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
