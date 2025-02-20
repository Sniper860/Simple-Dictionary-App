async function getMeaning() {
    const word = document.getElementById("word").value.trim();
    if (!word) {
        document.getElementById("result").innerHTML = "Please enter a word.";
        return;
    }
    
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        
        if (data.title) {
            document.getElementById("result").innerHTML = "Word not found.";
        } else {
            const phonetic = data[0].phonetics[0]?.text || "N/A";
            const definition = data[0].meanings[0].definitions[0].definition;
            const synonyms = data[0].meanings[0].definitions[0].synonyms?.join(", ") || "None";
            const audio = data[0].phonetics[0]?.audio || "";
            
            document.getElementById("result").innerHTML = `
                <h2>${data[0].word}</h2>
                <p><strong>Phonetic:</strong> ${phonetic}</p>
                <p><strong>Definition:</strong> ${definition}</p>
                <p><strong>Synonyms:</strong> ${synonyms}</p>
                ${audio ? `<p><strong>Pronunciation:</strong> <audio controls><source src="${audio}" type="audio/mpeg">Your browser does not support the audio element.</audio></p>` : ""}
            `;
        }
    } catch (error) {
        document.getElementById("result").innerHTML = "Error fetching data. Try again later.";
    }
}

function changeTheme() {
    const theme = document.getElementById("theme-selector").value;
    document.body.className = theme;
}
