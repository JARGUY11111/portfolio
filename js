/* =========================================
   CUSTOM CURSOR
========================================= */

const dot = document.querySelector(".cursor-dot");
const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", function (e) {

    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});


/* =========================================
   CURSOR HOVER EFFECT
========================================= */

document
    .querySelectorAll(
        "a, .tilt, .skill-panel, .interest-card"
    )
    .forEach(function (element) {

        element.addEventListener("mouseenter", function () {

            glow.style.width = "380px";
            glow.style.height = "380px";

        });


        element.addEventListener("mouseleave", function () {

            glow.style.width = "280px";
            glow.style.height = "280px";

        });

    });


/* =========================================
   MAGNETIC BUTTON EFFECT
========================================= */

document
    .querySelectorAll(".magnetic")
    .forEach(function (element) {

        element.addEventListener("mousemove", function (e) {

            const rect = element.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });


        element.addEventListener("mouseleave", function () {

            element.style.transform = "";

        });

    });


/* =========================================
   3D CARD TILT
========================================= */

document
    .querySelectorAll(".tilt")
    .forEach(function (card) {

        card.addEventListener("mousemove", function (e) {

            const rect = card.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (e.clientY - rect.top) /
                rect.height -
                0.5;

            card.style.transform =
                `perspective(700px)
                 rotateY(${x * 7}deg)
                 rotateX(${-y * 7}deg)
                 translateY(-3px)`;

        });


        card.addEventListener("mouseleave", function () {

            card.style.transform = "";

        });

    });


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(function (element) {

        observer.observe(element);

    });


/* =========================================
   PARTICLE BACKGROUND
========================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];

let mouse = {
    x: -1000,
    y: -1000
};


/* Create particles */

function createParticles() {

    particles = [];

    const amount =
        Math.min(
            85,
            Math.floor(window.innerWidth / 15)
        );


    for (let i = 0; i < amount; i++) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            vx:
                (Math.random() - 0.5)
                * 0.25,

            vy:
                (Math.random() - 0.5)
                * 0.25,

            r:
                Math.random() * 1.4
                + 0.3

        });

    }

}


/* Resize canvas */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    createParticles();

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* Mouse position */

window.addEventListener(
    "mousemove",
    function (e) {

        mouse.x = e.clientX;
        mouse.y = e.clientY;

    }
);


/* =========================================
   PARTICLE ANIMATION
========================================= */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(function (particle) {

        const dx =
            mouse.x -
            particle.x;

        const dy =
            mouse.y -
            particle.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* Cursor pushes particles */

        if (distance < 130) {

            particle.x -=
                (dx / distance) * 0.35;

            particle.y -=
                (dy / distance) * 0.35;

        }


        particle.x += particle.vx;
        particle.y += particle.vy;


        /* Bounce from screen */

        if (
            particle.x < 0 ||
            particle.x > canvas.width
        ) {

            particle.vx *= -1;

        }


        if (
            particle.y < 0 ||
            particle.y > canvas.height
        ) {

            particle.vy *= -1;

        }


        /* Draw particle */

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.r,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(184,255,84,.5)";

        ctx.fill();

    });


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();
