import ColorPicker from "./classes/ColorPicker.js";
import PaintingGrid from "./classes/PaintingGrid.js";

const settings = {
    //mandatory
    sliderDivName: "colorSlider",
    colorLabelDivName: "colorLabel",
    fileName: "printed-canvas",
    //not mandatory
    saturation: 100,
    luninance: 50,
    defaultSquaresPerSide: 10,
    PaintingGridSize: 500
}

window.addEventListener('load', function() {

    // init Color    
    let colorSlider = document.getElementById(settings.sliderDivName);
    let colorLabel = document.getElementById(settings.colorLabelDivName);

    let colorPickerClass = new ColorPicker(colorSlider, colorLabel, settings.saturation, settings.luninance);

    colorSlider.addEventListener("input", (e) => {
        colorPickerClass.updateSelectedColor(e.target.value);
    });

    // init PaintingGrid    
    let tableElement = document.getElementById('pixelTable');
    let pixelCanvas = document.getElementById('pixelCanvas');
    let PaintingGridClass = new PaintingGrid(tableElement, pixelCanvas, settings.defaultSquaresPerSide, settings.PaintingGridSize);
    addCellClickListener()

    // init inputRows and inputColumns
    let inputRows = document.getElementById('inputRows');
    let inputColumns = document.getElementById('inputColumns');
    inputRows.value = PaintingGridClass.getSquaresPerSide()
    inputColumns.value = PaintingGridClass.getSquaresPerSide()

    //  when inputRows set InputWitdth and reset table    
    inputRows.onchange = (event) => {
        PaintingGridClass.squaresPerSide = inputRows.value
        inputColumns.value = PaintingGridClass.squaresPerSide
        PaintingGridClass.makeGrid()
        addCellClickListener();
    }

    //  when inputColumns set InputWitdth and reset table    
    inputColumns.onchange = (event) => {
        PaintingGridClass.squaresPerSide = inputColumns.value
        inputRows.value = PaintingGridClass.squaresPerSide
        PaintingGridClass.makeGrid()
        addCellClickListener();
    }

    // manage button with id 'downloadPrintedTable' click
    document.getElementById('downloadPrintedTable').onclick = () => {
        PaintingGridClass.printCanvas(settings.fileName)
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