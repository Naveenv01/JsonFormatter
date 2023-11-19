// JsonFormatBox.tsx
import React, { useState } from 'react';

interface JsonFormatBoxProps {
    initialJson: string;
}

const JsonFormatBox: React.FC<JsonFormatBoxProps> = ({ initialJson }) => {
    const [jsonInput, setJsonInput] = useState(initialJson);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setJsonInput(event.target.value);
        setErrorMessage(''); // Reset error message on input change
    };

    const handleFormatClick = () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            const formatted = JSON.stringify(parsedJson, null, 2);
            setJsonInput(formatted);
            setErrorMessage('');
        } catch (error) {
            console.error('Error parsing JSON:', error);
            setErrorMessage('Invalid JSON'); // Set error message for invalid JSON
        }
    };

    const textareaClassName = `w-full p-2 border rounded ${errorMessage ? 'bg-red-100' : 'bg-cyan-50'
        }`;

    return (
        <div className="p-4">
            <textarea
                value={jsonInput}
                onChange={handleInputChange}
                placeholder="Enter JSON here"
                rows={30}
                className={textareaClassName}
            />
            <br />
            <button
                onClick={handleFormatClick}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
                Format JSON
            </button>
            {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
        </div>
    );
};

export default JsonFormatBox;
