(function(window){

    $('#get-text').keyup(function() {
        $('#get-text').rep();
    });

    $.fn.rep = function () {
        var textContent = $('#get-text').val();
        var a = '';
        var array = textContent.split(" ");
        array.unshift('<p>');
        array.push('</p>');
        for (var i=0; i<array.length; i++) {
            for (var t=0; t<array[i].length; t++){
                array[i] = array[i].replace("\n", "</p><p>");
            }
        a = a + array[i] + ' ';
        $('#text').html(a);
        }
    }

    $('#font-size').keyup(function(){
        var size = $('#font-size').val() + 'px';
        $('#text').css({'font-size' : size});
    })

    $('#word-spacing').keyup(function(){
        var size = $('#word-spacing').val() + 'px';
        $('#text').css({'word-spacing' : size});
    })

    $('#transfer').click(function(){
        $('#text').rusHyphenate();
    });

    $('#transfer-').click(function(){
        $('#get-text').rep();
    });

    $("#chartbtn").click(function(){
        $('#chart').slideToggle(300);
        return false;
    });

    $('#calculate').click(function (){
        document.getElementById("counter-lan").value = $('#text').html().split(" ").length
        document.getElementById("counter-sim").value = $('#text').html().length
        document.getElementById("width_").value = $('#text').width()
        document.getElementById("height_").value = $('#text').height()
    });
  
    $.fn.rusHyphenate = function () {
        var all = '[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]',
            vowel = '[аеёиоуыэюя]',
            consonant = '[бвгджзклмнпрстфхцчшщ]',
            zn = '[йъь]',
            shy = '\xAD',
            hyp = [];
     
        hyp[0] = new RegExp('(' + zn + ')(' + all + all + ')', 'ig');
        hyp[1] = new RegExp('(' + vowel + ')(' + vowel + all + ')', 'ig');
        hyp[2] = new RegExp('(' + vowel + consonant + ')(' + consonant + vowel + ')', 'ig');
        hyp[3] = new RegExp('(' + consonant + vowel + ')(' + consonant + vowel + ')', 'ig');
        hyp[4] = new RegExp('(' + vowel + consonant + ')(' + consonant + consonant + vowel + ')', 'ig');
        hyp[5] = new RegExp('(' + vowel + consonant + consonant + ')(' + consonant + consonant + vowel + ')', 'ig');
     
        return this.each(function () {
            var text = $(this).html();
     
            for ( var i = 0; i <= 5; ++i ) {
                text = text.replace(hyp[i], '$1' + shy + '$2');
            }
            $(this).html(text);
        });
    };
})(window);