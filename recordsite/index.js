(function () {
  let recbtn = document.querySelector(".record-btn")
  let donebtn = document.querySelector(".done-btn")
  const urlParams = new URLSearchParams(window.location.search);

  let mime;
  let blob;

  recbtn.addEventListener("click", async function () {
    let stream = await navigator.mediaDevices.getDisplayMedia({
      video: true
    });

    //needed for better browser support
    mine = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm";
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime
    });

    let chunks = [];
    mediaRecorder.addEventListener('dataavailable', function(e) {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function(){
      blob = new Blob(chunks, {
          type: chunks[0].type
      });
      document.querySelector("video").src = URL.createObjectURL(blob);
    });

    //we have to start the recorder manually
    mediaRecorder.start();
  });

  donebtn.addEventListener("click", async function () {
    let formData = new FormData();
    formData.append("file", blob, urlParams.get("id")+".webm");
    fetch("/savereq/"+urlParams.get('id'), {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
  });

})();