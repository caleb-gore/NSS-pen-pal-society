import {
  getAuthors,
  getRecipients,
  getTopics,
  sendLetter,
} from "./dataAccess.js";
/* ----- ^^import funcitons^^ ----- */

document.addEventListener("submit", (event) => {
  event.preventDefault();
});

/* ----- build form HTML ----- */
export const Form = () => {
  return `
    <div class="container-fluid w-75 mb-5 border border-secondary rounded">
        <form>
            <div class="mb-3">
                <label for="authors" class="form-label mt-2">Author</label>
                <select class="form-select w-25" name="author" id="authors">
                <option selected value="0">choose...</option>
                ${authorsHTML()}
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Letter</label>
                <textarea class="form-control w-75" rows="5" name="body" style="resize: none;" type="textarea"></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Topics</label>
                <div>
                ${topicsHTML()}
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label" for="recipients">Recipient</label>
                <select name="recipient" id="recipients" class="form-select w-25">
                    <option value="0">choose...</option>
                    ${recipientsHTML()}
                </select>
            </div>
            </form>
            <button class="btn btn-dark mb-3" type="submit" id="submitRequest">Send Letter</button>
    </div>`;
};

/* ----- build form elements from API data ----- */
const authorsHTML = () => {
  const authors = getAuthors();
  return authors
    .map((author) => {
      return `<option value="${author.id}">${author.name}</option>`;
    })
    .join("");
};

const topicsHTML = () => {
  const topics = getTopics();
  return topics
    .map((topic) => {
      return `<div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="${topic.id}" name="topic" value="${topic.id}">
        <label class="form-check-label" for=${topic.id}">${topic.topic}</label></div>`;
    })
    .join("");
};

const recipientsHTML = () => {
  const recipients = getRecipients();
  return recipients
    .map((recipient) => {
      return `<option value="${recipient.id}">${recipient.name}</option>`;
    })
    .join("");
};

/* ----- save form data to API ----- */
const mainContainer = document.querySelector("#container");

/* click event listener */
mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "submitRequest") {
    clickEvent.preventDefault();
    const authorId = parseInt(document.querySelector("#authors").value);
    const recipientId = parseInt(document.querySelector("#recipients").value);
    const body = document.querySelector('textarea[name="body"]').value;
    let topicIds = [];
    const checkboxes = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    checkboxes.forEach((checkbox) => {
      topicIds.push(parseInt(checkbox.value));
    });

    const dataToSendToAPI = {
      authorId: authorId,
      recipientId: recipientId,
      topicIds: topicIds,
      body: body,
      date: new Date().toDateString(),
    };

    if (
      dataToSendToAPI.authorId === 0 ||
      dataToSendToAPI.recipientId === 0 ||
      dataToSendToAPI.body === ""
    ) {
      window.alert("Please complete form before clicking 'Send'");
    } else {
      sendLetter(dataToSendToAPI);
    }
  }
});
