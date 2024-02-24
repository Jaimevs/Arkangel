import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadingtask } from '../api/upload.api';

function UploadTasks() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileUpload = async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (file) {
      try {
        await uploadingtask(file);
        console.log('Archivo enviado exitosamente');

     
        navigate('/');
      } catch (error) {
        console.error('Error al enviar el archivo', error);
      }
    } else {
      setErrorMessage('Por favor, elige un archivo antes de enviar');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="csvFile"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            CSV File (MAX. 800x400px)
          </p>
        </div>
        <input id="csvFile" type="file" name="csvFile" className="hidden" />
      </label>
      {errorMessage && (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      )}
      <button
        onClick={handleFileUpload}
        className="mt-4 bg-blue-500 text-white py-3 px-6 rounded-full"
      >
        Send CSV
      </button>
    </div>
  );
}

export default UploadTasks;
