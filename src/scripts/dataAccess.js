
/* ---------- application state ---------- */
const applicationState = {
    letters: [],
    authors: [],
    topics: [],
    recipients: []
}

/* ---------- main container querySelector ---------- */
const mainContainer = document.querySelector('#container')

/* ---------- API ---------- */
const API = "http://localhost:8088"


/* ---------- fetch functions ---------- */

export const fetchAuthors = () => {
    return fetch(`${API}/authors`)
        .then(response => response.json())
        .then(
            (authors) => {
                applicationState.authors = authors
            }
        )
}

export const fetchRecipients = () => {
    return fetch(`${API}/recipients`)
        .then(response => response.json())
        .then(
            (recipients) => {
                applicationState.recipients = recipients
            }
        )
}

export const fetchTopics = () => {
    return fetch(`${API}/topics`)
        .then(response => response.json())
        .then(
            (topics) => {
                applicationState.topics = topics
            }
        )
}

export const fetchLetters = () => {
    return fetch(`${API}/letters`)
        .then(response => response.json())
        .then(
            (letters) => {
                applicationState.letters = letters
            }
        )
}


/* ---------- getter functions ---------- */

export const getAuthors = () => {
    return applicationState.authors.map(author => ({...author}))
}

export const getTopics = () => {
    return applicationState.topics.map(topic => ({...topic}))
}

export const getRecipients = () => {
    return applicationState.recipients.map(recipient => ({...recipient}))
}

export const getLetters = () => {
    applicationState.letters.forEach((letterObj) => {
        if (letterObj.topicIds === undefined) {
            letterObj.topicIds = []
            letterObj.topicIds.push(letterObj.topicId)
        }
    })
    return applicationState.letters.map(letter => ({...letter}))
}


/* ---------- set API functions ---------- */

export const sendLetter = (letter) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(letter)
    }

    return fetch(`${API}/letters`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}