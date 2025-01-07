/* Updated main.js */
(function($) {

    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $all = $body.add($header);

    // Breakpoints.
    breakpoints({
        xxlarge: [ '1681px',  '1920px' ],
        xlarge:  [ '1281px',  '1680px' ],
        large:   [ '1001px',  '1280px' ],
        medium:  [ '737px',   '1000px' ],
        small:   [ '481px',   '736px'  ],
        xsmall:  [ null,      '480px'  ]
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        setTimeout(function() {
            $body.removeClass('is-preload');
            restartAnimations();
        }, 100);
    });

    function restartAnimations() {
        console.log("Restarting animations...");
        $('.main, .gallery, #contact').each(function() {
            $(this).removeClass('inactive'); // Remove inactive state
            $(this).addClass('inactive'); // Reapply inactive state
            setTimeout(() => $(this).removeClass('inactive'), 50); // Trigger animation
        });
    }

    // Touch mode.
    if (browser.mobile)
        $body.addClass('is-touch');
    else {
        breakpoints.on('<=small', function() {
            $body.addClass('is-touch');
        });
        breakpoints.on('>small', function() {
            $body.removeClass('is-touch');
        });
    }

    // Fix: IE flexbox fix.
    if (browser.name == 'ie') {
        var $main = $('.main.fullscreen'),
            IEResizeTimeout;
        $window
            .on('resize.ie-flexbox-fix', function() {
                clearTimeout(IEResizeTimeout);
                IEResizeTimeout = setTimeout(function() {
                    var wh = $window.height();
                    $main.each(function() {
                        var $this = $(this);
                        $this.css('height', '');
                        if ($this.height() <= wh)
                            $this.css('height', (wh - 50) + 'px');
                    });
                });
            })
            .triggerHandler('resize.ie-flexbox-fix');
    }

    // Section transitions.
    function initializeAnimations() {
        console.log("Initializing animations...");
        if (browser.canUse('transition')) {
            $('.gallery').scrollex({
                top: '30vh',
                bottom: '30vh',
                delay: 50,
                initialize: function() { $(this).addClass('inactive'); },
                terminate: function() { $(this).removeClass('inactive'); },
                enter: function() { $(this).removeClass('inactive'); },
                leave: function() { $(this).addClass('inactive'); }
            });

            $('.main.style1, .main.style2').scrollex({
                mode: 'middle',
                delay: 100,
                initialize: function() { $(this).addClass('inactive'); },
                terminate: function() { $(this).removeClass('inactive'); },
                enter: function() { $(this).removeClass('inactive'); },
                leave: function() { $(this).addClass('inactive'); }
            });

            $('#contact').scrollex({
                top: '50%',
                delay: 50,
                initialize: function() { $(this).addClass('inactive'); },
                terminate: function() { $(this).removeClass('inactive'); },
                enter: function() { $(this).removeClass('inactive'); },
                leave: function() { $(this).addClass('inactive'); }
            });
        }
    }

    $window.on('load', function() {
        initializeAnimations();
    });

})(jQuery);
