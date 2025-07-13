import { useState } from 'react';

const UrlForm = ({ onSubmit }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [isValid, setIsValid] = useState(false);//Starts as false, so the form button is disabled until a valid URL is entered.

  const handleSubmit = (e) => {
    e.preventDefault();//e.preventDefault() prevents the page from refreshing (which is the browser’s default form behavior).
    if (isValid) {
      onSubmit(originalUrl);//Call the onSubmit function and pass the URL.
      setOriginalUrl('');//Clear the input field after submission.
    }
  };

  const validateUrl = (url) => {//A helper function that checks if the entered string is a valid URL.
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {//Runs every time the user types something.
    const url = e.target.value;
    setOriginalUrl(url);//Stores the typed URL into state.
    setIsValid(validateUrl(url));//Validates it and updates isValid.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="url"
          value={originalUrl}
          onChange={handleChange}
          placeholder="Enter a long URL to shorten"
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded-md text-white ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Shorten
        </button>
      </div>
      {originalUrl && !isValid && (
        <p className="text-red-500 text-sm">Please enter a valid URL (e.g., https://example.com)</p>
      )}
    </form>
  );
};

export default UrlForm;