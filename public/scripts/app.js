$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

  $('.favorite-button').on('click', () => {
    alert('favorite!')
    // $.ajax({
    //     method: "GET",
    //     url: "/api/users"
    //   }).done((users) => {
    //     for(user of users) {
    //       $("<div>").text(user.name).appendTo($("body"));
    //     }
    //   });;
  });

});
