/* =========================================================
   KOYAKI – SPEISEKARTE TABS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navButtons = document.querySelectorAll(".menu-nav-item");
    const categories = document.querySelectorAll(".menu-category");

    navButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const targetCategory =
                button.getAttribute("data-category");

            navButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            categories.forEach((cat) => {
                cat.classList.remove("active");
            });

            button.classList.add("active");

            const activeSection =
                document.getElementById(targetCategory);

            if (activeSection) {
                activeSection.classList.add("active");
            }

        });

    });


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const aboutSection =
        document.querySelector(".about-section");

    const aboutImage =
        document.querySelector(".about-img");

    const hoursSection =
        document.querySelector(".hours-section");

    const sushiObject =
        document.querySelector(".hours-sushi");


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealSections =
        document.querySelectorAll(
            ".about-section, .hours-section"
        );


    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    revealSections.forEach((section) => {

        revealObserver.observe(section);

    });


    /* =====================================================
       ÜBER KOYAKI – IMAGE PARALLAX
    ===================================================== */

    function moveAboutImage() {

        if (!aboutSection || !aboutImage) return;

        const rect =
            aboutSection.getBoundingClientRect();

        if (
            rect.bottom > 0 &&
            rect.top < window.innerHeight
        ) {

            const center =
                rect.top +
                rect.height / 2 -
                window.innerHeight / 2;

            /*
               Çox yüngül hərəkət
            */

            let movement =
                center * -0.035;

            movement =
                Math.max(
                    -25,
                    Math.min(25, movement)
                );

            aboutImage.style.transform =
                `translateY(calc(-7% + ${movement}px))`;

        }

    }


    /* =====================================================
       ÖFFNUNGSZEITEN – SUSHI PARALLAX
    ===================================================== */

    function moveSushi() {

        if (!hoursSection || !sushiObject) return;

        const rect =
            hoursSection.getBoundingClientRect();

        if (
            rect.bottom > 0 &&
            rect.top < window.innerHeight
        ) {

            const viewportCenter =
                window.innerHeight / 2;

            const sectionCenter =
                rect.top + rect.height / 2;

            const distance =
                sectionCenter - viewportCenter;


            /*
               Sushi maksimum 28px hərəkət edir
            */

            let movement =
                distance * 0.06;

            movement =
                Math.max(
                    -28,
                    Math.min(28, movement)
                );


            sushiObject.style.setProperty(
                "--sushi-scroll",
                `${movement}px`
            );

        }

    }


    /* =====================================================
       SCROLL
    ===================================================== */

    function handleScroll() {

        moveAboutImage();
        moveSushi();

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /*
       Səhifə ilk açılanda da
       düzgün pozisiyanı hesablasın
    */

    handleScroll();

});

/* =========================================================
   FOOD BOWL – HORIZONTAL SCROLL EFFECT
========================================================= */

const foodBowl = document.querySelector(".hours-img");

window.addEventListener("scroll", () => {

    if (!foodBowl) return;

    const section = document.querySelector(".hours-section");

    if (!section) return;

    const rect = section.getBoundingClientRect();

    if (
        rect.bottom > 0 &&
        rect.top < window.innerHeight
    ) {

        const progress =
            (window.innerHeight / 2) -
            (rect.top + rect.height / 2);

        /* yalnız sağa-sola */
        let moveX = progress * 0.10;

        /* maksimum 30px */
        moveX = Math.max(-30, Math.min(30, moveX));

        foodBowl.style.translate = `${moveX}px 0`;
    }

});
/* =========================================================
   FOOD BOWL – SCROLL LEFT / RIGHT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const bowl = document.querySelector(".hours-sushi");
    const section = document.querySelector(".hours-section");

    if (!bowl || !section) {
        console.log("Bowl və ya hours-section tapılmadı");
        return;
    }

    let ticking = false;

    function animateBowl() {

        const rect = section.getBoundingClientRect();

        if (
            rect.bottom > 0 &&
            rect.top < window.innerHeight
        ) {

            /*
               Section-un scroll progress-i:
               təxminən -1 ilə +1 arasında
            */
            const viewportCenter = window.innerHeight / 2;
            const sectionCenter = rect.top + rect.height / 2;

            const distance = viewportCenter - sectionCenter;

            /*
               Sağa-sola hərəkət
            */
            let moveX = distance * 0.10;

            /*
               maksimum 45px
            */
            moveX = Math.max(-45, Math.min(45, moveX));

            /*
               Mövcud transform-a toxunmuruq.
               Sadəcə relative left dəyişirik.
            */
            bowl.style.left = `${moveX}px`;
        }

        ticking = false;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    animateBowl
                );

                ticking = true;
            }

        },
        { passive: true }
    );


    animateBowl();

});



document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".category-btn, .menu-categories button");
  const categorySections = document.querySelectorAll(".menu-category");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 1. Aktiven Zustand der Buttons umschalten
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // 2. Kategorie-ID ermitteln
      const targetCategory = this.getAttribute("data-category") || this.dataset.target;

      // 3. Menü-Kategorien ein-/ausblenden
      categorySections.forEach((section) => {
        if (section.id === targetCategory || targetCategory === "all") {
          section.classList.add("active");
          section.style.display = "block";
        } else {
          section.classList.remove("active");
          section.style.display = "none";
        }
      });
    });
  });
});

