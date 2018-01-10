
$.fn.mySlider = function (options) {
    // console.log('My first plugin');
    let defaultOptions = {
        auto: true,
        navLinks: true,
        navLinksPosition: 'bellow'
    }

    let opt = $.extend({}, defaultOptions, options);
    // console.log(opt);

    $(this).each(function (index, item) {
        // console.log(item, index, $(item));
        let activeSlide = 0;
        let navLinks, ul, interval;

        let slider = $(item);
        let imgs = slider.find('img');
        let wrapper = $("<div>").attr("class", "wrapper");
        imgs.wrapAll(wrapper);

        imgs.each(function (i, img) {
            let content = $("<div>")
                .attr('class', 'content')
                .attr('data-id', i);
            $(img).wrapAll(content);
        });

        if (opt.navLinks === true) {
            navLinks = $("<div class='navLinks'>");
            ul = $("<ul>").appendTo(navLinks);
            for (let i = 0; i < imgs.length; i++) {
                $("<li>")
                    .attr('class', 'itemLinks')
                    .attr('data-id', i)
                    .on('click', function () {
                        activeSlide = i;
                        removeActive();
                        setActive();
                    })
                    .appendTo(ul);
            }

            //after the wrapper element
            switch (opt.navLinksPosition) {
                case "above":
                    slider.prepend(navLinks);
                    break;
                case "bellow":
                default:
                    slider.append(navLinks);
                    break;
            }
        }

        function removeActive() {
            $('.active').removeClass('active');
        }

        function setActive() {
            //select the image
            slider.children('.wrapper').find('[data-id="' + activeSlide + '"]').addClass('active');
            //select the link
            if (navLinks != undefined) {
                navLinks.find(`[data-id="${activeSlide}"]`).addClass('active');
            }
        }

        setActive();

        function stopHover() {
            if (opt.auto === true) {
                interval = setInterval(function () {
                    if (activeSlide != imgs.length - 1) {
                        activeSlide++;
                    } else {
                        activeSlide = 0;
                    }

                    removeActive();
                    setActive();
                }, 100);
            
            }
        }


        
        $(".slider").hover(function () {
            clearInterval(interval);
        }, function () {
            stopHover();
        });
        
       
    });

   
    // clearInterval(interval);
    // interval = null;
    // console.log(interval);



    //in order to be able to do chaining
    return $(this);
}