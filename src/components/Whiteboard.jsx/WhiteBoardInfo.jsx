import { TbRectangle, TbEraser, TbTypography } from "react-icons/tb";

import { Text as KonvaText } from "react-konva";
import { IoMdClose, IoMdDownload, IoMdUndo, IoMdRedo } from "react-icons/io";
import { FaLongArrowAltRight, FaEraser } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import {
  Arrow,
  Circle,
  Layer,
  Line,
  Rect,
  Stage,
  Transformer,
} from "react-konva";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS } from "./constants";
import React, { useEffect } from "react";

export default function WhiteboardInfo({ onClose }) {
  const stageRef = useRef();
  const containerRef = useRef();
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [scribbles, setScribbles] = useState([]);

  const isPaining = useRef();
  const currentShapeId = useRef();
  const transformerRef = useRef();

  const isDraggable = action === ACTIONS.SELECT;

  function onPointerDown() {
    if (action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPaining.current = true;
    if (action === ACTIONS.TEXT) {
      const newText = {
        id,
        x,
        y,
        text: "Type here",
        fontSize: 16,
        fill: fillColor,
      };
      setTexts([...texts, newText]);
      setEditingText(newText);
      return;
    }

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) => [
          ...rectangles,
          {
            id,
            x,
            y,
            height: 20,
            width: 20,
            fill: fillColor,
            stroke: strokeColor,
          },
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) => [
          ...circles,
          {
            id,
            x,
            y,
            radius: 20,
            fill: fillColor,
            stroke: strokeColor,
          },
        ]);
        break;

      case ACTIONS.ARROW:
        setArrows((arrows) => [
          ...arrows,
          {
            id,
            points: [x, y, x + 20, y + 20],
            fill: fillColor,
            stroke: strokeColor,
          },
        ]);
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) => [
          ...scribbles,
          {
            id,
            points: [x, y],
            stroke: strokeColor,
          },
        ]);
        break;
      case ACTIONS.ERASER:
        // Remove or modify shapes that intersect with the eraser
        break;
    }
    addToHistory({
      rectangles,
      circles,
      arrows,
      scribbles,
      texts,
    });
  }
  function onPointerMove() {
    if (action === ACTIONS.SELECT || !isPaining.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) =>
          rectangles.map((rectangle) => {
            if (rectangle.id === currentShapeId.current) {
              return {
                ...rectangle,
                width: x - rectangle.x,
                height: y - rectangle.y,
              };
            }
            return rectangle;
          })
        );
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) =>
          circles.map((circle) => {
            if (circle.id === currentShapeId.current) {
              return {
                ...circle,
                radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
              };
            }
            return circle;
          })
        );
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) =>
          arrows.map((arrow) => {
            if (arrow.id === currentShapeId.current) {
              return {
                ...arrow,
                points: [arrow.points[0], arrow.points[1], x, y],
              };
            }
            return arrow;
          })
        );
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) =>
          scribbles.map((scribble) => {
            if (scribble.id === currentShapeId.current) {
              return {
                ...scribble,
                points: [...scribble.points, x, y],
              };
            }
            return scribble;
          })
        );
        break;

      case ACTIONS.ERASER:
        const eraserRadius = 10; // Adjust as needed
        setRectangles(
          rectangles.filter(
            (rect) => !isPointInsideRect(x, y, rect, eraserRadius)
          )
        );
        setCircles(
          circles.filter(
            (circle) => !isPointInsideCircle(x, y, circle, eraserRadius)
          )
        );
        setArrows(
          arrows.filter(
            (arrow) => !isPointNearLine(x, y, arrow.points, eraserRadius)
          )
        );
        setScribbles(
          scribbles.filter(
            (scribble) => !isPointNearLine(x, y, scribble.points, eraserRadius)
          )
        );
        break;
    }
  }

  function onPointerUp() {
    isPaining.current = false;
  }

  function handleExport() {
    const uri = stageRef.current.toDataURL();
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function onClick(e) {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  }
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  // Function to add current state to history
  const addToHistory = (newState) => {
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  // Undo function
  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const previousState = history[currentStep - 1];
      setRectangles(previousState.rectangles);
      setCircles(previousState.circles);
      setArrows(previousState.arrows);
      setScribbles(previousState.scribbles);
    }
  };

  // Redo function
  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      const nextState = history[currentStep + 1];
      setRectangles(nextState.rectangles);
      setCircles(nextState.circles);
      setArrows(nextState.arrows);
      setScribbles(nextState.scribbles);
    }
  };

  // Helper functions for eraser
  const isPointInsideRect = (x, y, rect, tolerance) => {
    return (
      x >= rect.x - tolerance &&
      x <= rect.x + rect.width + tolerance &&
      y >= rect.y - tolerance &&
      y <= rect.y + rect.height + tolerance
    );
  };

  const isPointInsideCircle = (x, y, circle, tolerance) => {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return Math.sqrt(dx * dx + dy * dy) <= circle.radius + tolerance;
  };

  const isPointNearLine = (x, y, points, tolerance) => {
    for (let i = 0; i < points.length - 2; i += 2) {
      const x1 = points[i];
      const y1 = points[i + 1];
      const x2 = points[i + 2];
      const y2 = points[i + 3];
      const distance = pointToLineDistance(x, y, x1, y1, x2, y2);
      if (distance <= tolerance) return true;
    }
    return false;
  };

  const pointToLineDistance = (x, y, x1, y1, x2, y2) => {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) param = dot / lenSq;
    let xx, yy;
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const [texts, setTexts] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [editingText, setEditingText] = useState(null);

  function handleTextDblClick(textNode) {
    // hide text node and transformer:
    textNode.hide();
    transformerRef.current.hide();

    // create textarea over canvas with absolute position
    const textPosition = textNode.absolutePosition();
    const areaPosition = {
      x: stageRef.current.container().offsetLeft + textPosition.x,
      y: stageRef.current.container().offsetTop + textPosition.y,
    };

    // create textarea and style it
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);

    textarea.value = textNode.text();
    textarea.style.position = "absolute";
    textarea.style.top = `${areaPosition.y}px`;
    textarea.style.left = `${areaPosition.x}px`;
    textarea.style.width = `${textNode.width() - textNode.padding() * 2}px`;
    textarea.style.height = `${
      textNode.height() - textNode.padding() * 2 + 5
    }px`;
    textarea.style.fontSize = `${textNode.fontSize()}px`;
    textarea.style.border = "1px solid #999";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.lineHeight = textNode.lineHeight();
    // textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = "left top";
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();

    const rotation = textNode.rotation();
    let transform = "";
    if (rotation) {
      transform += `rotateZ(${rotation}deg)`;
    }
    textarea.style.transform = transform;

    // reset height
    textarea.style.height = "auto";
    // after browsers resized it we can set actual value
    textarea.style.height = `${textarea.scrollHeight + 3}px`;

    textarea.focus();

    function removeTextarea() {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener("click", handleOutsideClick);
      textNode.show();
      transformerRef.current.show();
      transformerRef.current.forceUpdate();
    }

    function setTextareaWidth(newWidth) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * textNode.fontSize();
      }
      // some extra fixes on different browsers
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      const isFirefox =
        navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }

      const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
      if (isEdge) {
        newWidth += 1;
      }
      textarea.style.width = `${newWidth}px`;
    }

    textarea.addEventListener("keydown", function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textarea.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    textarea.addEventListener("keydown", function (e) {
      const scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = "auto";
      textarea.style.height = `${
        textarea.scrollHeight + textNode.fontSize()
      }px`;
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        textNode.text(textarea.value);
        removeTextarea();
      }
    }
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  }

  function checkDeselect(e) {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  }

  function onSelect(e) {
    const id = e.target.id();
    selectShape(id);
  }

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setStageSize({
          width: offsetWidth,
          height: offsetHeight,
        });
      }
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen flex flex-col">
        {/* Controls */}
        <div className="absolute top-0 z-10 w-full py-2 h-16">
          <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
            <button
              onClick={onClose}
              className="p-1 hover:bg-violet-100 rounded"
            >
              <IoMdClose size={"1.5rem"} />
            </button>
            <button
              className={
                action === ACTIONS.SELECT
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.SELECT)}
            >
              <GiArrowCursor size={"2rem"} />
            </button>
            <button
              className={
                action === ACTIONS.RECTANGLE
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.RECTANGLE)}
            >
              <TbRectangle size={"2rem"} />
            </button>
            <button
              className={
                action === ACTIONS.CIRCLE
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.CIRCLE)}
            >
              <FaRegCircle size={"1.5rem"} />
            </button>
            <button
              className={
                action === ACTIONS.ARROW
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.ARROW)}
            >
              <FaLongArrowAltRight size={"2rem"} />
            </button>
            <button
              className={
                action === ACTIONS.SCRIBBLE
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.SCRIBBLE)}
            >
              <LuPencil size={"1.5rem"} />
            </button>
            <button
              className={
                action === ACTIONS.TEXT
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.TEXT)}
            >
              <TbTypography size={"1.5rem"} />
            </button>
            <button
              className={
                action === ACTIONS.ERASER
                  ? "bg-violet-300 p-1 rounded"
                  : "p-1 hover:bg-violet-100 rounded"
              }
              onClick={() => setAction(ACTIONS.ERASER)}
            >
              <FaEraser size={"1.5rem"} />
            </button>
            <button>
              <input
                className="w-6 h-6"
                type="color"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
              />
            </button>
            <button>
              <input
                className="w-6 h-6"
                type="color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
              />
            </button>

            <button onClick={handleExport}>
              <IoMdDownload size={"1.5rem"} />
            </button>
            <button
              onClick={undo}
              disabled={currentStep <= 0}
              className="p-1 hover:bg-violet-100 rounded"
            >
              <IoMdUndo size={"1.5rem"} />
            </button>

            <button
              onClick={redo}
              disabled={currentStep >= history.length - 1}
              className="p-1 hover:bg-violet-100 rounded"
            >
              <IoMdRedo size={"1.5rem"} />
            </button>
          </div>
        </div>
        {/* Canvas */}
        <div ref={containerRef} className="flex-grow h-full">
          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            className="w-full h-full"
          >
            <Layer>
              <Rect
                x={0}
                y={0}
                height={stageSize.height}
                width={stageSize.width}
                fill="#ffffff"
                id="bg"
                onClick={() => {
                  transformerRef.current.nodes([]);
                }}
              />

              {rectangles.map((rectangle) => (
                <Rect
                  key={rectangle.id}
                  x={rectangle.x}
                  y={rectangle.y}
                  stroke={rectangle.stroke}
                  strokeWidth={2}
                  fill={rectangle.fill}
                  height={rectangle.height}
                  width={rectangle.width}
                  draggable={isDraggable}
                  onClick={onClick}
                />
              ))}

              {circles.map((circle) => (
                <Circle
                  key={circle.id}
                  radius={circle.radius}
                  x={circle.x}
                  y={circle.y}
                  stroke={circle.stroke}
                  strokeWidth={2}
                  fill={circle.fill}
                  draggable={isDraggable}
                  onClick={onClick}
                />
              ))}
              {arrows.map((arrow) => (
                <Arrow
                  key={arrow.id}
                  points={arrow.points}
                  stroke={arrow.stroke}
                  strokeWidth={2}
                  fill={arrow.fill}
                  draggable={isDraggable}
                  onClick={onClick}
                />
              ))}

              {scribbles.map((scribble) => (
                <Line
                  key={scribble.id}
                  lineCap="round"
                  lineJoin="round"
                  points={scribble.points}
                  stroke={scribble.stroke}
                  strokeWidth={2}
                  fill={scribble.fillColor}
                  draggable={isDraggable}
                  onClick={onClick}
                />
              ))}

              {texts.map((text) => (
                <KonvaText
                  key={text.id}
                  id={text.id}
                  x={text.x}
                  y={text.y}
                  text={text.text}
                  fontSize={text.fontSize}
                  fill={text.fill}
                  draggable={isDraggable}
                  onDblClick={(e) => {
                    handleTextDblClick(e.target);
                  }}
                  
                  onClick={onSelect}
                  onDblTap={(e) => {
                    handleTextDblClick(e.target);
                  }}
                />
              ))}

              {selectedId && (
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (newBox.width < 5 || newBox.height < 5) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
              )}

              <Transformer ref={transformerRef} />
            </Layer>
          </Stage>
        </div>
      </div>
    </>
  );
}
