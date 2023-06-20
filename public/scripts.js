function populateVoiceList() {
    const synth = window.speechSynthesis;
            const voices = synth.getVoices();
            const voiceSelect = document.getElementById('voiceSelect');
            voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.textContent = voice.name + ' (' + voice.lang + ')';
                option.setAttribute('data-lang', voice.lang);
                option.setAttribute('data-name', voice.name);
                voiceSelect.appendChild(option);
            });
        }
        populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
}
function appendMessage(sender, message) {
    const chatHistory = document.getElementById('chatHistory');
            const newMessage = document.createElement('div');
            newMessage.innerHTML = `<b>${sender}:</b> ${message}`;
            chatHistory.appendChild(newMessage);
}
function speak(text) {
     const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            const selectedOption = document.getElementById('voiceSelect').selectedOptions[0].getAttribute('data-name');
            const voices = synth.getVoices();
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedOption) {
                    utterance.voice = voices[i];
                }
            }
            synth.speak(utterance);
}
async function sendMessage() {
    const userInput = document.getElementById('userInput');
            const message = userInput.value;
            if (message.trim()) {
                appendMessage('You', message);
                userInput.value = '';
                try {
                    const response = await fetch('/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        appendMessage('Virtual Assistant', data.response);
                        speak(data.response);
                    } else {
                        appendMessage('Error', 'Failed to get chatbot response.');
                    }
                } catch (error) {
                    appendMessage('Error', 'Failed to connect to the server.');
                }
            }
}
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function fileInput() {
	const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    // Process the file here, e.g. uploading it to your server or reading its content
    // You can use FileReader API to read the file content
});
}
document.getElementById('sendButton').addEventListener('click', sendMessage);
