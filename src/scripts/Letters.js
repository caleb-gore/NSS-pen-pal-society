import { getLetters, getAuthors, getRecipients, getTopics } from "./dataAccess.js"
/* ---------- ^^import functions^^ ---------- */

/* ---------- build HTML ---------- */
export const Letters = () => {
    return `
    <div class="container-fluid w-75 border border-secondary rounded">
        <h2 class="mt-2">Letters</h2>
        <ul class="list-group mb-3">
            ${letterHTML()}
        </ul>
    </div>`
}




const letterHTML = () => {
    const letters = getLetters()
    return letters.map(letter => {
        return `<li class="list-group-item">
        <p>Dear ${findRecipient(letter).name} (${findRecipient(letter).email}),</p>
        <p>${letter.body}</p>
        <p>Sincerely, ${findAuthor(letter).name} (${findAuthor(letter).email})</p>
        <p>Sent on ${letter.date}</p>
        ${findTopics(letter)}
        </li>`
    }).join('')

}

const findRecipient = (letterObject) => {
    const recipients = getRecipients()
    return recipients.find(r => r.id === letterObject.recipientId)
}

const findAuthor = (letterObject) => {
    const authors = getAuthors()
    return authors.find(a => a.id === letterObject.authorId)
}

const findTopics = (letterObject) => {
    const topics = getTopics() // 'topics' are all possible topics that are listed
    const topicIds = letterObject.topicIds
    let html = ``
    topics.forEach((topic) => {
        if (topicIds.includes(topic.id))
        html += `<p class="badge bg-info text-dark">${topic.topic}</p>  ` 
    })
    // topicIds.forEach((id) => {
    //     const topic = topics.find(topic => topic.id === id)
    //     html += `<p>${topic.topic}</p>` 
    // })
    return html
}




