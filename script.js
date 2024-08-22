let originalText = '';

function processText(action) {
    const input = document.getElementById('inputText').value;
    const outputTextArea = document.getElementById('outputText');
    const bonecoImage = document.getElementById('bonecoImage');

    if (action === 'encrypt') {
        // Guardar el texto original antes de encriptar
        originalText = input;
        
        // Encriptar el texto y mostrarlo en el campo de salida
        const encryptedText = encrypt(input);
        outputTextArea.value = encryptedText;
        
        // Ocultar la imagen de boneco
        bonecoImage.style.display = 'none';
    } else if (action === 'decrypt') {
        // Si el campo de entrada está vacío, usar el texto original
        const textToDecrypt = input || originalText;
        outputTextArea.value = decrypt(textToDecrypt);
    }
}

function encrypt(text) {
    return text.split('').map(char => substitutions[char] || char).join('');
}

function decrypt(text) {
    let result = text;
    for (const [sub, char] of Object.entries(reverseSubstitutions)) {
        const regex = new RegExp(sub, 'g');
        result = result.replace(regex, char);
    }
    return result;
}

function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    alert('Texto copiado al portapapeles');
}

const substitutions = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat',
};

const reverseSubstitutions = Object.fromEntries(
    Object.entries(substitutions).map(([key, value]) => [value, key])
);