from IPython.display import HTML, display

def setup_chat_button():
    button_html = """
    <script>
    function openAIChat(error, code) {
        const chatURL = 'http://localhost:5173';
        
        const context = {
            error: error || '',
            code: code || ''
        };
        
        const params = new URLSearchParams();
        params.append('context', JSON.stringify(context));
        
        const fullURL = `${chatURL}?${params.toString()}`;
        window.open(fullURL, '_blank');
    }

    function addChatButtons() {
        const cells = document.querySelectorAll('.jp-Cell.jp-CodeCell');
        
        cells.forEach(cell => {
            const btn = document.createElement('button');
            btn.className = 'ai-debug-btn';
            btn.innerHTML = '🔧 Debug';
            
            btn.onclick = () => {
                // Get the error message if present
                const errorOutput = cell.querySelector('.jp-OutputArea-output .jp-OutputArea-output');
                const error = errorOutput ? errorOutput.textContent : '';
                
                // Get the code content
                const codeInput = cell.querySelector('.jp-InputArea-editor');
                const code = codeInput ? codeInput.textContent : '';
                
                openAIChat(error, code);
            };
            
            // Add button to cell
            const inputArea = cell.querySelector('.jp-InputArea');
            if (inputArea && !inputArea.querySelector('.ai-debug-btn')) {
                inputArea.appendChild(btn);
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        .ai-debug-btn-container {
            position: absolute;
            right: 8px;
            top: 4px;
            z-index: 9999;
        }
        
        .ai-debug-btn {
            background: #dc2626;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.2s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .ai-debug-btn:hover {
            background: #b91c1c;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(style);

    // Initial setup
    setTimeout(addChatButtons, 1000);

    // Observer for dynamic updates
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                setTimeout(addChatButtons, 100);
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    </script>
    """
    display(HTML(button_html))
    print("🔧 Debug button loaded! Look for the red button in your code cells.")

# Usage in Jupyter notebook:
# from jupyter_extension import setup_chat_button
# setup_chat_button() 