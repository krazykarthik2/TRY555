import React from "react";

const ImageDownloader = ({ text, imageUrl, fileName,className }) => {
  const downloadImage = () => {
    fetch(imageUrl, {
      method: "GET",
      headers: {
        "Content-Type": "image/jpeg",
      },
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Download failed:", error));
  };

  return (
    <button onClick={downloadImage} className={className}>
      {text}
    </button>
  );
};

export default ImageDownloader;
