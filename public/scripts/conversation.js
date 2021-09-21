$(document).ready(() => {
  $("#send-message-form").on("submit", function (event) {
    event.preventDefault();
    const messageContent = $(this.elements["message-content"]).val();

    
    console.log(`Sending '${messageContent}' to user!`);
  });
});