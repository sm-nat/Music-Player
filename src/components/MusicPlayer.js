import React, { useState, useEffect } from 'react';
import { NextButton } from './NextButton';
import { PreviousButton } from './PreviousButton'; 
function MusicPlayer() {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);

    const options = {
        method: 'GET',
        headers: {}
    };

    useEffect(() => {

        // Realiza la solicitud a la API
        fetch('https://playground.4geeks.com/apis/fake/sound/songs', options)
            .then((response) => { //promesa pendiente
                if (!response.ok) {
                    throw new Error("hay un error");
                }
                return response.json(); //convertir la respuesta a JSON
            })
            .then((data) => {
                setSongs(data);
                setCurrentSong(data[0]); // Establece la primera canción como la actual por defecto
            })
            .catch((error) => console.error('Error al obtener los datos:', error));
    }, []);

    const playNextSong = () => {
        setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    }

    const playPreviousSong = () => {
        setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    }

    return (
        <div>
            <h1>Reproductor de Música</h1>
            <audio controls>

                <source src={songs[currentSongIndex] ? songs[currentSongIndex].url : ''} type="audio/mpeg" />

            </audio>
            <ul>
                {songs.map((song, index) => (
                    <li
                        key={song.id} onClick={() => setCurrentSongIndex(index)}>
                        {song.name}
                    </li>
                ))}
            </ul>
            <div>
                <PreviousButton onClick={playPreviousSong} />
                <NextButton onClick={playNextSong} />
            </div>

        </div>
    );
}


export default MusicPlayer;
