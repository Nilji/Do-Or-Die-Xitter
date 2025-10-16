async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value;
    const chatHistory = document.getElementById('chatHistory');
    
    if (!message) return;

    // Add user message
    chatHistory.innerHTML += `
        <div class="user-message">
            <strong>You:</strong> ${message}
        </div>
    `;

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        
        // Add AI response
        chatHistory.innerHTML += `
            <div class="ai-response">
                <strong>AI:</strong> ${data.response}
            </div>
        `;
        
    } catch (error) {
        chatHistory.innerHTML += `
            <div class="error">
                Error: ${error.message}
            </div>
        `;
    }
    
    input.value = '';
    chatHistory.scrollTop = chatHistory.scrollHeight;
}