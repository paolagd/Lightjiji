$(() => {
  $('.sold-button').on('click', function(e) {
    e.preventDefault();
    const button = $(this)[0];
    const productId = $(button).data("index");

    $.ajax({
        method: "PUT",
        url:  `/api/products/${productId}/sold`
      }).done(() => {
        $(button).closest('.product').find('button').hide();
        location.reload();
      });
  });


});
