document.getElementById('fileForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please select at least one file!');
        return;
    }

    let allWordsList = new Map();

    for (let i = 0; i < files.length; i++) {
        try {
            const words = await processFile(files[i]);
            
            words.forEach(word => {
                allWordsList.set(word, (allWordsList.get(word) || 0) + 1);
            });
        } catch (error) {
            console.error(`Error processing file ${files[i].name}:`, error);
        }
    }

    visualise(allWordsList);
});

function processFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const fileContent = event.target.result;
            const words = extractWords(fileContent);
            resolve(words);
        };

        reader.onerror = function () {
            reject('Error reading file');
        };

        reader.readAsText(file);
    });
}

function extractWords(text) {
    const wordPattern = /\b\w+\b/g;
    return text.match(wordPattern) || [];
}