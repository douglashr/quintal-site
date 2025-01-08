/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

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
		}, 100);
	});

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
				}, 50);
			})
			.triggerHandler('resize.ie-flexbox-fix');
	}

	// Gallery.
	function inicializarGaleria() {
		console.log("Inicializando galeria...");
		var $gallery = $('.gallery');
		$gallery.poptrox({
			baseZIndex: 10001,
			useBodyOverflow: false,
			usePopupEasyClose: false,
			overlayColor: '#1f2328',
			overlayOpacity: 0.65,
			usePopupDefaultStyling: false,
			usePopupCaption: true,
			popupLoaderText: '',
			windowMargin: 50,
			usePopupNav: true
		});
		breakpoints.on('>small', function() {
			$gallery.each(function() {
				$(this)[0]._poptrox.windowMargin = 50;
			});
		});
		breakpoints.on('<=small', function() {
			$gallery.each(function() {
				$(this)[0]._poptrox.windowMargin = 5;
			});
		});
	}

	$window.on('load', function() {
		inicializarGaleria();
	});

	// Section transitions.
	function inicializarAnimacoes() {
		console.log("Inicializando animações...");
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
		inicializarAnimacoes();
	});

	// Adjust height of #linha-pedagogica-container based on #one.
	function ajustarAltura() {
		var $linhaContainer = $('#linha-pedagogica-container');
		var $one = $('#one');

		if ($linhaContainer.length && $one.length) {
			var alturaOne = $one.outerHeight(); // Obtém a altura de #one
			$linhaContainer.css('height', alturaOne + 'px'); // Define a altura de #linha-pedagogica-container
			console.log(`Altura ajustada para altura de #one: ${alturaOne}px`);
		}
	}

	$window.on('load resize', ajustarAltura);

	// Eventos de scroll suave.
	$('a[href^="#"]').scrolly({
		speed: 1500,
		offset: $header.outerHeight() - 1
	});

	// Reinicializa plugins após alterações dinâmicas.
	function reinicializarTudo() {
		console.log("Reinicializando tudo...");
		inicializarGaleria();
		inicializarAnimacoes();
	}

	// Eventos para recarregar animações após mudanças dinâmicas.
	$(document).on('conteudoAtualizado', reinicializarTudo);

})(jQuery);
