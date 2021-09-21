$(document).ready(() => {
  const escape = str => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const createMessageElement = ({author, content, time_sent}) => {
    return $(`
    <article class="message">
    <img class="message--profile-pic" src="https://pbs.twimg.com/profile_images/573692360263004161/gOvizBEP_400x400.jpeg" />
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

  const stripBefore = (s, removeMe) => {
    const idx = s.indexOf(removeMe);
    return idx >= 0 ? s.slice(idx + removeMe.length) : idx;
  };

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

  const otherUserID = getOtherUserID();
  getMessagesWithUser(otherUserID)
    .then(messages_ => Promise.all(messages_.map(populateMessageAuthor)))
    .then(messages_ => {
      messages = messages_;
      rerenderMessages();
    });

  $("#send-message-form").on("submit", function (event) {
    console.log("form");
    event.preventDefault();
    const messageContent = $(this.elements["message-content"]).val();
    const otherUserID = getOtherUserID();
    console.log("having convo with", otherUserID);

    sendMessageToUser(otherUserID, messageContent)
      .then(populateMessageAuthor)
      .then(newMessage => {
        messages.push(newMessage);
        rerenderMessages();
      })
      .catch(error => {
        console.log(error);
      });

    console.log(`Sending '${messageContent}' to user!`);
    return false;
  });
});