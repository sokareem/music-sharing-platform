import React from 'react';

function TrackList({ tracks }) { // Assuming track is now a single object, not tracks
  // Ensure tracks is an array to prevent runtime errors
  if (!Array.isArray(tracks)) {
    console.error('Tracks prop must be an array');
    return null; // or return a placeholder element/message
  }
 console.log("Track id: ", tracks );

 return (
    <div>
      {tracks.map((track) => (
        <div key={track._id}> {/* Use track._id for the key to ensure each element is unique */}
          <p>{track.title}</p>
          <p>{track.artist}</p>
          {/* Here, you can add other properties like track.filePath if needed */}
          {/* <p>{track.votes}</p> */}
          {/* Add components for playing the track, voting, etc. */}
        </div>
      ))}
    </div>
  );
}

export default TrackList;
