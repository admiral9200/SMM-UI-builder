// @desc This component is used to create a new web page...
// @created 08/10/2023
// @author Shingen Morikawa 

import React, { useState, useRef, useEffect } from "react";
import { useScreenshot } from 'use-react-screenshot'
import DraggableLabel from "../components/DraggableLabel";
import DraggableInput from "../components/DraggableInput";
import DraggableButton from "../components/DraggableButton";
import DraggableImage from "../components/DraggableImage";
import darkToggle from "../assets/dark-mode.svg";
import gridIcon from "../assets/grid.svg";
import reload from "../assets/reload.svg";
import trash from "../assets/trash.svg";
import DraggableCard from "../components/DraggableCard";

const WorkSpace = () => {
  const workspaceRef = useRef(null);
  const sidebarRef = useRef(null);
  const binRef = useRef(null);
  const dotsRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(workspaceRef.current);
  const [tagLimit, setTagLimit] = useState(10);
  const [workspace, setWorkspace] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState(false);
  const [grid, setGrid] = useState(true);

  /**
   * @desc This function is used to set labels...
   * @returns 
   */
  const setLabels = () => {
    let elementArray = [];
    for (let i = 0; i < tagLimit; i++) {
      elementArray.push(
        <DraggableLabel
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
          bin={binRef}
          grid={grid}
        />
      );
    }
    return elementArray;
  };
  
  /**
   * @desc This function is used to set Input element...
   * @returns 
   */
  const setInputs = () => {
    let elementArray = [];
    for (let i = 0; i < tagLimit; i++) {
      elementArray.push(
        <DraggableInput
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
          bin={binRef}
          grid={grid}
        />
      );
    }
    return elementArray;
  };
  
  /**
   * @desc This method is used to add a button element...
   * @returns 
   */
  const setButtons = () => {
    let elementArray = [];
    for (let i = 0; i < tagLimit; i++) {
      elementArray.push(
        <DraggableButton
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
          bin={binRef}
          grid={grid}
        />
      );
    }
    return elementArray;
  };
  
  /**
   * @desc This is used to upload an image...
   * @returns 
   */
  const setImages = () => {
    let elementArray = [];
    for (let i = 0; i < tagLimit; i++) {
      elementArray.push(
        <DraggableImage
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
          bin={binRef}
          grid={grid}
        />
      );
    }
    return elementArray;
  };

  /**
   * @desc This is used to add a card...
   * @returns 
   */
  const setCards = () => {
    let elementArray = [];
    for (let i = 0; i < tagLimit; i++) {
      elementArray.push(
        <DraggableCard
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
          bin={binRef}
          grid={grid}
        />
      );
    }
    return elementArray;
  }
  
  /**
   * @desc occupying work space...
   * @desc first rendering the page...
   */
  useEffect(() => {
    const workspaceBounds = workspaceRef.current.getBoundingClientRect();
    const sidebarBounds = sidebarRef.current.getBoundingClientRect();
    setWorkspace({
      x: workspaceBounds.width,
      y: workspaceBounds.height,
    });
    binRef.current.style.transform = `translateX(-${sidebarBounds.width}px)`;
  }, []);

  /**
   * @desc This method is used to generate class name...
   * @returns 
   */
  const generateClassname = () => {
    if (mode && grid) return "WorkSpace__workspace--light";
    if (!mode && grid) return "WorkSpace__workspace--dark";
    if (mode && !grid) return "WorkSpace__workspace--light-no-grid";
    if (!mode && !grid) return "WorkSpace__workspace--dark-no-grid";
  };
  return (
    <div className="WorkSpace">
      <div className={generateClassname()} ref={workspaceRef}>
        <div className="toggle-background">
          <div>
            <img
              src={darkToggle}
              className="toggle-dark-mode"
              alt="toggle dark mode"
              onClick={() => setMode(!mode)}
            />
            <img
              src={gridIcon}
              className="toggle-dark-mode"
              alt="toggle grid snap"
              onClick={() => setGrid(!grid)}
            />
            <img
              src={reload}
              className="toggle-dark-mode"
              alt="toggle grid snap"
              onClick={() => window.location.reload()}
            />
          </div>
          <div>
            <a
              href="https://github.com/admiral9200/SMM-UI-builder"
              rel="noreferrer"
              target="_blank"
            >
              Source code
            </a>
          </div>
        </div>
        <button
          style={{ marginBottom: "10px", color: "white" }}
          onClick={getImage}
        >
          Take screenshot
        </button>
        <div className="bin" ref={binRef}>
          <img src={trash} alt="" />
        </div>
      </div>
      <div className="WorkSpace__sidebar" ref={sidebarRef}>
        <div className="WorkSpace__sidebar--container">{setLabels()}</div>
        <div className="WorkSpace__sidebar--container">{setInputs()}</div>
        <div className="WorkSpace__sidebar--container">{setButtons()}</div>
        <div className="WorkSpace__sidebar--container">{setImages()}</div>
        {/* <div className="WorkSpace__sidebar--container">{setCards()}</div> */}
      </div>
    </div>
  );
}

export default WorkSpace;
