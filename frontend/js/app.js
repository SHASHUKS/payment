document.getElementById('fintechForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const action = document.getElementById('action').value;
    const amount = document.getElementById('amount').value;
    const resultDiv = document.getElementById('result');
    const button = document.querySelector('button');

    // Show loading state
    button.innerText = 'Processing...';
    button.disabled = true;
    resultDiv.style.display = 'none';

    try {
        // Send data to our Node.js backend
        const response = await fetch('http://localhost:3000/api/transact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, amount })
        });

        const data = await response.json();
        
        resultDiv.style.display = 'block';
        if (data.success) {
            resultDiv.className = 'success';
            resultDiv.innerHTML = `<strong>Success!</strong> TXN ID: ${data.transactionId}<br>${data.message}`;
        } else {
            throw new Error('Transaction failed');
        }
    } catch (error) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'error';
        resultDiv.innerHTML = '<strong>Error:</strong> Ensure the backend server is running on port 3000.';
    } finally {
        // Reset button state
        button.innerText = 'Execute Transaction';
        button.disabled = false;
    }
});