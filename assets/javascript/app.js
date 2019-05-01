$(document).ready(function () {
    var topics = ["Jon Snow", "Theon Greyjoy", "Brandon Stark", "Ser Davos", "Tormund Giantsbane", 'Sandor "The Hound" Clegene', 'Beric Dondarion'];
    var apiKey = "https://api.giphy.com/v1/gifs/random?api_key=RrgqNg9Dm83UXhvKWjvgP434CbrzUhgi";

    for (var i = 0; i < topics.length; i++) {
        $(".buttonList").append("<button class='btn btn-primary'>" + topics[i] + "</button>");
    }

    $("button").on("click", function(){
        $.ajax({
            url: apiKey + "&tag=" + $(this).text,
            method: 'GET'
        }).then(function(data){
            console.log(data);
        });
    });
});


