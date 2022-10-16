import React from "react";
import exportAsImage from "./exportAsImage"
// import memesData from "../memesData.js"

export default function Meme() {

  const [memesData, setMemesData] = React.useState([]);
  const [allMemeImages, setAllMemeImages] = React.useState(memesData)
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  })
  const memeRef = React.useRef();

  React.useEffect(() =>  {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setMemesData(data.data.memes))
  }, [meme.randomImage]);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * memesData.length)
    const url = memesData[randomNumber].url
    setMeme(prevMeme => {
      return {
        ...prevMeme,
        randomImage: url
      }
    } )
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setMeme(prevMeme => {
      return {
        ...prevMeme,
        [name]: value
      }
    })
  }

  return (
    <main>
      <div className="form" >
          <input 
            type="text"
            placeholder="Top text"
            className="form--input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input 
            type="text" 
            placeholder="Bottom text"
            className="form--input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
          <button 
            className="form--button"
            onClick={getMemeImage}
          >
            Get a new meme image 🖼
          </button>
          <button 
            className="form--button"
            onClick={() => exportAsImage(memeRef.current, "memeimg")}
          >
              Save Image
          </button>
      </div>
      <div className="meme" ref={memeRef}>
        <img src={meme.randomImage} className="meme--image"></img>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  )
}