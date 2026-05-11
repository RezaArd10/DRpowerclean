(function () {

  // ── EMAIL ──
  var u = 'drpowerwashingpa';
  var d = 'gmail' + '.' + 'com';
  var addr = u + '@' + d;
  var el = document.getElementById('emailLink');
  if (el) el.href = 'mailto:' + addr;
  var fe = document.getElementById('footerEmail');
  if (fe) fe.href = 'mailto:' + addr;

  // ── HERO SLIDER ──
  var current = 0;
  var slides = document.querySelectorAll('.hero-slide');
  var dots = [
    document.getElementById('dot0'),
    document.getElementById('dot1'),
    document.getElementById('dot2')
  ];

  function goSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  if (dots[0]) dots[0].addEventListener('click', function () { goSlide(0); });
  if (dots[1]) dots[1].addEventListener('click', function () { goSlide(1); });
  if (dots[2]) dots[2].addEventListener('click', function () { goSlide(2); });

  setInterval(function () { goSlide((current + 1) % slides.length); }, 5000);

  // ── BEFORE/AFTER SLIDERS ──
  function initSlider(wrapId, afterId, lineId, knobId) {
    var wrap  = document.getElementById(wrapId);
    var after = document.getElementById(afterId);
    var line  = document.getElementById(lineId);
    var knob  = document.getElementById(knobId);
    if (!wrap || !after || !line || !knob) return;

    var dragging = false;

    function setPos(x) {
      var r = wrap.getBoundingClientRect();
      var p = Math.max(2, Math.min(98, (x - r.left) / r.width * 100));
      after.style.clipPath = 'inset(0 0 0 ' + p + '%)';
      line.style.left = p + '%';
      knob.style.left = p + '%';
    }

    wrap.addEventListener('mousedown', function (e) { dragging = true; setPos(e.clientX); e.preventDefault(); });
    wrap.addEventListener('touchstart', function (e) { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mousemove', function (e) { if (dragging) setPos(e.clientX); });
    document.addEventListener('touchmove', function (e) { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mouseup', function () { dragging = false; });
    document.addEventListener('touchend', function () { dragging = false; });
  }

  initSlider('slider1', 'after1', 'line1', 'knob1');
  initSlider('slider2', 'after2', 'line2', 'knob2');

  // ── QUOTE FORM ──
  var quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = document.getElementById('f-name').value.trim();
      var phone   = document.getElementById('f-phone').value.trim();
      var service = document.getElementById('f-service').value;
      var address = document.getElementById('f-address').value.trim();
      var message = document.getElementById('f-message').value.trim();

      if (!name || !phone || !service) {
        var btn = quoteForm.querySelector('.form-submit');
        btn.textContent = 'Please fill in name, phone & service';
        btn.style.background = '#c62828';
        setTimeout(function () {
          btn.textContent = 'Send Request \u2192';
          btn.style.background = '';
        }, 2800);
        return;
      }

      var body = 'Quote Request \u2014 D&R Powerwashing Website\n\n' +
                 'Name:    ' + name    + '\n' +
                 'Phone:   ' + phone   + '\n' +
                 'Service: ' + service + '\n' +
                 'Address: ' + (address || 'Not provided') +
                 (message ? '\n\nMessage:\n' + message : '');

      var subj = 'Free Quote Request \u2014 ' + service;
      window.location.href = 'mailto:' + addr +
        '?subject=' + encodeURIComponent(subj) +
        '&body='    + encodeURIComponent(body);
    });
  }

})();
