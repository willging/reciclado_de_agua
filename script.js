(function () {
  "use strict";

  var diagramWrap = document.getElementById("diagramWrap");
  var playToggle = document.getElementById("playToggle");
  var modeToggle = document.getElementById("modeToggle");
  var iconPlay = document.getElementById("iconPlay");
  var iconPause = document.getElementById("iconPause");
  var playLabel = document.getElementById("playLabel");

  var isPlaying = false;
  var isCompareMode = false;

  function setPlaying(next) {
    isPlaying = next;
    diagramWrap.classList.toggle("is-playing", isPlaying);
    iconPlay.style.display = isPlaying ? "none" : "inline";
    iconPause.style.display = isPlaying ? "inline" : "none";
    playLabel.textContent = isPlaying ? "Pausar circulación" : "Reproducir circulación";
  }

  if (playToggle) {
    playToggle.addEventListener("click", function () {
      setPlaying(!isPlaying);
    });
  }

  if (modeToggle) {
    modeToggle.addEventListener("click", function () {
      isCompareMode = !isCompareMode;
      diagramWrap.classList.toggle("compare-mode", isCompareMode);
      modeToggle.classList.toggle("active", isCompareMode);
      modeToggle.textContent = isCompareMode
        ? "Volver a SiDeReA completo"
        : "Comparar con sistema tradicional";
    });
  }

  // Animated counters for the stats section
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  // Scroll reveal for sections, and triggers for diagram autoplay / counters
  var revealed = {};
  var sections = document.querySelectorAll("main section");
  var statNumbers = document.querySelectorAll(".stat-number");
  var diagramSection = document.getElementById("diagrama");
  var statsSection = document.getElementById("numeros");

  if ("IntersectionObserver" in window) {
    document.body.classList.add("js-reveal");

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    sections.forEach(function (s) {
      sectionObserver.observe(s);
    });

    var diagramObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !revealed.diagram) {
            revealed.diagram = true;
            setPlaying(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (diagramSection) diagramObserver.observe(diagramSection);

    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !revealed.stats) {
            revealed.stats = true;
            statNumbers.forEach(animateCount);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (statsSection) statsObserver.observe(statsSection);
  } else {
    // Fallback for browsers without IntersectionObserver support
    sections.forEach(function (s) {
      s.classList.add("is-visible");
    });
    statNumbers.forEach(animateCount);
    setPlaying(true);
  }
})();
