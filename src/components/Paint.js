import React, {useEffect, useState} from 'react';
import {Layer, Line, Stage} from 'react-konva';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {CompactPicker} from 'react-color';

const Paint = ({canvasWidth = 200, canvasHeight = 200}) => {

    const [dragging, setDragging] = useState(false);
    const [lines, setLines] = useState([]);
    const [currentPoints, setCurrentPoints] = useState([]);
    const [canvas, setCanvas] = useState();
    const [canvasX, setCanvasX] = useState();
    const [canvasY, setCanvasY] = useState();
    const [color, setColor] = useState({hex: '0x000000'});

    useEffect(() => {
        if (canvas) {
            console.log('Canvas available');
            const {x, y} = canvas.getBoundingClientRect();
            setCanvasX(x);
            setCanvasY(y);
        } else {
            setCanvas(document.getElementsByTagName('canvas')[0]);
        }
    }, [canvas]);

    const mouseDown = (e) => {
        // offsetX and offsetY are relative to the target element
        const {offsetX: x, offsetY: y} = e.evt;
        setDragging(true);
        setCurrentPoints([x, y]);
    };

    const mouseUp = (e) => {
        setDragging(false);
        drawLine();
    };

    const mouseMove = (e) => {
        // offsetX and offsetY are relative to the target element
        const {offsetX: x, offsetY: y} = e.evt;
        if (dragging) {
            setCurrentPoints([...currentPoints, x, y]);
        }
    };

    const touchStart = (e) => {
        // clientX and clientY are relative to the viewport
        // so need to offset it by the canvas absolute position
        const {clientX: x, clientY: y} = e.evt.targetTouches[0];
        setDragging(true);
        setCurrentPoints([x - canvasX, y - canvasY]);
    };

    const touchEnd = (e) => {
        setDragging(false);
        drawLine();
    };
    const touchMove = (e) => {
        const {clientX: x, clientY: y} = e.evt.targetTouches[0];

        if (dragging) {
            setCurrentPoints([...currentPoints, x - canvasX, y - canvasY]);
        }
    };
    const drawLine = () => {
        const line = <Line points={currentPoints} stroke={color.hex} strokeWidth={2} />;
        setLines([...lines, line]);
    };

    const undo = () => {
        setLines(lines.slice(0, lines.length - 1));
        setCurrentPoints([]);
    };

    return (
        <Box px={1}>
            <Stage width={canvasWidth}
                   height={canvasHeight}
                   onMouseUp={e => mouseUp(e)}
                   onMouseDown={e => mouseDown(e)}
                   onMouseMove={e => mouseMove(e)}
                   onTouchStart={e => touchStart(e)}
                   onTouchEnd={e => touchEnd(e)}
                   onTouchMove={e => touchMove(e)}>
                <Layer>
                    {lines}
                </Layer>
                {
                    dragging &&
                    <Layer>
                        <Line points={currentPoints} strokeWidth={2} stroke={color.hex} />
                    </Layer>
                }
            </Stage>
            <Button variant="contained" onClick={undo}>Undo</Button>
            <CompactPicker onChangeComplete={setColor} />
        </Box>
    );
};

export default Paint;