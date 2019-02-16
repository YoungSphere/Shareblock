/* Javascript for ShareXBlock. */
function ShareXBlock(runtime, element) {
    STUDIO_BASE_URL = 'http://studio.youngsphere.com';
    LMS_BASE_URL = 'http://youngsphere.com';
    list_author_URL = '/api/courses/v1/courses/';
    $.ajax({
            type: "GET",
            url: LMS_BASE_URL + list_author_URL,
            success: updateCourses,
        xhrFields: {
              withCredentials: true
            },
        });
    function updateCount(result) {
        $('.count', element).text(result.count);
    }
    function updateCourses(result) {
        $('.list_courses').empty()
        for (let course of result.results) {
            var key = course.blocks_url;
            var value = course.name;
            $('.list_courses')
                .append($('<option>', {value: key})
                    .text(value));


        }

    }

        


    function listAuthorCourses() {
        $.ajax({
            type: "GET",
            url: list_author_URL,
            success: updateCourses,
            xhrFields: {
              withCredentials: true
            },
        })
    }
    function updateChapters(result) {
        $('.list_chapters').empty()
    count = 0;
    for(let block in result.blocks){

        if(result.blocks[block].type == "chapter"){

            var key = result.blocks[block].id;
            var value = result.blocks[block].display_name;
            $('.list_chapters')
                .append($('<option>', {value: key})
                    .text(value));


        }
        

        

        
    }
    $('.div_chapters').show()
}

    function updateSequentials(result) {
    $('.list_sequentials').empty()
      count = 0
    for(let block in result.blocks){

        var key = result.blocks[block].id;
            var value = result.blocks[block].display_name;
            $('.list_sequentials')
                .append($('<option>', {value: key})
                    .text(value));

        
    }
    $('.div_sequentials').show()

    }

    function updateVerticals(result) {
        $('.list_verticals').empty()
        count = 0;
        for (let block in result.blocks) {
            if (result.blocks[block].type == "vertical") {
                var key = result.blocks[block].id;
                var value = result.blocks[block].display_name;
                $('.list_verticals')
                    .append($('<option>', {value: key})
                        .text(value));


            }


        }
        $('.div_verticals').show()
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    
    $('.coursesbutton', element).click(function(eventObject) {
        $.ajax({
            type: "GET",
            url: LMS_BASE_URL + list_author_URL,
            success: updateCourses,
            xhrFields: {
              withCredentials: true
            },
        });
    });
    $('.chapterbutton', element).click(function(eventObject) {
        $.ajax({
            type: "GET",
            url: $( ".list_courses" ).val()+'&depth=1',
            success: updateChapters,
            xhrFields: {
              withCredentials: true
            },
        });

    });
    $('.sectionbutton', element).click(function(eventObject) {
        $.ajax({
            type: "GET",
            url: LMS_BASE_URL+'/api/courses/v1/blocks/'+$(".list_chapters" ).val()+'/?depth=1',
            success: updateSequentials,
            xhrFields: {
              withCredentials: true
            },
        });

    });

    $('.unitbutton', element).click(function(eventObject) {
        $.ajax({
            type: "GET",
            url: LMS_BASE_URL+'/api/courses/v1/blocks/'+$( ".list_sequentials" ).val()+'/?depth=1',
            success: updateVerticals,
            xhrFields: {
              withCredentials: true
            },
        });

    });


    $('.sharebutton').click(function(eventObject) {
        $('.edit-parent-locator').value
        $.ajax({
            type: "POST",
            url: STUDIO_BASE_URL + "/xblock/",
            contentType: "application/json",
            xhrFields: {
              withCredentials: true
            },
            data: JSON.stringify({
                duplicate_source_locator: $('.edit-duplicate-source-locator').val(),
                parent_locator: $( ".list_verticals" ).val(),
}),
            success: updateCourses
        });
    });
    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
