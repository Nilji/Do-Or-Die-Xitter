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

    // Add thinking status
    const statusId = Date.now();
    chatHistory.innerHTML += `
        <div id="${statusId}" class="status-message thinking">
            ⏳ AI is thinking...
        </div>
    `;

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        
        // Remove thinking status
        document.getElementById(statusId).remove();
        
        // Add AI response
        chatHistory.innerHTML += `
            <div class="ai-response">
                <strong>AI:</strong> ${data.response}
                <div class="status-message success">✅ Completed</div>
            </div>
        `;
        
    } catch (error) {
        document.getElementById(statusId).remove();
        chatHistory.innerHTML += `
            <div class="error">
                ❌ Error: ${error.message}
                <div class="status-message error">⚠️ Failed to get response</div>
            </div>
        `;
    }
    
    input.value = '';
    chatHistory.scrollTop = chatHistory.scrollHeight;
}