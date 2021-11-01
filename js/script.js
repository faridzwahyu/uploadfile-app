const form = document.querySelector("form"),
   inputFiles = document.querySelector("#inputFiles"),
   progressArea = document.querySelector(".progress-area"),
   uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
   inputFiles.click();
});

inputFiles.onchange = ({ target }) => {
   let file = target.files[0]; // mengambil file pertama saja
   if (file) {
      let fileName = file.name;
      if (fileName.length >= 12) {
         // splitname nama dan ekstensi
         let splitName = fileName.split(".");
         fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
      }
      uploadFile(fileName);
   }
};

function uploadFile(name) {
   let xhr = new XMLHttpRequest();
   xhr.open("POST", "php/upload.php");

   xhr.upload.addEventListener("progress", ({ loaded, total }) => {
      let fileLoaded = Math.floor((loaded / total) * 100); // persentase
      let fileTotal = Math.floor(total / 1000); // size dalam KB
      let fileSize;
      // size dalam MB
      fileTotal < 1024 ? (fileSize = fileTotal + " KB") : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
      let progressHTML = `<li class="row">
                              <i class="fas fa-file-alt"></i>
                              <div class="progress-content">
                                 <div class="progress-details">
                                    <span class="progress-name">${name} - Uploading</span>
                                    <span class="percent">${fileLoaded}%</span>
                                 </div>
                                 <div class="progress-bar">
                                    <div class="progress-line" style="width: ${fileLoaded}%"></div>
                                 </div>
                              </div>
                           </li>`;
      // uploadedArea.innerHTML = "";
      progressArea.innerHTML = progressHTML;
      if (loaded == total) {
         progressArea.innerHTML = "";
         let uploadedHTML = `<li class="row">
                              <i class="fas fa-file-alt"></i>
                              <div class="uploaded-content">
                                 <div class="uploaded-details">
                                    <span class="uploaded-name">${name} - Uploaded</span>
                                    <span class="size">${fileSize}</span>
                                 </div>
                                 <i class="fas fa-check"></i>
                              </div>
                           </li>`;
         // uploadedArea.innerHTML = uploadedHTML;
         uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //remove this line if you don't want to show upload history
      }
   });

   let data = new FormData(form);
   xhr.send(data);
}
