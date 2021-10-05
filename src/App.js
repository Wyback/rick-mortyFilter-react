import React, { useState } from "react";
import './App.css';
const request = require('request');


const App = () => {

  const [episodeList, setEpisodeList] = useState([]);
  const [characterList, setCharacterList] = useState([]);
  
  let episodes = []
  let characters = []
  let selectedEpisode = "";

  const getEpisodes = () => {
    const options = {
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/episode',
      headers: {
          'Content-Type': 'application/json'
      }
    };

    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const info = JSON.parse(body);
        episodes = info.results
        setEpisodeList(episodes)
      }else {
          console.log(error)
      }
    });
  }

  const selectEpisode = (url) => {
    selectedEpisode = url
    console.log(selectedEpisode)
  }

  const getCharacter = () => {
    const options = {
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/character',
      headers: {
          'Content-Type': 'application/json'
      }
    };

    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const info = JSON.parse(body);
        characters = info.results
        console.log(characters)
        characters = characters.filter(character => character.episode.includes(selectedEpisode))
        setCharacterList(characters)
        
      }else {
          console.log(error)
      }
    });
  }


  return (
    <div className="App">
      <button onClick={getEpisodes}>Autoselect</button>
      <div>
        {episodeList.map((episode) => {
          return <div key={episode.episode}> <input type="radio" onClick={() => selectEpisode(episode.url)}/>{episode.episode} - {episode.name}</div>
        })}
      </div>
      <hr/>
      <button onClick={getCharacter}>ListCharacter</button>
      <div>
        {characterList.map((character) => {
          return <div key={character.name}> <a href={character.image}><img src={character.image} alt="character"/></a> - {character.name} - {character.species}</div>
        })}
      </div>
    </div>
  );
};

export default App;