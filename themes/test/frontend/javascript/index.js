/**
 * Created by vova on 05.03.17.
 */

(() => {
	const $window = $(window);
	const $body = $('body');

	class App {
		initSliders = () => {
			const $slickSlider = $('#responsive');
			const $item = $slickSlider.find('.item');

			$slickSlider.slick({
				dots: true,
				infinite: false,
				slide: '.item',
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 4,
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