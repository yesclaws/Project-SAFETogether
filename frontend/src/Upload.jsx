import React, { useState } from 'react';
import { FileInput, Button } from '@mantine/core';
import axios from 'axios';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '85vh',
};

const fileInputStyle = {
  maxWidth: '400px', // Set a maximum width for the input
};

function Demo() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false); 

  const handleFileChange = (file) => {
    // Update the selected file when a new file is selected
    setSelectedFile(file);
  };

  const handleFileSubmit = () => {
    // Ensure a file is selected before sending it to the backend
    if (selectedFile) {
      const formData = new FormData();
      formData.append('audioFile', selectedFile);

      const backendUrl = '/summarize';

      // Use Axios to make a POST request
      axios.post(backendUrl, formData)
        .then((response) => {
          if (response.status === 200) {
            // File successfully uploaded to the backend
            alert('Audio file uploaded successfully!');
          } else {
            // Handle error
            alert('Error uploading audio file to the backend.');
          }
        })
        .catch((error) => {
          // Handle network error or Axios error
          console.error('Error:', error);
        });
    } else {
      // No file selected, show an alert or handle it as needed
      alert('Please select an audio file before submitting.');
    }
  };
  
  return (
    <div style={containerStyle}>
        
      <FileInput
        label="Submit Audio File"
        description="Formats accepted : .mp3, .wav, .ogg, etc"
        placeholder="Select File"
        accept="audio/*"
        style={fileInputStyle}
        onChange={handleFileChange}
      />

        <Button
        variant="filled"
        style={{
        position: "absolute",
        bottom: "375px", // Adjust the bottom position as needed
        right: "580px", // Adjust the right position as needed
      }}
      onClick={handleFileSubmit}
            >
        Submit
      </Button>
      {/* Conditional rendering for success message */}
      {success && (
          <div style={{ color: 'green', marginTop: '10px', fontSize: '1.2em' }}>
            Successfully submitted!
          </div>
        )}
    </div>
  );
}

export default Demo;
