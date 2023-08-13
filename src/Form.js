import React from "react";

export default function Form(){

    const [meme,setMeme]= React.useState({
        topText: "",
        bottomText: "",
        imageUrl: "http://i.imgflip.com/1bij.jpg",
    })

    const [allMeme,setAllMeme] = React.useState([])

    React.useState(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes))
    },[])

    function getMemeImage(){
        const randomNumber=Math.floor(Math.random()*allMeme.length)
        const url=allMeme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: url
        }))
    }
    console.log(meme)
    function handleChange(event){
        const {name,value}=event.target
        setMeme(prevMeme => {
            return{
                ...prevMeme,
                [name]:value
            }
        })
    }

    return(
        <main className="form">
            <div className="meme-form">
                <input type="text" placeholder="Top text" name="topText" value={meme.topText} onChange={handleChange} className="text-above"/>
                <input type="text" placeholder="Below text" name="bottomText" value={meme.bottomText} onChange={handleChange} className="text-below"/>
                <button className="form-button" onClick={getMemeImage}>Get a new Meme</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} className="meme--image" alt="1"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}