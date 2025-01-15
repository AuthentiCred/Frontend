import textract from 'textract';

const parseResume = async (filePath) => {
    try {
        const text = await extractText(filePath);

        const result = {
            name: extractName(text),
            email: extractEmail(text),
            phone: extractPhone(text),
        };

        console.log('Parsed Resume Data:', result);
    } catch (error) {
        console.error('Error parsing resume:', error);
    }
};

const extractText = (filePath) =>
    new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (err, text) => {
            if (err) reject(err);
            else resolve(text);
        });
    });

const extractName = (text) => {
    const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    return lines.length > 0 ? lines[0] : null;
};

const extractEmail = (text) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
};

const extractPhone = (text) => {
    const phoneRegex = /(\+?\d{1,4}[-.\s]?|\(\d{1,4}\)\s?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/;
    const match = text.match(phoneRegex);
    return match ? match[0] : null;
};

const filePath = 'resume.pdf';
parseResume(filePath);
