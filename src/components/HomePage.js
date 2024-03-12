import React, { useState, useEffect } from 'react';
import TrackList from './TrackList';
// Ensure the entire page is fully loaded, including stylesheets and images.
window.onload = function() {
    const form = document.getElementById('uploadForm');
    console.log("form: ", form);
    // Make sure the form element exists before adding the event listener
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission behavior

            const formData = new FormData(form);

            console.log("Form data: ", formData); // Debugging line to view form data

            fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData, // The FormData object to be sent in the request
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success, such as updating the UI to show a success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors, such as showing an error message to the user
            });
        });
    } else {
        console.error('Form not found');
    }
};

function HomePage() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchTracks = async () => {
          console.log("Fetching track...");
          const response = await fetch('http://localhost:3001/api/tracks');
          console.log("Response: ", response);
          const data = await response.json();
          console.log("Data: ", data);
          setTracks(data);
        };
    
        fetchTracks();
      }, []);
    
  return (
    <div className="home-page">
      <section className="track-uploads">
        <h2>Latest Tracks</h2>
        <div className="tracks">
          {/* Map through your tracks state here */}
          <TrackList tracks={tracks} />
        </div>
      </section>
      
      <section className="submit-track">
        <h2>Upload Your Track</h2>
        <form id="uploadForm" enctype="multipart/form-data">
            <input type="text" name="title" placeholder="Track Name" required />
            <input type="text" name="artist" placeholder="Artist Name" required />
            {/* <div id="audio_upload"> */}
                <label>
                Audio file: 
                </label>
                <input type="file" name="filePath" placeholder="Audio File" accept="audio/*" required />
            {/* </div> */}
            {/* <div id='image_upload'> */}
                <label>
                    Image file:
                </label>
                <input type="file" name="music_image" placeholder="Image File"  accept="image/*" />
            {/* </div> */}
            <button type="submit">Upload</button>
        </form>

      </section>
      
      <section className="insight-analytics">
        <h2>Insight Analytics</h2>
        {/* Placeholder for D3.js or any other analytics visualization */}
        <div className="analytics-placeholder">
          Analytics Visualization Goes Here
        </div>
      </section>
    </div>
  );
}

export default HomePage;
