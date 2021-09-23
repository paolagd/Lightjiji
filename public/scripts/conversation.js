$(document).ready(() => {
  const escape = str => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const createMessageElement = ({author, content, time_sent}) => {
    return $(`
    <article class="message">
      <img class="message--profile-pic" src="${author.profile_pic_url}" />
      <div>
        <div class="message--name-date">
          <span class="message--author-name">${escape(author.first_name)} ${escape(author.last_name)}</span>
          <span>${timeago.format(time_sent)}</span>
        </div>
        <p>${escape(content)}</p>
      </div>
    </article>
    `);
  };

  /**
   * A message returned from the API looks like:
   *   { "message_id": 1,
   *     "author_id": 1,
   *     "content": "Hello, I was wondering about the motorcycle you are selling, is it still available?",
   *     "time_sent": "2021-09-23T18:57:13.614Z" },
   * and has an author_id field. This function adds a user field
   * to it using the /api/users/:user_id endpoint.
   */
  const populateMessageAuthor = message => {
    const requestOptions = {
      method: "get",
      dataType: "json",
    };

    return $
      .ajax(`/api/users/${message.author_id}`, requestOptions)
      .then(user => ({
        ...message,
        author: user
      }));
  };

  /**
   * Removes everything from a string before, including the first instance of `removeMe`.
   */
  const stripBefore = (s, removeMe) => {
    const idx = s.indexOf(removeMe);
    return idx >= 0 ? s.slice(idx + removeMe.length) : idx;
  };

  /**
   * The user ID of the user you're conversing with is at the end of the URL
   * Example: lightjiji.com/messages/389 -> talking with user with id 389.
   */
  const getOtherUserID = () => {
    const pathName = location.pathname;
    const userIDStr = stripBefore(pathName, "/messages/");
    return Number(userIDStr);
  };
  
  const getMessagesWithUser = otherUserID => {
    const requestOptions = {
      method: "get",
      dataType: "json"
    };

    return $.ajax(`/api/messages/${otherUserID}`, requestOptions);
  };

  const sendMessageToUser = (otherUserID, message) => {
    const requestOptions = {
      method: "post",
      dataType: "json",
      data: { message }
    };

    return $.ajax(`/api/messages/${otherUserID}`, requestOptions);
  };

  const rerenderMessages = () => {
    $(".message-list").empty();
    $(".message-list").append(
      messages.map(createMessageElement)
    );
  };

  const scrollToBottomOfMessages = () => {
    const messageList = $(".message-list");
    messageList.scrollTop(messageList.prop("scrollHeight"));
  };

  // Prepopulate messages element
  const otherUserID = getOtherUserID();
  getMessagesWithUser(otherUserID)
    .then(messages_ => Promise.all(messages_.map(populateMessageAuthor)))
    .then(messages_ => {
      messages = messages_;
      rerenderMessages();
      scrollToBottomOfMessages();
    });

  $("#send-message-form").on("submit", function (event) {
    event.preventDefault();
    const messageElement = $(this.elements["message-content"]);
    const messageContent = messageElement.val();
    const otherUserID = getOtherUserID();

    // Clear message input field
    messageElement.val("");

    sendMessageToUser(otherUserID, messageContent)
      .then(populateMessageAuthor)
      .then(newMessage => {
        // add new message to DOM
        messages.push(newMessage);
        rerenderMessages();
        scrollToBottomOfMessages();
      })
      .catch(error => {
        console.log(error);
      });

    return false;
  });

  // Update the message elements with new time sent values.
  const REFRESH_INTERVAL = 60;
  setInterval(() => {
    rerenderMessages();
  }, REFRESH_INTERVAL * 1000);
});