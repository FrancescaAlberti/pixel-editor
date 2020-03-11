import ColorPicker from "./classes/ColorPicker.js";
import PaintingGrid from "./classes/PaintingGrid.js";

window.addEventListener('load', function() {

    // init Color    
    let colorSlider = document.getElementById("colorSlider");
    let colorLabel = document.getElementById("colorLabel");
    let colorPickerClass = new ColorPicker(colorSlider, colorLabel);

    colorSlider.addEventListener("change", (e) => {
        colorPickerClass.updateSelectedColor(e.target.value);
    });

    // init PaintingGrid    
    let tableElement = document.getElementById('pixelTable');
    let pixelCanvas = document.getElementById('pixelCanvas');
    let PaintingGridClass = new PaintingGrid(tableElement, pixelCanvas);
    addCellClickListener()

    // init inputRows and inputColumns
    let inputRows = document.getElementById('inputRows');
    let inputColumns = document.getElementById('inputColumns');
    inputRows.value = PaintingGridClass.getSquareSide()
    inputColumns.value = PaintingGridClass.getSquareSide()

    //  when inputRows set InputWitdth and reset table    
    inputRows.onchange = (event) => {
        PaintingGridClass.squareSide = inputRows.value
        inputColumns.value = PaintingGridClass.squareSide
        PaintingGridClass.makeGrid()
        addCellClickListener();
    }

    //  when inputColumns set InputWitdth and reset table    
    inputColumns.onchange = (event) => {
        PaintingGridClass.squareSide = inputColumns.value
        inputRows.value = PaintingGridClass.squareSide
        PaintingGridClass.makeGrid()
        addCellClickListener();
    }

    // manage button with id 'downloadPrintedTable' click
    document.getElementById('downloadPrintedTable').onclick = () => {
        PaintingGridClass.printCanvas()
    }

    function addCellClickListener() {
        // when cell is clicked set background-color
        let cells = tableElement.getElementsByTagName('td')
        for (let i = 0, len = cells.length; i < len; i++) {
            cells[i].onclick = (event) => {
                event.target.style.backgroundColor = colorPickerClass.convertToHEXFormat()
            };
        }
    };

})