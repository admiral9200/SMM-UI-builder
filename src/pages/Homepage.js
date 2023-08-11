import React, { useState, useRef, useEffect } from "react";
import DraggableLabel from "../components/DraggableLabel";
import DraggableInput from "../components/DraggableInput";
import DraggableButton from "../components/DraggableButton";
import DraggableImage from "../components/DraggableImage";
import darkToggle from "../assets/dark-mode.svg";
import gridIcon from "../assets/grid.svg";
import reload from "../assets/reload.svg";

import trash from "../assets/trash.svg";
import { Link } from "react-router-dom";

// import { useScreenshot } from "use-react-screenshot";
// ! Provision for sliding sidebar (commented)
// import { gsap } from "gsap";
// import { Draggable } from "gsap/Draggable";
// gsap.registerPlugin(Draggable);
function Homepage() {
  const workspaceRef = useRef(null);
  const sidebarRef = useRef(null);
  const binRef = useRef(null);
  // const dotsRef = useRef(null);
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [close, setClose] = useState(null);
  // const [open, setOpen] = useState(null);
  // ! screenshot
  // const [image, takeScreenshot] = useScreenshot();
  // const getImage = () => takeScreenshot(workspaceRef.current);
  // ! tag limit
  const [tagLimit, setTagLimit] = useState(10);
  // ! workspace bounds state
  const [workspace, setWorkspace] = useState({ x: 0, y: 0 });
  // ! Dark mode/ light mode
  const [mode, setMode] = useState(false);
  // ! grid snap or no grid snap
  const [grid, setGrid] = useState(true);
  // ! Generating the usable labels
  const setLabels = () => {
    var dummyArr = [];
    for (let i = 0; i < tagLimit; i++) {
      dummyArr.push(
        <DraggableLabel
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
          bin={binRef}
          grid={grid}
        />
      );
    }
    return dummyArr;
  };
  // ! Generating the usable inputs
  const setInputs = () => {
    var dummyArr = [];
    for (let i = 0; i < tagLimit; i++) {
      dummyArr.push(
        <DraggableInput
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
          bin={binRef}
          grid={grid}
        />
      );
    }
    return dummyArr;
  };
  // ! Generating the usable buttons
  const setButtons = () => {
    var dummyArr = [];
    for (let i = 0; i < tagLimit; i++) {
      dummyArr.push(
        <DraggableButton
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
          bin={binRef}
          grid={grid}
        />
      );
    }
    return dummyArr;
  };
  // ! Generating the usable imageHandlers
  const setImages = () => {
    var dummyArr = [];
    for (let i = 0; i < tagLimit; i++) {
      dummyArr.push(
        <DraggableImage
          index={tagLimit - i}
          boundRef={workspaceRef}
          bounds={workspace}
          bin={binRef}
          grid={grid}
        />
      );
    }
    return dummyArr;
  };
  // var closeFunc, openFunc;
  useEffect(() => {
    const workspaceBounds = workspaceRef.current.getBoundingClientRect();
    const sidebarBounds = sidebarRef.current.getBoundingClientRect();
    setWorkspace({
      x: workspaceBounds.width,
      y: workspaceBounds.height,
    });
    binRef.current.style.transform = `translateX(-${sidebarBounds.width}px)`;
    // closeFunc = gsap.to(sidebarRef.current, {
    //   x: `+=${sidebarBounds.width - 60}`,
    //   paused: true,
    //   duration: 1,
    // });
    // openFunc = gsap.to(sidebarRef.current, {
    //   x: `-=${sidebarBounds.width - 60}`,
    //   paused: true,
    //   duration: 1,
    // });
    // setClose(closeFunc);
    // setOpen(openFunc);
  }, []);
  const generateClassname = () => {
    if (mode && grid) return "homepage__workspace--light";
    if (!mode && grid) return "homepage__workspace--dark";
    if (mode && !grid) return "homepage__workspace--light-no-grid";
    if (!mode && !grid) return "homepage__workspace--dark-no-grid";
  };
  return (
    <div className="homepage">
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
              href="https://github.com/manas3874/draggable"
              rel="noreferrer"
              target="_blank"
            >
              Source code
            </a>
            <Link target="_blank" to="/documentation">
              Documentation
            </Link>
          </div>
        </div>
        {/* <button
          style={{ marginBottom: "10px", color: "white" }}
          onClick={getImage}
        >
          Take screenshot
        </button> */}
        <div className="bin" ref={binRef}>
          <img src={trash} alt="" />
        </div>
      </div>
      <div className="homepage__sidebar" ref={sidebarRef}>
        <div className="homepage__sidebar--container">{setLabels()}</div>
        <div className="homepage__sidebar--container">{setInputs()}</div>
        <div className="homepage__sidebar--container">{setButtons()}</div>
        <div className="homepage__sidebar--container">{setImages()}</div>
        {/* <div
          className="sidebar-toggle"
          ref={dotsRef}
          onClick={() => {
            if (sidebarOpen) {
              close.play();
              close.restart();
            } else {
              open.play();
              open.restart();
            }

            setSidebarOpen(!sidebarOpen);
          }}
        ></div> */}
      </div>
    </div>
  );
}

export default Homepage;
