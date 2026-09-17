/* =====================================================
   PORTFOLIO JAVASCRIPT
   HOME + NAVBAR + 3 IMAGE SLIDESHOW + TYPING
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const navbar =
    document.getElementById("navbar");


const slides =
    document.querySelectorAll(".hero-slide");


const currentSlide =
    document.getElementById("current-slide");


const progressBar =
    document.getElementById("slide-progress-bar");


const menuToggle =
    document.querySelector(".menu-toggle");


const navMenu =
    document.querySelector(".nav-menu");


const navLinks =
    document.querySelectorAll(".nav-menu a");


const typingRole =
    document.getElementById("typing-role");



/* =====================================================
   SETTINGS
===================================================== */

const slideDuration = 5000;

const fadeDuration = 1800;



/* =====================================================
   SLIDE VARIABLES
===================================================== */

let currentIndex = 0;

let slideTimer = null;

let progressTimer = null;



/* =====================================================
   IMAGE SOURCES
===================================================== */

const imageSources = [

    "assets/images/home1.jpg",

    "assets/images/home2.jpg",

    "assets/images/home3.jpg"

];



/* =====================================================
   PRELOAD IMAGE
===================================================== */

function preloadImage(source) {

    return new Promise(function (resolve) {

        const image =
            new Image();


        image.onload = async function () {

            try {

                if (
                    typeof image.decode ===
                    "function"
                ) {

                    await image.decode();

                }

            } catch (error) {

                /*
                    Browser tertentu mungkin
                    tidak mendukung decode.
                    Gambar tetap digunakan.
                */

            }


            resolve(image);

        };


        image.onerror = function () {

            resolve(image);

        };


        image.src = source;

    });

}



/* =====================================================
   PRELOAD ALL IMAGES
===================================================== */

async function preloadAllImages() {

    await Promise.all(

        imageSources.map(
            function (source) {

                return preloadImage(
                    source
                );

            }
        )

    );

}



/* =====================================================
   RESET PROGRESS BAR
===================================================== */

function resetProgressBar() {

    if (!progressBar) {

        return;

    }


    /*
        Matikan transisi sementara
        agar progress kembali ke 0
        tanpa animasi mundur.
    */

    progressBar.style.transition =
        "none";


    progressBar.style.width =
        "0%";


    /*
        Force browser melakukan
        repaint sebelum animasi dimulai.
    */

    progressBar.offsetWidth;


    /*
        Progress berjalan selama
        5 detik.
    */

    progressBar.style.transition =
        `width ${slideDuration}ms linear`;


    progressBar.style.width =
        "100%";

}



/* =====================================================
   CHANGE SLIDE
===================================================== */

function changeSlide() {

    if (
        slides.length === 0
    ) {

        return;

    }



    /*
        Slide sebelumnya.
    */

    const previousSlide =
        slides[currentIndex];



    /*
        Pindah ke slide berikutnya.
    */

    currentIndex++;



    /*
        Setelah Home3 kembali
        ke Home1.
    */

    if (
        currentIndex >=
        slides.length
    ) {

        currentIndex = 0;

    }



    /*
        Slide berikutnya.
    */

    const nextSlide =
        slides[currentIndex];



    /*
        Letakkan slide baru
        di atas slide lama.
    */

    nextSlide.style.zIndex =
        "2";


    previousSlide.style.zIndex =
        "1";



    /*
        Aktifkan slide baru.
    */

    nextSlide.classList.add(
        "active"
    );



    /*
        Update counter.
    */

    if (currentSlide) {

        currentSlide.textContent =
            String(
                currentIndex + 1
            ).padStart(
                2,
                "0"
            );

    }



    /*
        Setelah fade selesai,
        matikan slide lama.
    */

    setTimeout(
        function () {

            previousSlide.classList.remove(
                "active"
            );

            previousSlide.style.zIndex =
                "0";

        },
        fadeDuration + 100
    );



    /*
        Reset progress bar
        untuk slide baru.
    */

    resetProgressBar();

}



/* =====================================================
   START SLIDESHOW
===================================================== */

function startSlideshow() {

    /*
        Bersihkan timer lama.
    */

    if (slideTimer) {

        clearInterval(
            slideTimer
        );

    }



    if (progressTimer) {

        clearInterval(
            progressTimer
        );

    }



    /*
        Reset semua slide.
    */

    slides.forEach(
        function (slide, index) {

            slide.classList.remove(
                "active"
            );

            slide.style.zIndex =
                "0";


            if (
                index === 0
            ) {

                slide.classList.add(
                    "active"
                );

                slide.style.zIndex =
                    "2";

            }

        }
    );



    /*
        Mulai dari Home1.
    */

    currentIndex = 0;



    /*
        Counter.
    */

    if (currentSlide) {

        currentSlide.textContent =
            "01";

    }



    /*
        Mulai progress.
    */

    resetProgressBar();



    /*
        Foto berganti setiap
        5 detik.
    */

    slideTimer =
        setInterval(
            changeSlide,
            slideDuration
        );

}



/* =====================================================
   LOAD IMAGES
===================================================== */

preloadAllImages()
    .then(
        function () {

            startSlideshow();

        }
    )
    .catch(
        function () {

            startSlideshow();

        }
    );



/* =====================================================
   2. NAVBAR SCROLL EFFECT
===================================================== */

function updateNavbar() {

    if (!navbar) {

        return;

    }


    /*
        Setelah scroll lebih dari
        30px, aktifkan glass navbar.
    */

    if (
        window.scrollY > 30
    ) {

        navbar.classList.add(
            "scrolled"
        );

    } else {

        navbar.classList.remove(
            "scrolled"
        );

    }

}



window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);



/*
    Jalankan sekali saat halaman
    pertama kali dibuka.
*/

updateNavbar();



/* =====================================================
   3. TYPING EFFECT
===================================================== */

const roles = [

    "Exhibition Project Executive",

    "Project Coordinator",

    "Site Supervisor"

];


let roleIndex = 0;

let letterIndex = 0;

let deleting = false;


const typeSpeed = 90;

const deleteSpeed = 55;

const pauseTime = 1800;



/* =====================================================
   TYPING ANIMATION
===================================================== */

function typingAnimation() {

    if (!typingRole) {

        return;

    }



    const currentRole =
        roles[roleIndex];



    /* =================================================
       TYPING
    ================================================== */

    if (!deleting) {

        typingRole.textContent =
            currentRole.substring(
                0,
                letterIndex + 1
            );


        letterIndex++;


        /*
            Selesai mengetik.
        */

        if (
            letterIndex >=
            currentRole.length
        ) {

            deleting = true;


            setTimeout(
                typingAnimation,
                pauseTime
            );


            return;

        }


        setTimeout(
            typingAnimation,
            typeSpeed
        );


        return;

    }



    /* =================================================
       DELETING
    ================================================== */

    typingRole.textContent =
        currentRole.substring(
            0,
            letterIndex - 1
        );


    letterIndex--;


    /*
        Selesai menghapus.
    */

    if (
        letterIndex <= 0
    ) {

        letterIndex = 0;

        deleting = false;


        /*
            Pindah ke role berikutnya.
        */

        roleIndex++;


        if (
            roleIndex >=
            roles.length
        ) {

            roleIndex = 0;

        }


        setTimeout(
            typingAnimation,
            500
        );


        return;

    }


    setTimeout(
        typingAnimation,
        deleteSpeed
    );

}



/* =====================================================
   START TYPING
===================================================== */

typingAnimation();



/* =====================================================
   4. MOBILE NAVIGATION
===================================================== */

if (
    menuToggle &&
    navMenu
) {

    menuToggle.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "open"
            );

        }
    );

}



/* =====================================================
   5. CLOSE MOBILE MENU
===================================================== */

navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                if (navMenu) {

                    navMenu.classList.remove(
                        "open"
                    );

                }

            }
        );

    }
);



/* =====================================================
   6. ACTIVE NAVIGATION
===================================================== */

navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );

            }
        );

    }
);