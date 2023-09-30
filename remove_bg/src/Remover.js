import React, { useState } from 'react';


export default function App() {
  const [image, setImage] = useState(null);
  const [removebg, setRemovebg] = useState(null);
  const [isUpload, setIsUpload] = useState(false);

  const handleFileInputChange = (e) => {
    let image = e.target.files[0]; // it will return only first selected file
    console.log(image);
    setImage(image);
  }

  const handleChangebg = async () => {
    const apiKey = 'nL1gtvWVALcDpxBrLy7nBWhz'
    const url = 'https://api.remove.bg/v1.0/removebg'

    setIsUpload(true);
    const formData = new FormData();
    formData.append("image_file", image, image.name);
    formData.append("size", "auto");

    await fetch(url, {
      method: "POST",
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formData
    }).then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => setRemovebg(reader.result)
        reader.readAsDataURL(blob);
        setIsUpload(false);
      }).
      catch((err) => console.error(err));
    setIsUpload(false);
  }
  return (
    <div className='container'>
      <div className='remover_container'>
        <form className="info_container">
          <label className="info_text">Select a File</label>
          <input type="file" onChange={handleFileInputChange} required />
          {!isUpload ? (
            <button
              type="button"
              onClick={handleChangebg}
              className="btn btn_upload"
            >
              Upload
            </button>
          ) : (
            <button
              type="button"
              onClick={handleChangebg}
              className="btn btn_upload btn_disabled"
              disabled={true}
            >
              Uploading...
            </button>
            
          )}
        </form>
        {removebg && (
          <a href={removebg} download="no-back.png">
            <button className="btn btn_download">Download</button>
          </a>
        )}
        {removebg && (
          <div className="final_img_area">
            <img src={removebg} alt="final_img" className="final_img" />
          </div>
        )}
      </div>

    </div>
  )
};
