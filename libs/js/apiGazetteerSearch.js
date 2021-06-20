// $(window).on('load', function () { if ($('#preloader').length) {
//     $('#preloader').delay(100).fadeOut('slow', function () { $(this).remove();
//     }); }
// });

const searchListButton = document.querySelector(".searchListButton");

searchListButton.addEventListener('click', function () {

    //getting  button click value
    var value = $(this).val();
    console.log(value);
    $(searchListButton).click(function(e) {
        e.preventDefault();
        console.log(value);

    })
})

