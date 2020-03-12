export default class ColorPicker {
    constructor(sliderEl, colorLabelEl, saturation = 100, luminance = 50, hue = 180) {
        this.selectedHSL = {
            H: hue,
            S: saturation,
            L: luminance > 80 ? 80 : luminance,
        }
        this.selectedRGB = {
            R: undefined,
            G: undefined,
            B: undefined
        }
        this.selectedHEX = {
            r: undefined,
            g: undefined,
            b: undefined
        }
        this.colorLabel = colorLabelEl;
        this.colorSlider = sliderEl;

        this.setSliderBackgroundColor();
        this.updateSelectedColor(this.selectedHSL.H);
    }


    setRgbFromHue(hueValue) {

        let h = hueValue / 360;
        let s = this.selectedHSL.S / 100;
        let l = this.selectedHSL.L / 100;

        let m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        let m1 = l * 2 - m2;

        let R = this.convertRgbFromHue(m1, m2, h + 1 / 3);
        let G = this.convertRgbFromHue(m1, m2, h);
        let B = this.convertRgbFromHue(m1, m2, h - 1 / 3);

        // set RGB
        this.selectedRGB.R = Math.round(R * 255);
        this.selectedRGB.G = Math.round(G * 255);
        this.selectedRGB.B = Math.round(B * 255);
    }

    setHexFromRbg() {
        this.selectedHEX = {
            r: this.convertValueToHex(this.selectedRGB.R),
            g: this.convertValueToHex(this.selectedRGB.G),
            b: this.convertValueToHex(this.selectedRGB.B)
        }
    }

    setGradient(el, steps) {
        let gradientString = "linear-gradient(to right,";
        let stepSize = 100 / (steps.length - 1);

        for (var i = 0; i < steps.length; i++) {
            gradientString += (i > 0 ? "," : "") + steps[i] + (i * stepSize) + "%";
        }
        el.style.backgroundImage = gradientString + ")";
    }
    setSliderBackgroundColor() {
        this.colorSlider.style.backgroundColor = "rgb(" + this.selectedRGB.R + "," + this.selectedRGB.G + "," + this.selectedRGB.B + ")";

        this.setGradient(this.colorSlider, [
            this.convertToHSLFormat(0, this.selectedHSL.S, this.selectedHSL.L),
            this.convertToHSLFormat(60, this.selectedHSL.S, this.selectedHSL.L),
            this.convertToHSLFormat(120, this.selectedHSL.S, this.selectedHSL.L),
            this.convertToHSLFormat(180, this.selectedHSL.S, this.selectedHSL.L),
            this.convertToHSLFormat(240, this.selectedHSL.S, this.selectedHSL.L),
            this.convertToHSLFormat(300, this.selectedHSL.S, this.selectedHSL.L),
            this.convertToHSLFormat(360, this.selectedHSL.S, this.selectedHSL.L)
        ]);
    }


    // conversion
    convertRgbFromHue(m1, m2, h) {
        if (h < 0)
            h = h + 1;
        else if (h > 1)
            h = h - 1;

        if (h * 6 < 1)
            return m1 + (m2 - m1) * h * 6;
        else if (h * 2 < 1)
            return m2;
        else if (h * 3 < 2)
            return m1 + (m2 - m1) * (2 / 3 - h) * 6

        return m1;
    }
    convertValueToHex(value) {
        let hex = value.toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;

    }
    convertToHEXFormat() {
        return `#${this.selectedHEX.r}${this.selectedHEX.g}${this.selectedHEX.b}`;
    }
    convertToHSLFormat(h, s, l) {
        return "hsl(" + h + "," + s + "%," + l + "%)"
    }

    // update
    updateSelectedColor(hueValue) {
        this.setRgbFromHue(hueValue);
        this.setHexFromRbg();

        let hex = this.convertToHEXFormat();
        //apply selected color to slider thumb
        let style = document.querySelector('[data="customCSS"]');
        style.innerHTML = `input[type=range]::-webkit-slider-thumb { background-color: ${hex} !important; } input[type=range]::-moz-range-thumb{ background-color: ${hex} !important;} input[type=range]::-ms-thumb{background-color: ${hex} !important;}`
            //apply selected color to colorLabel
        this.colorLabel.style.backgroundColor = hex;
        //update text label with selected hexadecimal
        this.updateHexColorLabel();
    }
    updateHexColorLabel() {
        this.colorLabel.innerHTML = this.convertToHEXFormat();
    }
}