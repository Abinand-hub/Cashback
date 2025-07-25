(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    //nav
    window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const logo = document.querySelector(".navbar-brand img");

    if (window.scrollY > 50) {
      navbar.classList.add("shrink");
      logo.classList.add("shrink-logo");
    } else {
      navbar.classList.remove("shrink");
      logo.classList.remove("shrink-logo");
    }
  });

    //background

   document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('particleCanvas');
            const ctx = document.getElementById('particleCanvas').getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 5 + 1;
                    this.speedX = Math.random() * 2 - 1;
                    this.speedY = Math.random() * 2 - 1;
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                }

                draw() {
                    ctx.fillStyle = 'rgba(40, 167, 69, 0.8)'; // Green color matching .text-success
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            const particlesArray = [];
            const numberOfParticles = 100;

            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }

            function connectParticles() {
                const maxDistance = 100;
                for (let i = 0; i < particlesArray.length; i++) {
                    for (let j = i + 1; j < particlesArray.length; j++) {
                        const dx = particlesArray[i].x - particlesArray[j].x;
                        const dy = particlesArray[i].y - particlesArray[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < maxDistance) {
                            ctx.strokeStyle = `rgba(40, 167, 69, ${1 - distance / maxDistance})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                    particlesArray[i].draw();
                }
                connectParticles();
                requestAnimationFrame(animate);
            }

            animate();

            // Hide spinner after page load
            setTimeout(() => {
                document.getElementById('spinner').classList.remove('show');
            }, 1000);
        });

        // Counter
   document.addEventListener('DOMContentLoaded', () => {
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/[^\d]/g, '');
        const increment = target / 200;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCounter, 10);
        } else {
          counter.innerText = target >= 1000000 ? (target / 1000000) + 'M' : target;
          const label = counter.parentElement.querySelector('p').innerText;
          if (label === 'Users Onboarded' || label === 'Volume') {
            counter.innerText += '+';
          }
        }
      };
      updateCounter();
    });

    // 3D Animation
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setClearColor(0xffffff);
    const container = document.getElementById('fact-animation');
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const pointCount = 40;
    const radius = 3;
    const points = [];

    // Generate points on sphere
    for (let i = 0; i < pointCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z));
    }

    // Light green glow points
    const pointGeom = new THREE.BufferGeometry().setFromPoints(points);
    const pointMat = new THREE.PointsMaterial({
      color: 0x90ee90,
      size: 0.12,
      transparent: true,
      opacity: 0.9
    });
    const pointCloud = new THREE.Points(pointGeom, pointMat);
    group.add(pointCloud);

    // Lines between points
    const lineGeom = new THREE.BufferGeometry();
    const linePositions = [];

    for (let i = 0; i < pointCount; i++) {
      for (let j = i + 1; j < pointCount; j++) {
        if (Math.random() > 0.75) {
          linePositions.push(points[i].x, points[i].y, points[i].z);
          linePositions.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }

    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x90ee90,
      transparent: true,
      opacity: 0.6
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    group.add(lines);

    camera.position.z = 8;

    function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.003;
      group.rotation.x += 0.0015;
      renderer.render(scene, camera);
    }

    function resizeRenderer() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', resizeRenderer);
    resizeRenderer();
    animate();
  });


    //image slider

    // JavaScript to handle infinite loop
        const slider = document.querySelector('.image-slider');
        slider.addEventListener('animationiteration', () => {
            slider.style.transition = 'none';
            slider.style.transform = 'translateX(0)';
            // Force reflow to reset animation
            void slider.offsetWidth;
            slider.style.transition = '';
        });
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    //service

    // Particle background only inside right-side box
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match tab-content
function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}
resizeCanvas();

// Resize canvas on window resize
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(40, 167, 69, 0.8)'; // Green particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particle array
const particlesArray = [];
const numberOfParticles = 50; // Reduced for smaller area

for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
}

// Connect particles if they are close
function connectParticles() {
    const maxDistance = 100; // Distance at which particles connect
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(40, 167, 69, ${1 - distance / maxDistance})`; // Green connection lines
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
}

animate();


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonial carousel
    $(".testimonial-carousel-1").owlCarousel({
        loop: true,
        dots: false,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

    $(".testimonial-carousel-2").owlCarousel({
        loop: true,
        dots: false,
        rtl: true,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

    

})(jQuery);