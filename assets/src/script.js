var textInput,
    objectArray = ['clothespeg', 'pencil', 'matchstick', 'hammer', 'ballpen', 'bottle', 'colander', 'zipper', 'screw', 'rubberband', 'velcro'],
    objectTextArray = {
        'clothespeg': 'could play?',
        'pencil': 'could break the silence?',
        'matchstick': 'could draw?',
        'hammer': 'could tap tempo?',
        'ballpen': 'could shape worlds?',
        'bottle': 'could speak up?',
        'colander': 'could make you a chef?',
        'zipper': 'could smile?',
        'screw': 'could fight?',
        'rubberband': 'could see beyond?',
        'velcro': 'could hold you up?'
    };

$(document).ready(function() {

    // Clears the homepage
    $(window).on('pageshow', function() {
        clearTypeahead()
    });

    // Key-tap, suggestion-selection and video end listeners
    window.addEventListener('input', function(e) {
        textInput = e.target.value;
        consequenceChange();
    }, false);
    $('.typeahead').on('typeahead:select', function(ev, suggestion) {
        textInput = suggestion;
        consequenceChange();
    });

    // Initialize typeahead
    $('.typeahead').typeahead({
        hint: false,
        highlight: false,
        minLength: 1,
        limit: 5
    }, {
        name: 'objectArray',
        source: substringMatcher(objectArray)
    });

    // Select input field on pageload
    $("input:text:visible:first").focus();

    // Scroll to bottom of page for mobile
    if (screen.width <= 480) {
        $(".typeahead").click(function() {
            $("html, body").animate({
                scrollTop: 125
            });
        });​
    }

    // Typeahead options
    function substringMatcher(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;
            matches = [];
            substrRegex = new RegExp(q, 'i');
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });
            cb(matches);
        };
    }

    function consequenceChange() {
        $('#whatif_a').html(' a');
        if ($.inArray(textInput, objectArray) != -1) {
            var objectText = objectTextArray[textInput];
            $('.whatif_cons').html(objectText);
            $('.tt-menu').css('visibility', 'hidden');
            $('.type_wrapper').css('background-image', 'url(assets/img/' + textInput + '.png)');
            $('.project_link').show();
            $('.project_link a').attr('href', '' + textInput + '/');
            $('.project_link').show();
            if (textInput == 'velcro') {
                $('#whatif_a').html('');
            }
        } else {
            $('.whatif_cons').html('');
            $('.tt-menu').css('visibility', 'visible');
            $('.type_wrapper').css('background-image', '');
            $('.project_link').hide();
            $('.no_matches').show();
            $('.project_link').hide();
            if (!textInput) {
                $('.no_matches').hide();
            }
        }

        if ($('.tt-dataset-objectArray').children().length > 0) {
            $('.no_matches').hide();
        }
    }

    function clearTypeahead() {
        $('#whatif_a').html(' a');
        $('.typeahead').typeahead('val', '');
        $('.whatif_cons').html('');
        $('.type_wrapper').css('background-image', '');
        $('.project_link').hide();
    }

});
