import axios from "axios";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import { ProgressSpinner } from "primereact/progressspinner";
import "./App.css";

function App() {
  const [term, setTerm] = useState("");
  const [images, setImages] = useState([]);
  const [isSpin, setIsSpin] = useState(false);

  const searchImage = () => {
    setIsSpin(true);
    axios
      .get("https://api.unsplash.com/search/photos", {
        headers: {
          Authorization:
            "Client-ID ZrYmraChYfGTMI_xGaog7lZpYDxjNVNKeVt_J5fyzVQ",
        },
        params: {
          query: term,
          per_page: 50,
        },
      })
      .then((response) => {
        setImages(response.data.results);
        setTimeout(() => {
          setIsSpin(false);
        }, 500);
      });
  };

  const downloadImage = (imageUrl, imageName) => {
    axios({
      url: imageUrl,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imageName);
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchImage();
    }
  };
  return (
    <>
      <div className="header">
        <span className="p-float-label">
          <InputText
            id="username"
            style={{ width: "20%" }}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <label htmlFor="username">Image Search</label>
          <Button onClick={searchImage} label="Ara" />
        </span>
      </div>
      <div className="image-area">
        {isSpin ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <ProgressSpinner />
          </div>
        ) : (
          images.map((item, index) => (
            <div key={index} className="image-container">
              <Image
                src={item.urls.small}
                alt={item.description}
                preview
                className="downloadable-image"
              />
              <i
                className="bi bi-download download-button"
                onClick={() => downloadImage(item.urls.full, `${item.id}.jpg`)}
              ></i>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
