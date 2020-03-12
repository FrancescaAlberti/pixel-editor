export default class PaintingGrid {
    constructor(paintingGridEl, canvasEl, squaresPerSide = 10, paintingGridSize = 500) {
        this.paintingGridEl = paintingGridEl;
        this.paintingGridSize = paintingGridSize;
        this.paintingGridEl.style.width = paintingGridSize;
        this.paintingGridEl.style.height = paintingGridSize;
        this.canvasEl = canvasEl;
        this.canvasEl.width = paintingGridSize;
        this.canvasEl.height = paintingGridSize;
        this.squaresPerSide = squaresPerSide;
        this.makeGrid()
    }

    getSquaresPerSide() {
        return this.squaresPerSide;
    }

    setSquareSide(squaresPerSide) {
        this.squaresPerSide = squaresPerSide;
    }

    makeGrid() {
        // clean table
        this.paintingGridEl.innerHTML = '';

        // draw table    
        let tableBody = document.createElement("tbody");
        for (let i = 0; i < this.squaresPerSide; i++) {
            let row = document.createElement("tr");
            for (let i = 0; i < this.squaresPerSide; i++) {
                let cell = document.createElement("td");
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }
        this.paintingGridEl.appendChild(tableBody);
    };

    getTableColorsArray() {
        // retrieve cells background colors
        let tableRows = this.paintingGridEl.rows
        let colorList = []
        for (let i = 0; i < tableRows.length; i++) {
            let cellList = tableRows[i].children
            let cellColorList = []
            for (let j = 0; j < cellList.length; j++) {
                cellColorList.push(cellList[j].style['backgroundColor']);
            }
            colorList.push(cellColorList)

        }
        return colorList
    }

    drawCanvas() {
        let canvasContext = this.canvasEl.getContext("2d");
        let cellSize = this.paintingGridSize / this.squaresPerSide;
        canvasContext.clearRect(0, 0, this.paintingGridSize, this.paintingGridSize);
        canvasContext.save();
        let myTableColorsArray = this.getTableColorsArray();
        for (let y = 0; y < this.squaresPerSide; y++) {
            for (let x = 0; x < this.squaresPerSide; x++) {
                canvasContext.fillStyle = myTableColorsArray[y][x] ? myTableColorsArray[y][x] : '#FFF';
                canvasContext.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    printCanvas(fileName) {
        // draw a canvas based on the table and print as png
        this.drawCanvas();

        let context = this.canvasEl.getContext("2d");
        let MIME_TYPE = "image/png";

        let imgURL = this.canvasEl.toDataURL(MIME_TYPE);

        let dlLink = document.createElement('a');
        dlLink.download = fileName;
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }

}