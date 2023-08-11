import React, { useRef } from "react";
// ! GSAP imports
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// ! images imports
import banner1 from "../assets/homepage-dark-grid.jpg";
import banner2 from "../assets/homepage-light-no-grid.jpg";
import link from "../assets/link.svg";
import linkGrey from "../assets/link-grey.svg";
import homepageBlank from "../assets/homepage-blank.PNG";
import labelModal from "../assets/label-modal.PNG";
import inputModal from "../assets/input-modal.PNG";
import buttonModal from "../assets/button-modal.PNG";
import imageModal from "../assets/image-modal.PNG";
import arrow from "../assets/up-arrow.svg";
import fileStructure from "../assets/file-structure.jpg";
// ! tech-stack icons
import react from "../assets/react.svg";
import javascript from "../assets/javascript.svg";
import sass from "../assets/sass.svg";
import gsapIcon from "../assets/gsapsvg.svg";
import npm from "../assets/npm.svg";
import github from "../assets/github.svg";
import githubGrey from "../assets/github-grey.svg";
import heroku from "../assets/heroku.svg";
// ! Video import
import video from "../assets/draggable-sidebar.mp4";
// ! Registering plugin
gsap.registerPlugin(ScrollToPlugin);
function Documentation() {
  // ! Section refs
  const howToUseRef = useRef(null);
  const featuresRef = useRef(null);
  const futureScopeRef = useRef(null);
  const knowsBugsRef = useRef(null);
  const referencesRef = useRef(null);
  const bannerRef = useRef(null);
  const otherProjectsRef = useRef(null);
  const contactMeRef = useRef(null);
  const fileStructureRef = useRef(null);
  // ! Scroll-to function
  const scroller = (ref) => {
    gsap.to(window, {
      scrollTo: ref.current,
      ease: "ease-out",
      duration: 1.5,
      scrollBehavior: "smooth",
    });
  };
  return (
    <div className="documentation-page">
      <div className="documentation-page__nav">
        <ul>
          <li onClick={() => scroller(bannerRef)}>Welcome</li>
          <li onClick={() => scroller(howToUseRef)}>How to use</li>
          <li onClick={() => scroller(fileStructureRef)}>File Structure</li>
          <li onClick={() => scroller(featuresRef)}>Features</li>
          <li onClick={() => scroller(futureScopeRef)}>Future scope</li>
          <li onClick={() => scroller(knowsBugsRef)}>Known bugs</li>
          <li onClick={() => scroller(referencesRef)}>References</li>
          <li onClick={() => scroller(otherProjectsRef)}>Other projects</li>
          <li onClick={() => scroller(contactMeRef)}>Contact me</li>
        </ul>
      </div>
      <section ref={bannerRef} className="documentation-page__banner">
        <h1>Draggable page builder</h1>
        <p>
          This web-app is made using <span>ReactJS</span> and the
          <span> GSAP</span> animation library. This page-builder has features
          like snap-element-to-grid, draggable components, change dimensions of
          elements, Mutate CSS properties, Dark/Light mode. Please visit the
          link below to see the demo, else clone the repository and run{" "}
          <code>npm install && npm start</code> to get started.
        </p>
        <div className="documentation-page__banner--links">
          <a href="https://github.com/manas3874/draggable">
            <img src={github} alt="" />
          </a>
          <a href="https://draggable-js.herokuapp.com/">
            <img src={link} alt="" />
          </a>
        </div>
        <div className="documentation-page__banner--images">
          <img src={banner1} alt="banner-1" />
          <img src={banner2} alt="banner-2" />
        </div>
      </section>
      {/*  Tech-stack */}
      <section className="documentation-page__tech-stack documentation-page__content section-split">
        <img src={react} alt="raact" />
        <img src={javascript} alt="javascript" />
        <img src={sass} alt="sass" />
        <img src={gsapIcon} alt="gsapIcon" />
        <img src={npm} alt="npm" />
        <img src={githubGrey} alt="github" />
        <img src={heroku} alt="heroku" />
      </section>
      {/* How to use section */}
      <section
        ref={howToUseRef}
        className="documentation-page__how-to-use documentation-page__content section-split"
      >
        <h1>How to use</h1>
        <ol>
          <li>
            <h1>Welcome.</h1>
            <p>
              Visit the{" "}
              <a href="https://draggable-js.herokuapp.com/">online demo</a> for
              testing the application. The application auto-deploys from the{" "}
              <a href="https://github.com/manas3874/draggable">
                Github repository
              </a>
              . All current changes will be updated in the application. The app
              is made on a 1700px+ screensize. It's use on machines with smaller
              screensize might make everything look scaled-up. In such a case it
              is recommended to zoom-out the browser window.
            </p>
          </li>
          <li>
            <h1>Homepage</h1>
            <p>
              You will be greeted with the homepage of our page-builder app.
              Let's understand the layout of the homepage.
              <img src={homepageBlank} alt="blank homepage" />
              The grid-area is the <code>workspace</code> and the{" "}
              <code>sidebar</code> is on the right.
              <ol>
                <li>
                  Dark mode and light mode toggle. <code>default - dark</code>
                </li>
                <li>
                  Snap to grid toggle. Removes the grid layout and disables
                  snap-to-grid. Disable the grid for free-drag-movement.
                  <code>default - grid-on</code>
                </li>
                <li>
                  Refresh the page. Removes all the placed elements and starts
                  afresh.
                </li>
                <li>Link to visit the documentation.</li>
                <li>
                  <code>Elements</code> list to pick from. You can pick elements
                  from here and place them into the work-space.
                </li>
                <li>
                  Trash area. Drag an element into this area to delete it from
                  the workspace.
                </li>
              </ol>
            </p>
          </li>
          <li>
            <h1>Label configuration modal.</h1>
            <p>
              When we drag the label element from the sidebar, and drop it onto
              our workspace, the label element takes its shape. You can click on
              the label to open a modal through which you can manipulate the
              styling of the label.
              <img src={labelModal} alt="label-modal" />
              The label is overlayed over the page. The changes will be
              reflected on the element.
              <ol>
                <li>Label name, can be any text string.</li>
                <li>
                  Position of the element on the x-axis.{" "}
                  <code>with X limit</code>
                </li>
                <li>
                  Position of the element on the y-axis.{" "}
                  <code>with Y limit</code>
                </li>
                <li>Font size in pixels.</li>
                <li>
                  Font weight <code>in multiples of 100 (upto 900)</code>
                </li>
                <li>Color selector. Will change the text color.</li>
                <li>Save the changes and close the modal.</li>
                <li>Close the modal without saving changes.</li>
                <li>Label ID</li>
                <li>
                  Actual label in the workspace. will update in real-time.
                </li>
              </ol>
            </p>
          </li>
          <li>
            <h1>Input configuration modal.</h1>
            <p>
              When we drag the input element from the sidebar, and drop it onto
              our workspace, the input element takes its shape. You can click on
              the input to open a modal through which you can manipulate the
              styling and the content of the input-box.
              <img src={inputModal} alt="input-modal" />
              <ol>
                <li>
                  Input text. The text content can be manipulated from this
                  input-box.
                </li>
                <li>
                  Position of the element on the x-axis.{" "}
                  <code>with X limit</code>
                </li>
                <li>
                  Position of the element on the y-axis.{" "}
                  <code>with Y limit</code>
                </li>
                <li>Font size in pixels.</li>
                <li>
                  Font weight <code>in multiples of 100 (upto 900)</code>
                </li>
                <li>
                  Height of the textbox. It is recommended to manipulate the
                  height only when absolutely required. Hence the default is{" "}
                  <code>max-content.</code>
                </li>
                <li>
                  Width of the input box has to be maintained as per the content
                  area.
                </li>
                <li>Color selector. Will change the text color.</li>
                <li>Save the changes and close the modal.</li>
                <li>Close the modal without saving changes.</li>
                <li>The actual input label element.</li>
                <li>Input label ID.</li>
              </ol>
            </p>
          </li>
          <li>
            <h1>Button configuration modal.</h1>
            <p>
              When we drag the button element from the sidebar, and drop it onto
              our workspace, the button element takes its shape. You can click
              on the button to open a modal through which you can manipulate the
              styling and the content of the button-box.
              <img src={buttonModal} alt="" />
              The button modal lets us change the structure and styling of the
              button.
              <ol>
                <li>
                  Input text. The text content can be manipulated from this
                  input-box.
                </li>
                <li>
                  Position of the element on the x-axis.{" "}
                  <code>with X limit</code>
                </li>
                <li>
                  Position of the element on the y-axis.{" "}
                  <code>with Y limit</code>
                </li>
                <li>Font size in pixels.</li>
                <li>
                  Font weight <code>in multiples of 100 (upto 900)</code>
                </li>
                <li>Color selector. Will change the text color.</li>
                <li>Save the changes and close the modal.</li>
                <li>Close the modal without saving changes.</li>
                <li>The actual button element.</li>
                <li>Button label ID.</li>
              </ol>
            </p>
          </li>
          <li>
            <h1>Image configuration modal.</h1>
            <p>
              The image label can be dragged onto the workspace. This element
              will be an image which can be dragged across the workspace and
              placed wherever required. We can import any local image onto the
              workspace and resize it as we like.
              <img src={imageModal} alt="" />
              This image will naturally have a width of 200px. This image
              dimensions can be managed by preserving the aspect-ratio, or by
              giving the height and width as required.
              <ol>
                <li>
                  Image title can be inserted here. This title will not be shown
                  on the screen. This can be used to refer to an image.
                </li>
                <li>
                  Position of the element on the x-axis.{" "}
                  <code>with X limit</code>
                </li>
                <li>
                  Position of the element on the y-axis.{" "}
                  <code>with Y limit</code>
                </li>
                <li>
                  Height of the image. It is recommended to manipulate the
                  height only when absolutely required.
                </li>
                <li>
                  Width of the image has to be maintained as per the
                  requirement. The image width should not be beyond{" "}
                  <code>bounds of the workspace</code>
                </li>
                <li>
                  <code>Preserve aspect ratio</code> checkbox.
                </li>
                <li>Save the changes and close the modal.</li>
                <li>Close the modal without saving changes.</li>
                <li>
                  <code>Choose file</code> button to select an image file to
                  upload onto the workspace. This file can only be of an
                  image-type. <code>Any image format is valid</code>
                </li>
                <li>The uploaded image on the workspace.</li>
                <li>Image label ID.</li>
              </ol>
            </p>
          </li>
        </ol>
      </section>
      {/* ! File structure section */}
      <section
        ref={fileStructureRef}
        className="documentation-page__file-structure documentation-page__content section-split"
      >
        <img src={fileStructure} alt="" />
        <div className="file-structure-content">
          <h1>File Structure</h1>
          <ol>
            <li>
              <p>The project follows typical React-app file-structure.</p>
            </li>
            <li>
              <p>
                In the <span>src</span> folder, there are 4 sub-folders, named.
                <ol>
                  <li>
                    <span>assets</span> Houses all the images, videos and icons
                    used within the project.
                  </li>
                  <li>
                    <span>components</span> Has all the internal components of
                    the project. These components are the draggable elements.
                    <ul>
                      <li>
                        <span>component styles</span> Has all the styling
                        required for the components.
                      </li>
                      <li>
                        <span>modals</span> Has the configuration modals for the
                        respective element components.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>helpers</span> This folder consists of the required
                    helper functions which are reused across the project.
                  </li>
                  <li>
                    <span>pages</span> All the pages that we have in our project
                    will be housed in this folder. Currently we have the
                    homepage and the documentation page
                    <ul>
                      <li>
                        <span>pages styles</span> Has all the styling associated
                        with the pages we have in our project
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>App.js</span> helps us route the pages internally with
                    react-router and <span>index.js</span> helps us to mount our
                    SPA (virtual DOM) onto the actual DOM, by targeting the DOM
                    element with the id of <span>"root"</span>.
                  </li>
                </ol>
              </p>
            </li>
            <li>
              <p>
                <span>Package.json</span> has our project's metadata, which
                helps us to manage the state of the entire project, it's
                versions, dependencies, scripts, etc.
              </p>
            </li>
          </ol>
        </div>
      </section>
      {/* Features section */}
      <section
        ref={featuresRef}
        className="documentation-page__features documentation-page__content section-split"
      >
        <h1>Notable features</h1>
        <ol>
          <li>
            <h1>GSAP draggable components.</h1>
            <p>
              Greensock Animation Platform is a robust and full-fledged
              JavaScript animation library. The Draggable plugin is used here
              for the elements to drag into the workspace and move around. The
              GSAP tweens are used to shift the elements to a particular
              location after inserting the position into the configuration
              modal.
            </p>
          </li>
          <li>
            <h1>Dark and Light mode based on preference.</h1>
            <p>
              The workspace can have dark mode or light mode, which depends on
              the preference of the user. The background does not get
              completetely black/white. All the colors used in the workspace are
              cool color.
            </p>
          </li>
          <li>
            <h1>
              Dot-grid with snap-lock feature for accurate elements placement.
            </h1>
            <p>
              The dot-grid is made using dots of 1px width and dot-space as 9px.
              Making the grid snap to increments of 10px. Snap locking will help
              you place the elements accurately in any position, and helps
              greatly with alignments.
            </p>
          </li>
          <li>
            <h1>Toggle for snap-grid layout.</h1>
            <p>
              The snap-grid toggle button can disable/enable the snap grid. This
              will help us to disable the snapping nature of the elements. If
              you need free movement for your elements, you can disable the
              snap-grid. The dark/light mode works the same regardless of the
              snap-grid.
            </p>
          </li>
          <li>
            <h1>Workspace bounds for the placed elements.</h1>
            <p>
              The elements placed inside the worspace can not be dragged out of
              the workspace. The elements can be removed/deleted by dragging
              them into the trash-section.
            </p>
          </li>
          <li>
            <h1>Trash section to delete the elements.</h1>
            <p>
              The elements can be dragged into the trash-area in case we want to
              delete these elements.
            </p>
          </li>
        </ol>
      </section>
      {/* Future scope section */}
      <section
        ref={futureScopeRef}
        className="documentation-page__future documentation-page__content section-split"
      >
        <h1>Future scope</h1>
        <ol>
          <li>
            <h1>Sliding sidebar on drag.</h1>
            <p>
              The provision for this feature is already made. The code is
              commented within the Homepage file. The sidebar can be moved out
              of the way to have a bigger workspace.
            </p>
            <video className="sidebar-video" controls src={video}></video>
            <p>
              The sliding sidebar had certain bugs and issues. Due to which this
              feature was scrapped from the curent version.
            </p>
          </li>
          <li>
            <h1>Unlimited workspace.</h1>
            <p>
              Workspace right now is limited to full height and 80% of the
              screen width. A scrollable and zoomable, unlimited or seemingly
              unlimited workspace can be made to accomodate enough content.
            </p>
          </li>
          <li>
            <h1>Variable grid-size.</h1>
            <p>
              The grid size can be varied depending on what level of snapping we
              require. There can be a feature to specify the dot-spacing. This
              can be in multiples of 10 or any number the user wishes.
            </p>
          </li>
          <li>
            <h1>Alignment helpers like Photoshop.</h1>
            <p>
              The alignment lines and magnetic helpers can be included to make
              designing as accurate as possible.
            </p>
          </li>
          <li>
            <h1>Trash memory to reterive deleted elements by ctrl+z.</h1>
            <p>
              The deleted elements can be stored in the local-storage or using
              redux-persist and can be retreived by pressing ctrl+z or with a
              deleted elements dropdown.
            </p>
          </li>
          <li>
            <h1>Color picker for changing colors.</h1>
            <p>
              Colors available right now are limited. A color-picker can be
              integrated in the configuration-modals so that the user can switch
              colors as desired.
            </p>
          </li>
          <li>
            <h1>Pick and drag to resize the image.</h1>
            <p>
              The images can be resized using the corner pick-points like in
              designing softwares or MS Word. This will help the user view the
              changes in real time, and get to a desired image size.
            </p>
          </li>
          <li>
            <h1>Save the design to PDF or print it.</h1>
            <p>
              Once designed. the layout can be saved/ printed as desired. This
              will help brainstorming after a basic design completion.
            </p>
          </li>
        </ol>
      </section>
      {/* Known bugs section */}
      <section
        ref={knowsBugsRef}
        className="documentation-page__known-bugs documentation-page__content section-split"
      >
        <h1>Known issues and bugs</h1>
        <ol>
          <li>
            <h1>Elements appear above the modal.</h1>
            <p>
              When we have dragged an element onto the workspace, and we open
              the modal, the element can be drawn over the modal. The root cause
              of this issue is in the internals of the modal used. This can be
              fixed by making a modal within out app.
            </p>
          </li>
          <li>
            <h1>Images always follow the aspect ratio.</h1>
            <p>
              The images follow the aspect ratio unless the height is explicitly
              given. This is caused because CSS property of width is already
              given to the image element. The height gets automatically adjusted
              based on the changed width.
            </p>
          </li>
          <li>
            <h1>Element can be drawn over the navbar</h1>
            <p>
              The element currently is on the top of all the components. This
              causes the draggable element to be drawn over the navbar as well.
              Which hides the functionality on the navbar.
            </p>
          </li>
          <li>
            <h1>Input-box text cannot be altered directly.</h1>
            <p>
              The input-box cannot be manipulated directly since the entire
              element has a dragRef (React ref) associated. Hence, on any click,
              the modal is triggered. Currently we an manipulate the content
              from the modal.
            </p>
          </li>
          <li>
            <h1>Input-box width is not responsive.</h1>
            <p>
              The width of the input-box is not responsive currently, as we have
              to specify the width and font-size that we require.
            </p>
          </li>
          <li>
            <h1>Live responsiveness.</h1>
            <p>
              The components will not respond to live changes in the
              window-size-changes. A reload will fix the issue after
              screen-size-change. This is caused since certain components are
              positioned based on the bounds (rect) obtained during the mounting
              of the components. This can be updated on window resize.
            </p>
          </li>
        </ol>
      </section>
      {/* References section */}
      <section
        ref={referencesRef}
        className="documentation-page__references documentation-page__content section-split"
      >
        <h1>References</h1>
        <ol>
          <li>
            <h1>GSAP Draggable and ScrollToPlugin</h1>
            <p>
              The Draggable plugin is used on the application and ScrollToPlugin
              is used on the documentation.
              <code>
                <a href="https://greensock.com/docs/Utilities/Draggable">
                  Draggable documentation
                </a>
              </code>
              <code>
                <a href="https://greensock.com/docs/v3/Plugins/ScrollToPlugin">
                  ScrollToPlugin documentation
                </a>
              </code>
            </p>
          </li>
          <li>
            <h1>React modal.</h1>
            <p>
              The library used to make styled modals is styled-react-modal. View
              the{" "}
              <code>
                <a href="https://www.npmjs.com/package/styled-react-modal">
                  documentation
                </a>
              </code>{" "}
              here. This modal uses{" "}
              <code>
                <a href="https://www.npmjs.com/package/styled-components">
                  styled components
                </a>
              </code>
            </p>
          </li>
          <li>
            <h1>SCSS styling using node-sass.</h1>
            <p>
              The entire styling is done using SCSS with the precompiler,{" "}
              <code>
                <a href="https://www.npmjs.com/package/node-sass">node-sass</a>
              </code>
            </p>
          </li>
        </ol>
      </section>
      {/* Other projects footer */}
      <footer
        className="documentation-page__footer documentation-page__content section-split"
        ref={otherProjectsRef}
      >
        <h1>View my other projects.</h1>
        <ol>
          <li>
            <h1>NPM package, fitness-calculator.</h1>
            <p>
              An NPM package built from scratch to help with the final year
              project. This package reached 423 weekly downloads initially. Will
              be updated with new functions.
            </p>
            <div className="links">
              <a href="https://github.com/manas3874/fitness-calculator">
                <img src={githubGrey} alt="" />
              </a>{" "}
              <a href="https://www.npmjs.com/package/fitness-calculator">
                <img src={npm} alt="" />
              </a>
            </div>
          </li>
          <li>
            <h1>AI Dietician, Final year project.</h1>
            <p>
              Full-time Dietician in an app, Providing recipe search, recipe
              analysis, chatbot for food database, 3 level authentication and
              much more. This MERN stack application is a personal diet
              assistant.
            </p>
            <div className="links">
              <a href="https://github.com/manas3874/dietician-fullstack">
                <img src={githubGrey} alt="" />
              </a>
              <a href="https://dietician-app.herokuapp.com/">
                <img src={linkGrey} alt="" />
              </a>
            </div>
          </li>
          <li>
            <h1>Instagram automation.</h1>
            <p>
              Automated 2 personal instagram pages to save time for managing the
              accounts.
            </p>
          </li>
          <li>
            <h1>Dummy admin panel.</h1>
            <p>
              Vanilla JavaScript and HTML+CSS admin panel to demonstrate the
              filter, sort and search functionalities.{" "}
            </p>
            <div className="links">
              <a href="https://github.com/manas3874/admin-js">
                <img src={githubGrey} alt="" />
              </a>
              <a href="https://kind-swartz-a32b4c.netlify.app/">
                <img src={linkGrey} alt="" />
              </a>
            </div>
          </li>
          <li>
            <h1>UI task - cloning.</h1>
            <p>Cloned 2 pages of a well designed website. </p>
            <div className="links">
              <a href="https://github.com/manas3874/twist_open">
                <img src={githubGrey} alt="" />
              </a>
              <a href="https://peaceful-bassi-d5dfd6.netlify.app/">
                <img src={linkGrey} alt="" />
              </a>
            </div>
          </li>
          <li>
            <h1>UI task - from design.</h1>
            <p>React app from designs of a hotel-chain website concept. </p>
            <div className="links">
              <a href="https://github.com/manas3874/ferofly-task">
                <img src={githubGrey} alt="" />
              </a>{" "}
              <a href="https://practical-lalande-e2a253.netlify.app/">
                <img src={linkGrey} alt="" />
              </a>
            </div>
          </li>
        </ol>
      </footer>
      {/* Contact section */}
      <section className="section-split contact-me" ref={contactMeRef}>
        <h1>Liked what you saw? Let's connect!</h1>
        <p>
          Email me at{" "}
          <code>
            <a href="mailto:tripathimanas98@gmail.com">
              tripathimanas98@gmail.com
            </a>
          </code>
        </p>
        <p>
          Contribute or raise issues on{" "}
          <code>
            <a href="https://github.com/manas3874/draggable">Github.</a>
          </code>
        </p>
      </section>
      {/* ! back to top button */}
      <img
        src={arrow}
        alt="back-to-top"
        className="back-to-top"
        onClick={() => scroller(bannerRef)}
      />
    </div>
  );
}

export default Documentation;
