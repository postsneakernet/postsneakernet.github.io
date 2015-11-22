$(function() {
    var sections = {},
        _height  = $(window).height(),
        i        = 0;

    // Grab positions of our sections
    $('.section').each(function() {
        sections[this.name] = $(this).offset().top;
    });

    $(document).scroll(function() {
        var $this = $(this),
            pos   = $this.scrollTop();
//        
//        for (i in sections) {
//            if (sections[i] > pos -100 && sections[i] < pos + _height) {
//                console.log(i);
//                $('.elliot li').removeClass('active');
//                $('#nav_' + i).addClass('active');
//                
//                if (i == "projects") {
//                    console.log("hey projects section!!");
//                }
//                
//                break;
//            }
//        }

        for (i in sections) {
            if (sections[i] > pos -100 && sections[i] < pos + _height) {
                console.log(i);
                $('.elliot li').removeClass('active');
                $('#nav_' + i).addClass('active');
                
                if (i == "projects") {
                    console.log("hey projects section!!");
                }
                
                break;
            }
        }
    });
});

//
//$('.elliot a').click(function(event) {
//    console.log("clicked");
//
//    $('.elliot li').removeClass('active');
//    var par = $(event.target).parent().get(0).tagName;
//    console.log("event is: " + par);
//    $(event.target).parent().addClass("active");
//});
