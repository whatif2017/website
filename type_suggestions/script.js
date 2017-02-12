$(document).ready(function() {
    window.addEventListener('input', function(e) {
        textInput = e.target.value;
        consequenceChange();
    }, false);
    $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
        textInput = suggestion;
        consequenceChange();
    });

    var consequenceChange = function() {
        if ($.inArray(textInput, objectsArray) != -1) {
            var objectText = objectTextArray[textInput];
            $('.if_consequence').html(objectText);
            $('.typeahead').typeahead('close');
        } else {
            $('.if_consequence').html('')
        }

        if (textInput == 'velcro') {
            $('.whatif').html('what if');
        } else {
            $('.whatif').html('what if a');
        }
    }

    var substringMatcher = function(strs) {
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
    };
    var textInput,
        objectsArray = ['clothespeg', 'pencil', 'matchstick', 'hammer', 'ballpen', 'bottle', 'colander', 'zipper', 'screw', 'rubberband', 'velcro'],
        objectTextArray = {
            'clothespeg': 'could play?',
            'pencil': 'could break the silence?',
            'matchstick': 'could draw?',
            'hammer': 'could tap tempo?',
            'ballpen': 'could leave a sign?',
            'bottle': 'could speak?',
            'colander': 'could make you a chef?',
            'zipper': 'could smile?',
            'screw': 'could fight?',
            'rubberband': 'could see beyond?',
            'velcro': 'could hold you up?'
        };

    $('div .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'objectsArray',
        source: substringMatcher(objectsArray)
    });

});
