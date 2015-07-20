window.onload = function() {
    var idh, idc;
    idh = document.getElementById("large-header1");
    idc = document.getElementById("canvas1");
    backcanvas(idh, idc);
    var input1 = document.getElementById("st-control-1");
    var input2 = document.getElementById("st-control-2");
    var input3 = document.getElementById("st-control-3");
    var input4 = document.getElementById("st-control-4");
    input1.onclick = function() {
        idh = document.getElementById("large-header1");
        idc = document.getElementById("canvas1");
        backcanvas(idh, idc);
    };
    input2.onclick = function() {
        idh = document.getElementById("large-header2");
        idc = document.getElementById("canvas2");
        backcanvas(idh, idc);
        
    };
    input3.onclick = function() {
        idh = document.getElementById("large-header3");
        idc = document.getElementById("canvas3");
        backcanvas(idh, idc);
       
    };
    input4.onclick = function() {
        idh = document.getElementById("large-header4");
        idc = document.getElementById("canvas4");
        backcanvas(idh, idc);
        
    };
}

function backcanvas(idh, idc) {
    var width, height, largeHeader, canvas, ctx, circles, idh, idc, target, animateHeader = true;
    // Main
    initHeader();
    addListeners();
    // id获取
    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {
            x: 0,
            y: height
        };
        largeHeader = idh;
        // console.log(largeHeader);
        largeHeader.style.height = height + 'px';
        canvas = idc;
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        // create particles
        circles = [];
        for (var x = 0; x < width * 0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }
    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }
    // Canvas manipulation
    function Circle() {
        var _this = this;
        // constructor
        (function() {
            _this.pos = {};
            init();
            // console.log(_this);
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 100;
            _this.alpha = 0.1 + Math.random() * 0.3;
            _this.scale = 0.1 + Math.random() * 0.3;
            _this.velocity = Math.random();
        }
        this.draw = function() {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,48,100,' + _this.alpha + ')';
            ctx.fill();
        };
    }
}