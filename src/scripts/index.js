const action = {
    default: {
        request: "npm install gifline --save-dev",
        response: "Command Line to Gif as Simple"
    },
    config: {
        repeat: 0,
        width: 480,
        height: 320,
        offset: 10,
        workers: 3,
        quality: 10,
        workerScript: "scripts/gif.worker.js",
        font: "Overpass",
        header: "GifLine",
        request: "",
        response: ""
    },
    render(request = "", response = "") {
        if (request.length) {
            this.config.request = request;
        } else {
            this.config.request = action.default.request;
        }
        if (response.length) {
            this.config.response = response;
        }
        else {
            this.config.response = action.default.response;
        }
        let gifInstance = new GIF(this.config);
        let canvas = document.getElementById("draw");
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
            gifInstance.addFrame(canvas, { copy: true, delay: 120 });
            if (i < this.config.request.length) {
                let space = context.measureText(char).width;
                context.fillText("_", (this.config.offset * 3) + context.measureText(char).width, (this.config.offset * 5) + 58);
                gifInstance.addFrame(canvas, { copy: true, delay: 80 });
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
WebFont.load({
    google: {
        families: [action.config.font]
    },
    active() {
        document.getElementById("container").style.opacity = 1;
        action.render();
        document.getElementById("request").addEventListener("change", (e) => {
            action.render(e.target.value, document.getElementById("response").value);
        });
        document.getElementById("response").addEventListener("change", (e) => {
            action.render(document.getElementById("request").value, e.target.value);
        });
        //
        document.getElementById("png").addEventListener("click", (e) => {
            let link = document.createElement("A");
            link.download = "gifline.png";
            link.href = document.getElementById("draw").toDataURL("image/png").replace("image/png", "image/octet-stream");
            link.click();
        });
        document.getElementById("gif").addEventListener("click", (e) => {
            let link = document.createElement("A");
            link.download = "gifline.gif";
            link.href = document.getElementById("demo").src;
            link.click();
        });
    }
});