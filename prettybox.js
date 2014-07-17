(function ($) {
    $.fn.prettify = function () {
        return this.each(function () {
            $(this).on('input', function (event) {
                var el = $(this);
                $('<span>')
                    .text(getLastCharacter(el))
                    .css({
                        "position": "absolute",
                        "color": "red",
                        "left": getX(el) - getWidth(getLastCharacter(el)),
                        "top": el.offset().top,
                        "width": getWidth(getLastCharacter(el)),
                        "font-family": el.css('font-family'),
                        "font-size": el.css('font-size'),
                        "font-weight": el.css('font-weight'),
                        "font-style": el.css('font-style')
                    })
                    .appendTo(document.body)
                    .fadeTo("fast", 0, function () {
                        $(this).remove();
                    });
            }).trigger('input');
        });
    };

    var getX = function (el) {
        var startX = el.offset().left;
        var fakeElX = getWidth(el.val());
        if (el.width() > fakeElX)
            return startX + fakeElX;
        else
            return el.width - getWidth(getLastCharacter(el));
    };

    var getLastCharacter = function (el) {
        var value = el.val();
        if (value.length !== 0) {
            return value.charAt(value.length - 1);
        }
    };

    var getWidth = function (text) {
        var width = $('<span class="fakeEl">')
            .text(text)
            .hide()
            .appendTo(document.body)
            .width();
        $('.fakeEl').remove();
        return width;
    }
}(jQuery));
