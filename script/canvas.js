let canvasDiv = document.querySelector('#canvas-container');
export let context = document.querySelector('#myCanvas').getContext('2d');

const repaint = () => {
    context.beginPath();
    context.fillStyle = "gray";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.stroke();
}

export const render = () =>
 {
    context.canvas.width = canvasDiv.offsetWidth;
    context.canvas.height = canvasDiv.offsetHeight;
}

export const draw = () => 
{
    repaint();
}

window.addEventListener('resize', () => {
    render();
    draw();
})

render();
draw();



