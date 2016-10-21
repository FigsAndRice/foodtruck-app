console.log(axios)
		  function handleFileSelect()
  {               
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      alert('The File APIs are not fully supported in this browser.');
      return;
    }   

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");               
    }
    else {

      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      //fr.readAsText(file);
      fr.readAsDataURL(file);
     	var data = new FormData();
     	data.append('file', file)
     	data.append('name', 'Juan Carlos')
     	console.log('data', data)
      axios.post('http://192.168.1.12:5000/api/restaurants/upload_profile/580689d6d5e74eeff13040cb', data)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  function receivedText() {
    document.getElementById('editor').appendChild(document.createTextNode(fr.result));
  }       