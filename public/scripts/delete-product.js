$(() => {
  $('.delete-button').on('click', function (e) {
    e.preventDefault();
    const button = $(this)[0];
    const productId = $(button).data("index");

    $.ajax({
      method: "DELETE",
      url: `/api/products/${productId}`
    }).done(() => {
      $(button).closest('.product').slideUp();
    });
  });

});
