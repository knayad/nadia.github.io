/*!
* Start Bootstrap - Resume v7.0.3 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// function to close responsive navbar after click

    let aria = document.getElementById("aria-expanded");
    let item = document.getElementByID("nav-item");
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const navLink = document.querySelectorAll('#navbarResponsive .nav-link');
    let hide = window.getComputedStyle(navbarToggler).display === 'none';
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    funct hideNav(){
        responsiveNavItem.addEventListener('click', (navLink) => {
            if (aria == true){
                return hide;
            }
        });

// math random colors path fill//

const loadSVG = () => {
    var a = document.getElementById("svg");
                                    
    const setBg = () => {
      const randomColor = Math.floor(Math.random()*16777215).toString(16);
      window.getComputedStyle(a)= "#" + randomColor;
      color.innerHTML = "#" + randomColor;
    }

genNew.window.getComputedStyle(a, setBg);
setBg();
};
        
loadSVG();
   
// ////////////////////// //
// ANIMATION FOR NAV BAR //
// ///////////////////// //

(function() {
    var width, height, canvas, ctx, points, target, animateHeader = true;

    // Main

    initAnimation();
    addListeners();

        canvas = document.getElementById('sideNav');
        height = sideNav.innerHeight;
        width = sideNav.innerWidth;
        sideNav.style.height = height+'px';

        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();

// ////////////////// //
  //    carousel   //
// //////////////// //

// Instantiate the Bootstrap carousel
$('.multi-item-carousel').carousel({
  interval: false
});

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
$('.multi-item-carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this));
  } else {
  	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
  }
});

// ////////////////////// //
//      end  carousel    //
// ///////////////////// //

// ///////////////////////// //
// phone visibility function //
// https://www.penwatch.net/cms/js_show_hide//
// ///////////////////////// //

// Script to hide/show menu

function contactInfo() {
  var x = document.getElementById("myInfo");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// //////////////////////// //
   // end menu for phone //
// ////////////////////// //

// ///////////////////////// //
//      LOADING CANVAS      //
// /////////////////////// //

const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;

// canvas settings
var viewWidth = 512,
    viewHeight = 350,
    drawingCanvas = document.getElementById("drawing_canvas"),
    ctx,
    timeStep = (1/60);

Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Particle = function(p0, p1, p2, p3) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color =  '#' + Math.floor((Math.random() * 0xffffff)).toString(16);

    this.w = 8;
    this.h = 6;

    this.complete = false;
};

Particle.prototype = {
    update:function() {
        this.time = Math.min(this.duration, this.time + timeStep);

        var f = Ease.outCubic(this.time, 0, 1, this.duration);
        var p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

        var dx = p.x - this.x;
        var dy = p.y - this.y;

        this.r =  Math.atan2(dy, dx) + HALF_PI;
        this.sy = Math.sin(Math.PI * f * 10);
        this.x = p.x;
        this.y = p.y;

        this.complete = this.time === this.duration;
    },
    draw:function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.r);
        ctx.scale(1, this.sy);

        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

        ctx.restore();
    }
};

Loader = function(x, y) {
    this.x = x;
    this.y = y;

    this.r = 24;
    this._progress = 0;

    this.complete = false;
};

Loader.prototype = {
    reset:function() {
        this._progress = 0;
        this.complete = false;
    },
    set progress(p) {
        this._progress = p < 0 ? 0 : (p > 1 ? 1 : p);

        this.complete = this._progress === 1;
    },
    get progress() {
        return this._progress;
    },
    draw:function() {
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, -HALF_PI, TWO_PI * this._progress - HALF_PI);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.fill();
    }
};

// pun intended
Exploader = function(x, y) {
    this.x = x;
    this.y = y;

    this.startRadius = 24;

    this.time = 0;
    this.duration = 0.4;
    this.progress = 0;

    this.complete = false;
};

Exploader.prototype = {
    reset:function() {
        this.time = 0;
        this.progress = 0;
        this.complete = false;
    },
    update:function() {
        this.time = Math.min(this.duration, this.time + timeStep);
        this.progress = Ease.inBack(this.time, 0, 1, this.duration);

        this.complete = this.time === this.duration;
    },
    draw:function() {
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.startRadius * (1 - this.progress), 0, TWO_PI);
        ctx.fill();
    }
};

var particles = [],
    loader,
    exploader,
    phase = 0;

function initDrawingCanvas() {
    drawingCanvas.width = viewWidth;
    drawingCanvas.height = viewHeight;
    ctx = drawingCanvas.getContext('2d');

    createLoader();
    createExploader();
    createParticles();
}

function createLoader() {
    loader = new Loader(viewWidth * 0.5, viewHeight * 0.5);
}

function createExploader() {
    exploader = new Exploader(viewWidth * 0.5, viewHeight * 0.5);
}

function createParticles() {
    for (var i = 0; i < 128; i++) {
        var p0 = new Point(viewWidth * 0.5, viewHeight * 0.5);
        var p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
        var p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
        var p3 = new Point(Math.random() * viewWidth, viewHeight + 64);

        particles.push(new Particle(p0, p1, p2, p3));
    }
}

function update() {

    switch (phase) {
        case 0:
            loader.progress += (1/45);
            break;
        case 1:
            exploader.update();
            break;
        case 2:
            particles.forEach(function(p) {
                p.update();
            });
            break;
    }
}

function draw() {
    ctx.clearRect(0, 0, viewWidth, viewHeight);

    switch (phase) {
        case 0:
            loader.draw();
            break;
        case 1:
            exploader.draw();
            break;
        case 2:
            particles.forEach(function(p) {
                p.draw();
            });
        break;
    }
}

window.onload = function() {
    initDrawingCanvas();
    requestAnimationFrame(loop);
};

function loop() {
    update();
    draw();

    if (phase === 0 && loader.complete) {
        phase = 1;
    }
    else if (phase === 1 && exploader.complete) {
        phase = 2;
    }
    else if (phase === 2 && checkParticlesComplete()) {
        // reset
        phase = 0;
        loader.reset();
        exploader.reset();
        particles.length = 0;
        createParticles();
    }

    requestAnimationFrame(loop);
}

function checkParticlesComplete() {
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].complete === false) return false;
    }
    return true;
}

// math and stuff

/**
 * easing equations from http://gizma.com/easing/
 * t = current time
 * b = start value
 * c = delta value
 * d = duration
 */
var Ease = {
    inCubic:function (t, b, c, d) {
        t /= d;
        return c*t*t*t + b;
    },
    outCubic:function(t, b, c, d) {
        t /= d;
        t--;
        return c*(t*t*t + 1) + b;
    },
    inOutCubic:function(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    },
    inBack: function (t, b, c, d, s) {
        s = s || 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    }
};

function cubeBezier(p0, c0, c1, p1, t) {
    var p = new Point();
    var nt = (1 - t);

    p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
    p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

    return p;
}

// end //
