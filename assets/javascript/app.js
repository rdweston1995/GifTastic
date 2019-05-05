$(document).ready(function () {
    //var topics = ["Jon Snow", "Theon Greyjoy", "Tormund Giantsbane", 'Sandor Clegene', 'Beric Dondarion', 'Gandalf', 'cats', 'Owen Wilson'];
    var topics = ["Owen Wilson", "Owen Wilson", "Owen Wilson", "Owen Wilson", "Owen Wilson", "Owen Wilson", "Owen Wilson"];
    var apiKEY = "&api_key=VwVG9Ri3ZO8eWDbFxQj1aR46gxpi88cV&limit=10";

    var buttonNum = 0;

    //For loop to initially add the buttons to the page for each element in the topics array
    for (var i = 0; i < topics.length; i++) {
        $(".buttonList").append("<button class='characterBtn btn btn-primary' id='button" + buttonNum + "'>" + topics[i] + "</button>");
        //Adding on click events to each new button
        btnClick();
        //Iterating buttonNum 
        buttonNum++;   
    }

    //On click for adding another character button
    $("#addButton").on("click", function () {
        if ($("#newButton").val() == "Owen Wilson") {
            //Adding the new button to the buttonList class
            $(".buttonList").append("<button class='characterBtn btn btn-primary' id='button" + buttonNum + "'>" + $("#newButton").val() + "</button>");
            //Adds to the new topic to the topics array
            topics.push($("#newButton").val());
            //Run the function to add an on click event for the new button
            btnClick();
            //Iterate buttonNum
            buttonNum++;
            //Clear the value of the newButton id after the new topic has been added
            $("#newButton").val("");
        }else{
            alert("That's not Owen Wilson");
            $("#newButton").val("");
        }
        
    });


    //On click for clearing the gifs off the page and clearing the console
    $(".clear").on("click", function(){
        $(".container").empty();
        console.clear();
    });

    //Adds on click function to the buttons at the top of the page 
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
                    $("#div" + i).prepend("<p class='rating'>Rating: " + response.data[i].rating + "</p>");
                    $("#div" + i).prepend("<img class='gif" + i + "' src='" + response.data[i].images.original_still.url + "' data-still='" + response.data[i].images.original_still.url + "' data-animate='" + response.data[i].images.original.url + "' data-state='still'>");
                    


                    $(".gif" + i).on('click', function () {
                        var state = $(this).attr("data-state");
    
                        if (state === "still") {
                            console.log("test");
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


