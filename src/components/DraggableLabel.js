// @desc This component is used to add a draggable label to page...
// @created 08/10/2023
// @author Shingen Morikawa 

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import dots from "../assets/draggable-dots.svg";
import LabelModal from "./modals/LabelModal";

gsap.registerPlugin(Draggable);

const DraggableLabel = props => {

  const dragRef = useRef(null); // Ref for the draggable div
  const labelRef = useRef(null); // State to change the bounds
  const [bound, setBound] = useState("body"); // State to update the content
  const [content, setContent] = useState("Label name"); // State to manage the positions
  const [position, setPosition] = useState({ x: 0, y: 0 }); // State to manage the element's left and top position
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0); // element's current position, to live update in the modal
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 }); // state for dimensions of the drag component
  const [drag, setDrag] = useState({ x: 0, y: 0 }); // class name setting for dropping
  const [labelClass, setLabelClass] = useState("drag drag-label");
  const [borderClass, setBorderClass] = useState("no-border"); // State to manage the font size/weight
  const [fz, setFz] = useState("18px");
  const [fw, setFw] = useState("600");

  useEffect(() => {
    const elementPos = dragRef.current.getBoundingClientRect();

    /**
     * @desc creating a new draggable label...
     */
    Draggable.create(dragRef.current, {
      onDragEnd: async () => {
        await setBound(props.boundRef.current);
        console.log("elementPos");
      },
      bounds: bound,
    });
    // ! Getting the element's position in the dom

    setLeft(elementPos.left);
    setTop(elementPos.top);
    setDrag({ x: elementPos.width, y: elementPos.height });
  }, []);

  /**
   * @desc adding a draggable label...
   */
  useEffect(() => {
    Draggable.create(dragRef.current, {
      onDragEnd: function (ev) {
        setBound(props.boundRef.current);
        setLabelClass("drag drag-label--dropped");
        const elementPos = dragRef.current.getBoundingClientRect();
        setElementPosition({ x: elementPos.x, y: elementPos.y });
        setPosition({
          x: Math.round(elementPosition.x),
          y: Math.round(elementPosition.y),
        });
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
        // snaps to the closest increment of 10 by default.
        x: function (value) {
          return Math.round(value / 10) * 10;
        },
        y: function (value) {
          return Math.round(value / 10) * 10;
        },
      },
    });
  }, [bound, props.grid]);

  useEffect(() => {
    if (!props.grid) {
      Draggable.create(dragRef.current, {
        liveSnap: false,
        onDragEnd: function (ev) {
          setBound(props.boundRef.current);
          setLabelClass("drag drag-label--dropped");
          const elementPos = dragRef.current.getBoundingClientRect();
          setElementPosition({ x: elementPos.x, y: elementPos.y });
          setPosition({
            x: Math.round(elementPosition.x),
            y: Math.round(elementPosition.y),
          });
          if (this.hitTest(props.bin.current, "30%")) {
            dragRef.current.style.display = "none";
          }
        },
      });
    }
  }, [props.grid]);
  
  // operate for modal...
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  /**
   * @desc toggling a modal...
   * @param {*} e 
   */
  const toggleModal = (e) => {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  /**
   * @desc This method is used to add animation to a modal...
   */
  const modalSubmit = () => {
    if (position.x !== 0 && position.y !== 0) {
      gsap.to(dragRef.current, {
        x: position.x - left,
        y: position.y - top,
      });
    }
    labelRef.current.style.fontSize = fz;
    labelRef.current.style.fontWeight = fw;
    toggleModal();
  }

  return (
    <div>
      <div className={labelClass} ref={dragRef} onClick={toggleModal}>
        <img src={dots} alt="" />
        <h2 className={borderClass} ref={labelRef}>
          {content}
        </h2>
      </div>
      <LabelModal
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
        labelRef={labelRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default DraggableLabel;
