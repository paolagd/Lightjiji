$(() => {

  //Unfavorite event called from Favorites page
  $('.unfavorite-button-favs').on('click', function(e) {
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


  //Unfavorite event called from Listings page page
  $('.unfavorite-button').on('click', function(e) {
    e.preventDefault();
    const button = $(this)[0];
    // const productId = $(button).data("index");
    // $(button).hide();
    // $(button).closest('.favorite-button').show();

    console.log( $(button).find('.favorite-button'))
    // $.ajax({
    //     method: "PUT",
    //     url:  `/api/products/${productId}/unfavourite`
    //   }).done(() => {
    //     $(button).closest('.favorite-button').slideDown();
    //   });
  });

});
