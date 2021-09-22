$(() => {

  $('.edit-button').on('click', function(e) {
    e.preventDefault();
    const button = $(this)[0];
    const categoryId = $(button).data("category_id");
    const name = $(button).data("name");
    const description = $(button).data("description");
    const price = $(button).data("price");
    const image = $(button).data("image_url");
    const isFeatured = $(button).data("featured");
    $(`#edit-category option[value=${categoryId}]`).attr('selected','selected');
    $('#edit-title').val(name);
    $('#edit-description').val(description);
    $('#edit-price').val(price);
    $('#edit-image').val(image);
    $('#edit-title').val(name);
    $('#edit-title').val(name);
    console.log("Is Featured from db", isFeatured);

    if(isFeatured) {
      $('#edit-Check').attr("checked",true);
    } else {
      $('#edit-Check').attr("checked",false);
    }
  });

  $('.save-changes').on('click', function(e) {
    //e.preventDefault();
    const button = $(this)[0];
    const productId = $(button).data("id");

    const name = $('#edit-title').val();
    const price = $('#edit-price').val();
    const description= $('#edit-description').val();
    const category = $('#edit-category').val();
    const is_featured = ($('#edit-Check').is(":checked")) ? "true" : "false";
    const image_url = $('#edit-image').val();

    const data = {
      name,
      price,
      description,
      category,
      is_featured,
      image_url
    }
    $.ajax({
        method: "PUT",
        url:  `/api/products/${productId}`,
        data: data
      }).done(() => {
        location.reload();
      });
  });


});
