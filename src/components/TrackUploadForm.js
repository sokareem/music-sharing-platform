document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('uploadForm');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission
  
      const formData = new FormData(form);
      // Append additional data if necessary
      // formData.append('key', 'value');
  
      fetch('/upload', {
        method: 'POST',
        body: formData, // Send the form data as the request body
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle success, such as displaying a success message
        // or redirecting to another page
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors, such as displaying an error message to the user
      });
    });
  });
  