import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import dots from "../assets/draggable-dots.svg";
import dummyImage from "../assets/dummy.PNG";
import ImageModal from "./modals/ImageModal";
gsap.registerPlugin(Draggable);

function DraggableImage(props) {
  // ! Ref for the draggable div
  const dragRef = useRef(null);
  const imageRef = useRef(null);
  const checkboxRef = useRef(null);
  // ! State to change the bounds
  const [bound, setBound] = useState("body");
  // ! State to update the content
  const [content, setContent] = useState("Image upload");
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
  const [imageClass, setImageClass] = useState("drag drag-image");
  const [borderClass, setBorderClass] = useState("no-border");
  // ! State to manage the font height/width
  const [ht, setHt] = useState("100px");
  const [wd, setWd] = useState("200px");
  const [htChange, setHtChange] = useState(false);
  const [wdChange, setWdChange] = useState(false);
  const [aspect, setAspect] = useState(false);
  const [ratio, setRatio] = useState(2);
  // ! initial render shift for textlabel
  const [firstSet, setFirstSet] = useState(true);
  // ! Show/hide inputbox
  const [showInput, setShowInput] = useState(false);
  // ! handle the uploaded file
  const [file, setFile] = useState(null);
  const shiftTag = () => {
    gsap.to(dragRef.current, { y: "+=210", duration: 0 });
  };
  useEffect(() => {
    const elementPos = dragRef.current.getBoundingClientRect();
    Draggable.create(dragRef.current, {
      onDragEnd: async () => {
        await setBound(props.boundRef.current);
        console.log("elementPos");
      },
      bounds: bound,
    });
    // ! Getting the element's position in the dom

    setLeft(elementPos.left);
    setTop(elementPos.top - 210);
    setDrag({ x: elementPos.width, y: elementPos.height - 210 });
    setFile(dummyImage);
  }, []);
  // ! effect for bound change
  useEffect(() => {
    // console.log(elementPos);
    Draggable.create(dragRef.current, {
      onDragEnd: function () {
        setBound(props.boundRef.current);
        setImageClass("drag drag-image--dropped");
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
          setImageClass("drag drag-image--dropped");
          const elementPos = dragRef.current.getBoundingClientRect();
          setElementPosition({ x: elementPos.x, y: elementPos.y });
          setPosition({
            x: Math.round(elementPosition.x),
            y: Math.round(elementPosition.y),
          });
          setShowInput(true);
          if (firstSet) {
            console.log(firstSet);
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

  function modalSubmit(param = "no") {
    if (position.x !== 0 && position.y !== 0) {
      gsap.to(dragRef.current, {
        x: position.x - left,
        y: position.y - top,
      });
    }
    if (param === "htwd") {
      imageRef.current.style.height = ht;
      imageRef.current.style.width = wd;
    }
    if (param === "ht") imageRef.current.style.height = ht;
    if (param === "wd") imageRef.current.style.width = wd;
    toggleModal();
  }
  return (
    <div>
      <div className={imageClass} ref={dragRef} onClick={toggleModal}>
        <img src={dots} alt="" className="drag-dots" />
        {!showInput ? <h2 className={borderClass}>{content}</h2> : null}
        {showInput ? (
          <img src={file} ref={imageRef} alt="" className="content-image" />
        ) : null}
      </div>
      <ImageModal
        props={props}
        setContent={setContent}
        drag={drag}
        elementPosition={elementPosition}
        setPosition={setPosition}
        position={position}
        modalSubmit={modalSubmit}
        ht={ht}
        setHt={setHt}
        wd={wd}
        setWd={setWd}
        checkboxRef={checkboxRef}
        setHtChange={setHtChange}
        setWdChange={setWdChange}
        aspect={aspect}
        ratio={ratio}
        setAspect={setAspect}
        setFile={setFile}
        setRatio={setRatio}
        htChange={htChange}
        wdChange={wdChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default DraggableImage;
