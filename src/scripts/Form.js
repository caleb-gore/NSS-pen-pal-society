import { getAuthors, getRecipients, getTopics, sendLetter } from "./dataAccess.js"

/* ---------- build form HTML ---------- */
export const Form = () => {
    return `
    <div class="container-fluid w-75 mb-5 border border-secondary rounded">
        <form>
            <div class="mb-3">
                <label for="authors" class="form-label mt-2">Author</label>
                <select class="form-select w-25" name="author" id="authors">
                <option selected>choose...</option>
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
                    <option value="">choose...</option>
                    ${recipientsHTML()}
                </select>
            </div>
            <button class="btn btn-dark mb-3" type="submit" id="submitRequest">Send Letter</button>
        </form>
    </div>`
}

/* ---------- build form elements from API data ---------- */
const authorsHTML = () => {
    const authors = getAuthors()
    return authors.map((author) => {
        return `<option value="${author.id}">${author.name}</option>`
    }).join("")
}

const topicsHTML = () => {
    const topics = getTopics()
    return topics.map((topic) => {
        return `<div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="${topic.id}" name="topic" value="${topic.id}">
        <label class="form-check-label" for=${topic.id}">${topic.topic}</label></div>`
    }).join("")
}

const recipientsHTML = () => {
    const recipients = getRecipients()
    return recipients.map((recipient) => {
        return `<option value="${recipient.id}">${recipient.name}</option>`
    }).join("")
}

/* ---------- save form data to API ---------- */
const mainContainer = document.querySelector('#container')

mainContainer.addEventListener('click', clickEvent => {
    if (clickEvent.target.id === 'submitRequest') {
        const authorSelect = document.querySelector('#authors')
        const authorId = parseInt(authorSelect.options[authorSelect.selectedIndex].value)
        const recipientSelect = document.querySelector('#recipients')
        const recipientId = parseInt(recipientSelect.options[recipientSelect.selectedIndex].value)
        const body = document.querySelector('textarea[name="body"]').value
        const checkboxes = document.getElementsByName('topic')
        let topicIds = []
        
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === true) {
                topicIds.push(parseInt(checkboxes[i].value))
            }
        }
        

        const dataToSendToAPI = {
            authorId: authorId,
            recipientId: recipientId,
            topicIds: topicIds,
            body: body,
            date: new Date().toDateString()
        }

        if (dataToSendToAPI.authorId !== null && dataToSendToAPI.recipientId !== null && dataToSendToAPI.body !== "") {
            sendLetter(dataToSendToAPI)
        } else {
            window.alert("Please complete form before clicking 'Send'")
        }
    }
})


/* ---------- Stretch Goal ---------- */

/* 
- Allow users to select more than one topic
- All selected topics should be shown in letters section
*/

/* ---------- ALGORHITHM ----------*/

/*
----- on Form.js -----
- change radio buttons to checkboxes >>>
- iterate the checkboxes
- parse integer save value of checked boxes into array (topicIds: []) that replaces topicId variable
- save new array in dataToSendToAPI object (change topicId to topicIds)

----- on Letters.js -----
- change findTopic() to findTopics()
- iterate through topics array
- for every topic, find the id in the topicIds array that matches that topic's id
- if there is a match, return the topic name
- if not, return nothing
*/