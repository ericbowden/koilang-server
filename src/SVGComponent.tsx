import { useEffect, useRef, useState } from "react";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import { useAppStateContext } from "./state";
import { useWindowSize } from "@react-hook/window-size";
import { useCurrentBreakpoint } from "./hooks";
import { dependencyTags, DependencyTagsKey } from "./dictionary/dependencyTags";
import { posTags, POSTagsKeyType } from "./dictionary/posTags";

export default function SVGComponent() {
  const Viewer = useRef<UncontrolledReactSVGPanZoom>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [svgWidth, setSvgWidth] = useState(0);
  const [winWidth, winHeight] = useWindowSize();
  const [viewerTop, setViewerTop] = useState(0);
  const { breakpointSize } = useCurrentBreakpoint();

  const {
    appState: { response },
  } = useAppStateContext();

  useEffect(() => {
    // Parse the SVG string and create a DOM element
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(response.html, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    // replace temp svg with actuall svg
    const container = document.getElementById("inner-g");
    if (container) container.replaceChildren(svgElement);

    // add arc dependency label
    document.querySelectorAll(".displacy-arrow textPath").forEach((value) => {
      const text = value.textContent as DependencyTagsKey;
      value.textContent = `${text} (${dependencyTags[text]})`;
    });

    // set word pos label
    document.querySelectorAll(".displacy-tag").forEach((value) => {
      const text = value.textContent as POSTagsKeyType;

      const tspan = value.cloneNode() as SVGTSpanElement;
      tspan.textContent = `(${posTags[text]})`;
      tspan.setAttribute("font-size", "10");
      value.after(tspan);
    });

    // set svg dimentions
    setSvgHeight(parseInt(svgElement.getAttribute("height") ?? ""));
    setSvgWidth(parseInt(svgElement.getAttribute("width") ?? ""));

    // center the view initially
    setTimeout(() => {
      // hacky way to set svg zoom size on smaller screens
      if (breakpointSize > svgWidth) {
        Viewer.current?.fitToViewer();
      } else {
        Viewer.current?.fitSelection(0, 0, breakpointSize, winHeight);
      }
    }, 0);

    // get the viewer dimensions to properly set the height
    const viewerEl = document.getElementsByClassName("svg-display")[0];
    setViewerTop(viewerEl.getBoundingClientRect().top);
  }, [breakpointSize, response.html, svgWidth, winHeight]);

  return (
    <>
      <hr />
      <UncontrolledReactSVGPanZoom
        ref={Viewer}
        width={winWidth}
        height={winHeight - viewerTop}
        defaultTool="pan"
        className="svg-display"
        style={{
          width: "100%",
          overflow: "hidden",
          userSelect: "none",
          position: "absolute",
          left: 0,
        }}
        background="white"
      >
        {/* we have to do this weird svg replace because fo the react-svg-pan-zoom plugin not being very flexible */}
        <svg height={svgHeight} width={svgWidth}>
          <g id="inner-g"></g>
        </svg>
      </UncontrolledReactSVGPanZoom>
    </>
  );
}
