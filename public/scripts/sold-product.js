$(() => {

  //Sends request to update product as SOLD and hide all the buttons to avoid any further modification
  $('.sold-button').on('click', function (e) {
    e.preventDefault();
    const button = $(this)[0];
    const productId = $(button).data("index");

    $.ajax({
      method: "PUT",
      url: `/api/products/${productId}/sold`
    }).done(() => {
      $(button).closest('.product').find('button').hide();
      location.reload();
    });
  });


});
