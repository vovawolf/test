/**
 * Created by vova on 05.03.17.
 */

(() => {
	const $window = $(window);
	const $body = $('body');

	class App {
		initSliders = () => {
			const $slickSlider = $('.sl');
			const $item = $slickSlider.find('.item');

			$slickSlider.slick({
				autoplay: true,
				autoplaySpeed: 5000,
				dots: true,
				arrows: false,
				fade: true,
				pauseOnDotsHover: true,
				pauseOnFocus: false,
				pauseOnHover: false,
				speed: 1000,
			});

			$item.on('click', function () {
				console.log($(this));
			});
		};

		buildMainVav = () => {
			console.log('nav');
		};

		init = () => {
			this.initSliders();
			this.buildMainVav();
		};

		handleScroll = () => {
			console.log('scroll');
		};

		handleResize = () => {
			console.log('resize');
		};

		destroy = () => {
			console.log('destriyed my app');
		};
	}


	$(() => {
		const MyApp = new App();

		MyApp.init();

		$window
			.on('scroll', MyApp.handleScroll)
			.on('resize', MyApp.handleResize)
	});
})();


(() => {
	const $window = $(window);
	const $body = $('body');

	class App {
		initSliders = () => {
			const $slickSlider = $('.sl1');
			const $item = $slickSlider.find('.item1');

			$slickSlider.slick({
				autoplay: true,
				autoplaySpeed: 8000,
				dots: true,
				arrows: false,
				pauseOnDotsHover: true,
				pauseOnFocus: false,
				pauseOnHover: false,
				speed: 1000,
				slidesToShow: 2,
				infinite: true,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 1,
						}
					},
				]
			});

			$item.on('click', function () {
				console.log($(this));
			});
		};

		buildMainVav = () => {
			console.log('nav');
		};

		init = () => {
			this.initSliders();
			this.buildMainVav();
		};

		handleScroll = () => {
			console.log('scroll');
		};

		handleResize = () => {
			console.log('resize');
		};

		destroy = () => {
			console.log('destriyed my app');
		};
	}


	$(() => {
		const MyApp = new App();

		MyApp.init();

		$window
			.on('scroll', MyApp.handleScroll)
			.on('resize', MyApp.handleResize)
	});
})();

$(document).ready(function() {

	$('.menu__list>.menu__drop').hide();


	$('.menu__list>a').click(function() {

		var findArticle = $(this).next();
		var findWrapper = $(this).closest('.menu__list');

		if (findArticle.is(':visible')) {
			findArticle.slideUp('300');
		}
		else {
			findWrapper.find('>article').slideUp('fast');
			findArticle.slideDown('fast');
		}
	});

});