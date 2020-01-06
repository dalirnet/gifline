(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const action = {
    config: {
        repeat: 0,
        width: 480,
        height: 320,
        offset: 10,
        workers: 3,
        quality: 10,
        workerScript: "scripts/gif.worker.js",
        font: "Open Sans",
        header: "GifLine",
        request: "npm install gifline --save-dev",
        response: "Command Line to Gif as Simple"
    },
    render() {
        let gifInstance = new GIF(this.config);
        let canvas = document.createElement("CANVAS");
        canvas = document.getElementById("draw");
        canvas.width = this.config.width;
        canvas.height = this.config.height;
        let context = canvas.getContext("2d");
        context.rect(0, 0, this.config.width, this.config.height);
        context.fillStyle = "#FFF";
        context.fill();
        //
        context.beginPath();
        context.moveTo(this.config.offset, (this.config.offset * 2) + 30);
        context.lineTo(this.config.offset, this.config.height - (this.config.offset * 2));
        context.quadraticCurveTo(this.config.offset, this.config.height - this.config.offset, this.config.offset * 2, this.config.height - this.config.offset);
        context.lineTo(this.config.width - (this.config.offset * 2), this.config.height - this.config.offset);
        context.quadraticCurveTo(this.config.width - this.config.offset, this.config.height - this.config.offset, this.config.width - this.config.offset, this.config.height - (this.config.offset * 2));
        context.lineTo(this.config.width - this.config.offset, (this.config.offset * 2) + 30);
        context.shadowColor = "#979797";
        context.shadowBlur = this.config.offset;
        context.fillStyle = "#222224";
        context.fill();
        //
        context.beginPath();
        context.moveTo(this.config.offset, (this.config.offset * 2) + 30);
        context.lineTo(this.config.offset, this.config.offset * 2);
        context.quadraticCurveTo(this.config.offset, this.config.offset, this.config.offset * 2, this.config.offset);
        context.lineTo(this.config.width - (this.config.offset * 2), this.config.offset);
        context.quadraticCurveTo(this.config.width - this.config.offset, this.config.offset, this.config.width - this.config.offset, this.config.offset * 2);
        context.lineTo(this.config.width - this.config.offset, (this.config.offset * 2) + 30);
        context.shadowColor = "#d2d2d4";
        context.shadowBlur = this.config.offset;
        context.fillStyle = "#f6f6f4";
        context.fill();
        //
        context.beginPath();
        context.moveTo(this.config.offset, (this.config.offset * 2) + 30);
        context.lineTo(this.config.width - this.config.offset, (this.config.offset * 2) + 30);
        context.lineTo(this.config.width - this.config.offset, (this.config.offset * 3) + 30);
        context.lineTo(this.config.offset, (this.config.offset * 3) + 30);
        context.shadowBlur = 0;
        context.fillStyle = "#222224";
        context.fill();
        //
        context.beginPath();
        context.arc(this.config.width - 90, 30, 8, 0, 2 * Math.PI);
        context.fillStyle = "#fe795c";
        context.fill();
        //
        context.beginPath();
        context.arc(this.config.width - 65, 30, 8, 0, 2 * Math.PI);
        context.fillStyle = "#fae61c";
        context.fill();
        //
        context.beginPath();
        context.arc(this.config.width - 40, 30, 8, 0, 2 * Math.PI);
        context.fillStyle = "#45bea4";
        context.fill();
        //
        context.font = "13px '" + this.config.font + "'";
        context.textAlign = "left";
        context.textBaseline = "middle";
        context.fillStyle = "#fae61c";
        context.fillText(this.config.header, this.config.offset * 3, (this.config.offset * 5) + 30);
        //
        context.font = "10px '" + this.config.font + "'";
        context.textAlign = "left";
        context.textBaseline = "middle";
        context.fillStyle = "#fefefc";
        context.fillText("⮞", (this.config.offset * 3) + context.measureText(this.config.header).width + 15, (this.config.offset * 5) + 30);
        //
        this.config.request = "$ " + this.config.request.replace();
        let char = "";
        for (let i = 0; i <= this.config.request.length; ++i) {
            char += this.config.request.charAt(i);
            context.beginPath();
            context.rect(this.config.offset * 2, (this.config.offset * 3) + 58, this.config.width - (this.config.offset * 4), this.config.height - ((this.config.offset * 5) + 58));
            context.fillStyle = "#222224";
            context.fill();
            context.font = "15px '" + this.config.font + "'";
            context.fillStyle = "#fefefc";
            context.fillText(char, this.config.offset * 3, (this.config.offset * 5) + 58);
            gifInstance.addFrame(canvas, { copy: true, delay: 100 });
            if (i < this.config.request.length) {
                let space = context.measureText(char).width;
                context.fillText("_", (this.config.offset * 3) + context.measureText(char).width, (this.config.offset * 5) + 58);
                gifInstance.addFrame(canvas, { copy: true, delay: 100 });
            }
        }
        //
        context.font = "13px '" + this.config.font + "'";
        context.fillStyle = "#b1b0b1";
        context.fillText("# " + this.config.response, this.config.offset * 3, (this.config.offset * 5) + 86);
        gifInstance.addFrame(canvas, { copy: true, delay: 8000 });

        gifInstance.on('finished', function (blob) {
            var a = new FileReader();
            a.onload = function (e) {
                document.getElementById("demo").src = e.target.result;
            }
            a.readAsDataURL(blob);
        });
        gifInstance.render();
    }
};
$(document).ready(() => {
    WebFont.load({
        google: {
            families: [action.config.font]
        },
        active() {
            action.render();
        }
    });
});
},{}]},{},[1])