$(() => {

  //Delete event sends request to remove product from db
  $('.delete-button').on('click', function (e) {
    e.preventDefault();

    //get the product id from the delete button
    const button = $(this)[0];
    const productId = $(button).data("index");

    $.ajax({
      method: "DELETE",
      url: `/api/products/${productId}`
    }).done(() => {
      location.reload();
    });
  });

});
