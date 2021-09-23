$(() => {

  //reloads page to avoid showing incorrect favorite button
  window.addEventListener("pageshow", function (event) {
    if (performance.navigation.type == 2) {
      location.reload();
    }
  });

  //Unfavorite event called from Favorites page
  $('.unfavorite-button-favs').on('click', function (e) {
    e.preventDefault();
    const button = $(this)[0];
    const productId = $(button).data("index");

    $.ajax({
      method: "PUT",
      url: `/api/products/${productId}/unfavourite`
    }).done(() => {
      location.reload();
    });
  });


  //Unfavorite event called from Listings page page
  $('.unfavorite-button').on('click', function (e) {
    e.preventDefault();
    const unfavoriteButton = $(this)[0];
    const nextFavoriteButton = $(unfavoriteButton).parent().find('.favorite-button');
    const productId = $(unfavoriteButton).data("index");

    $.ajax({
      method: "PUT",
      url: `/api/products/${productId}/unfavourite`
    }).done(() => {
      $(unfavoriteButton).toggle();
      $(nextFavoriteButton).removeAttr('hidden');
      $(nextFavoriteButton).show();
    });
  });

  //Favorite event called from Listings page page
  $('.favorite-button').on('click', function (e) {
    e.preventDefault();
    const favoriteButton = $(this)[0];
    const nextUnfavoriteButton = $(favoriteButton).parent().find('.unfavorite-button');
    const productId = $(favoriteButton).data("index");

    $.ajax({
      method: "PUT",
      url: `/api/products/${productId}/favourite`
    }).done(() => {
      $(favoriteButton).toggle();
      $(nextUnfavoriteButton).removeAttr('hidden');
      $(nextUnfavoriteButton).show();
    });
  });

});
