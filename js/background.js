(function (global) {
    "use strict";

    var BG = (function () {
        var canvas,
            ctx,
            W, H,
            mp, particles,
            angle = 0,
            frame = 2;

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        var animate = function () {
            frame++;
            if (frame > 2) {
                frame = 0;
            } else {
                requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, W, H);

            ctx.fillStyle = "rgba(169, 165, 159, 0.15)";
            ctx.beginPath();
            angle += 0.01;
            var i, p;
            for (i = 0; i < mp; i++) {
                p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);

                //Updating X and Y coordinates
                //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
                //Every particle has its own density which can be used to make the downward movement different for each flake
                //Lets make it more random by adding in the radius
                p.y += Math.cos(angle + p.d) + 1 + p.r / 4;
                p.x += Math.sin(angle);

                if (p.x > W + 5 || p.x < -5 || p.y > H) {
                    if (i % 3 > 0) {
                        particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d};
                    }
                    else {
                        if (Math.sin(angle) > 0) {
                            particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d};
                        }
                        else {
                            particles[i] = {x: W + 5, y: Math.random() * H, r: p.r, d: p.d};
                        }
                    }
                }
            }
            ctx.fill();

            requestAnimationFrame(animate);
        };

        return {
            init: function () {
                canvas = document.getElementById("bg");
                ctx = canvas.getContext("2d");

                W = window.innerWidth;
                H = window.innerHeight;
                canvas.width = W;
                canvas.height = H;

                mp = Math.floor(W * 50/1920); //max particles
                particles = [];
                for (var i = 0; i < mp; i++) {
                    particles.push({
                        x: Math.random() * W, //x-coordinate
                        y: Math.random() * H, //y-coordinate
                        r: Math.random() * 4 + 1, //radius
                        d: Math.random() * mp //density
                    });
                }

                if (requestAnimationFrame) {
                    animate();
                }
            },

            resize: function () {
                W = window.innerWidth;
                H = window.innerHeight;
                canvas.width = W;
                canvas.height = H;
                mp = Math.floor(W * 50/1920); //max particles

                particles = [];
                for (var i = 0; i < mp; i++) {
                    particles.push({
                        x: Math.random() * W, //x-coordinate
                        y: Math.random() * H, //y-coordinate
                        r: Math.random() * 4 + 1, //radius
                        d: Math.random() * mp //density
                    });
                }
            }
        };
    })();

    global.BG = BG;
})(this);