﻿//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//jQuery.fn.putCursorAtEnd = function () {

//    return this.each(function () {

//        // Cache references
//        var $el = $(this),
//            el = this;

//        // Only focus if input isn't already
//        if (!$el.is(":focus")) {
//            $el.focus();
//        }

//        // If this function exists... (IE 9+)
//        if (el.setSelectionRange) {

//            // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
//            var len = $el.val().length * 2;

//            // Timeout seems to be required for Blink
//            setTimeout(function () {
//                el.setSelectionRange(len, len);
//            }, 1);

//        } else {

//            // As a fallback, replace the contents with itself
//            // Doesn't work in Chrome, but Chrome supports setSelectionRange
//            $el.val($el.val());

//        }

//        // Scroll to the bottom, in case we're in a tall textarea
//        // (Necessary for Firefox and Chrome)
//        this.scrollTop = 999999;

//    });

//};


//(function ($) {
//    // Behind the scenes method deals with browser
//    // idiosyncrasies and such
//    $.caretTo = function (el, index) {
//        if (el.createTextRange) {
//            var range = el.createTextRange();
//            range.move("character", index);
//            range.select();
//        } else if (el.selectionStart != null) {
//            el.focus();
//            el.setSelectionRange(index, index);
//        }
//    };

//    // The following methods are queued under fx for more
//    // flexibility when combining with $.fn.delay() and
//    // jQuery effects.

//    // Set caret to a particular index
//    $.fn.caretTo = function (index, offset) {
//        return this.queue(function (next) {
//            if (isNaN(index)) {
//                var i = $(this).val().indexOf(index);

//                if (offset === true) {
//                    i += index.length;
//                } else if (offset) {
//                    i += offset;
//                }

//                // Convert string to indexOf position
//                index = i;
//            }
//            $.caretTo(this, index);
//            next();
//        });
//    };
//})

//$.caretTo = function (el, index) {
//    if (el.createTextRange) {
//        var range = el.createTextRange();
//        range.move("character", index);
//        range.select();
//    } else if (el.selectionStart != null) {
//        el.focus();
//        el.setSelectionRange(index, index);
//    }
//};

//// The following methods are queued under fx for more
//// flexibility when combining with $.fn.delay() and
//// jQuery effects.

//// Set caret to a particular index
//$.fn.caretTo = function (index, offset) {
//    return this.queue(function (next) {
//        if (isNaN(index)) {
//            var i = $(this).val().indexOf(index);

//            if (offset === true) {
//                i += index.length;
//            } else if (offset) {
//                i += offset;
//            }

//            // Convert string to indexOf position
//            index = i;
//        }
//        $.caretTo(this, index);
//        next();
//    });
//}


//function placeCaretAtEnd(el) {
//    el.focus();
//    if (typeof window.getSelection != "undefined"
//            && typeof document.createRange != "undefined") {
//        var range = document.createRange();
//        range.selectNodeContents(el);
//        range.collapse(false);
//        var sel = window.getSelection();
//        sel.removeAllRanges();
//        sel.addRange(range);
//    } else if (typeof document.body.createTextRange != "undefined") {
//        var textRange = document.body.createTextRange();
//        textRange.moveToElementText(el);
//        textRange.collapse(false);
//        textRange.select();
//    }
//}

//$.fn.focusToEnd = function () {
//    return this.each(function () {
//        var v = $(this).html();
//        $(this).focus().html("").html(v);
//    });
//};

//$.fn.caretToEnd = function () {
//    return this.queue(function (next) {
//        $.caretTo(this, $(this).val().length);
//        next();
//    });
//};

//$('#qwe').on('click', function () {
//    $('#input').focus();
//    $('#input').setCursorPosition($('#input_srt').text().length);
//    $('#input').putCursorAtEnd();
//    $('#input').focusToEnd();
//    $('#input').caretToEnd();
//    $('#input').focus(); //sets focus to element
//    var val = $('#input').text(); //store the value of the element
//    $('#input').text(''); //clear the value of the element
//    $('#input').text(val); //set that value back.  
//});



//$.fn.setCursorPosition = function (pos) {
//    if ($(this).get(0).setSelectionRange) {
//        $(this).get(0).setSelectionRange(pos, pos);
//    } else if ($(this).get(0).createTextRange) {
//        var range = $(this).get(0).createTextRange();
//        range.collapse(true);
//        range.moveEnd('character', pos);
//        range.moveStart('character', pos);
//        range.select();
//    }
//}



//$('#input').on('keyup', function () {
//    $('#input').focus();
//    $('#input').setCursorPosition($('#input_srt').text().length);
//    $('#input').putCursorAtEnd();
//    $('#input').focusToEnd();
//    $('#input').caretToEnd();
//    $('#input').focus(); //sets focus to element
//    var val = $('#input').text(); //store the value of the element
//    $('#input').text(''); //clear the value of the element
//    $('#input').text(val); //set that value back.  
//});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$.fn.slideFadeToggle = function (easing, callback) {
    return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
}

function deselect(e) {
    $('.pop').slideFadeToggle(function () {
        e.removeClass('selected');
    });
}



$(document).ready(function () {
    xOffset = 10;
    yOffset = 30;
    $('#input').bind('blur change', function () {
        editTxt('#input');
        $('span').on('mouseover', function (e) {
            $(this).addClass('hlight');
            var text = $(this).text();
            $.ajax("/Home/Translator?word=" + text, {
                success: function (data) {
                    var str = "";
                    for (var item in data) {
                        str += "<li>" + item + ':' + data[item] + "</li>";
                    }
                    $('#output').html(str)
                    $("#popup")
                        .css("top", (e.pageY - xOffset) + "px")
                        .css("left", (e.pageX + yOffset) + "px")
                        .fadeIn("fast");
                }
            });
        });
        $('span').on('mouseout', function () {
            $(this).removeClass('hlight');
            deselect($('#contact'));
            $.ajax("/Home/GetTopUsers", {
                success: function (data) {
                    $('#topUsers').html(data)
                }
            });
        });
    });


    function editTxt(selector) {
        $(function () {
            var newHtml = '';
            //  temp = $();
            var words = $(selector).text().split(' ');
            for (i = 0; i < words.length; i++) {
                if (words[i].length >= 4)
                    //{
                    //    temp.add("span").addClass("tooltip").html(words[i]);
                    //    var v = temp.length;
                    //}
                    newHtml += '<span class="tooltip" id=' + words[i].trim() + '>' + words[i].trim() + '</span> ';
                else if (words[i].length < 4 && words[i] != "")// temp.add("span").html(words[i]);
                    newHtml += words[i].trim() + ' ';
            }
            // var a = temp.length;
            $(selector).html(newHtml);
        });
    }
});