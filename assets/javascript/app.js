$(document).ready(function () {
    var topics = ["Jon Snow", "Theon Greyjoy", "Tormund Giantsbane", 'Sandor Clegene', 'Beric Dondarion', 'Gandalf', 'cats', 'Owen Wilson'];
    var apiKEY = "&api_key=VwVG9Ri3ZO8eWDbFxQj1aR46gxpi88cV&limit=10";

    var buttonNum = 0;

    for (var i = 0; i < topics.length; i++) {
        $(".buttonList").append("<button class='characterBtn btn btn-primary' id='button" + buttonNum + "'>" + topics[i] + "</button>");
        btnClick();
        buttonNum++;   
    }

    //On click for adding another character button
    $("#addButton").on("click", function(){
        $(".buttonList").append("<button class='characterBtn btn btn-primary' id='button" + buttonNum + "'>" + $("#newButton").val() + "</button>");
        btnClick();
        buttonNum++;
        $("#newButton").val("");
    });


    //$("aside").append("<button class='clear'>CLEAR</button>");
    $(".clear").on("click", function(){
        $(".container").empty();
        console.clear();
    });


    function btnClick() {
        $(".container").empty();
        //When called only retrieves one gif
        $("#button" + buttonNum).on("click", function () {
            //Removing the space and replacing it with a + so the call retrives the right gifs
            var removeSpace = $(this).text().toLowerCase();
            if (removeSpace.indexOf(" ") !== -1) {
                removeSpace = removeSpace.substr(0, removeSpace.indexOf(" ")) + "+" + removeSpace.substr(removeSpace.indexOf(" ") + 1);
            }

            
            //Ajax call to get the gif object        
            $.ajax({
                //url: apiKey + "&tag=" + removeSpace + "&limit=5",
                url: "https://api.giphy.com/v1/gifs/search?q=" + removeSpace + apiKEY,
                method: 'GET'
            }).then(function (response) {
                //console.log(response);

                for(var i = 0; i < 10; i++){
                    //console.log(response.data[i]);
                    //$(".container").prepend("<img class='gif' src='" + response.data[i].images.original_still.url + "' data-still='" + response.data[i].images.original_still.url + "' data-animate='" + response.data[i].images.original.url + "' data-state='still'>");
                    //$("img").attr("alt", removeSpace + " gif");

                    $(".container").append("<p class='divContainers' id='div" + i + "'></p");
                    $("#div" + i).prepend("<img class='gif' src='" + response.data[i].images.original_still.url + "' data-still='" + response.data[i].images.original_still.url + "' data-animate='" + response.data[i].images.original.url + "' data-state='still'>");
                    $("#div" + i).prepend("<p class='rating'>" + response.data[i].rating + "</p>");


                    $(".gif").on('click', function () {
                        var state = $(this).attr("data-state");
    
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr('data-still'));
                            $(this).attr("data-state", "still");
                        }
                    });
                }

            });

        });
        
    }
});


