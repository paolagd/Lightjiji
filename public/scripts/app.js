$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

  $('.favorite-button').on('click', function(e) {

    e.preventDefault();
    const button = $(this)[0];
    const productId = $(button).data("index");

    $.ajax({
        method: "PUT",
        url:  `/api/products/${productId}/unfavourite`
      }).done(() => {
        $(button).closest('.product').slideUp();
      });
  });

});
