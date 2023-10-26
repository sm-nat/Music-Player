import React, { useState, useEffect, useRef } from 'react';
import { NextButton } from './NextButton';
import { PreviousButton } from './PreviousButton';

function MusicPlayer() {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);


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

    useEffect(() => {
        // Reproducir la canción actual cuando cambie currentSongIndex
        if (songs[currentSongIndex] && isPlaying) {
            audioRef.current.src = 'https://playground.4geeks.com/apis/fake/sound/' + songs[currentSongIndex].url;
            audioRef.current.play();
        }
    }, [currentSongIndex, isPlaying]);

    const playPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const playNextSong = () => {
        setCurrentSongIndex((currentSongIndex + 1) % songs.length);
        setIsPlaying(true); // Iniciar la reproducción automáticamente

    }

    const playPreviousSong = () => {
        setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
        setIsPlaying(true); // Iniciar la reproducción automáticamente

    }

    return (
        <div class='music-container'>
            <h1>Music Player 🎶</h1>
            <audio
                ref={audioRef} controls src={songs[currentSongIndex] ? 'https://playground.4geeks.com/apis/fake/sound/' + songs[currentSongIndex].url : ''} type="audio/mpeg" >
            </audio>
            <div>
                <button onClick={playPreviousSong}>≪Previous</button>
                <button onClick={playPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={playNextSong}>Next≫</button>
            </div>

            <ul>
                {songs.map((song, index) => (
                    <li
                        key={song.id} onClick={() => setCurrentSongIndex(index)}>
                        {song.name}
                    </li>
                ))}
            </ul>
            <div class="firma">
                Made with ❤️ by 
                <a href="https://github.com/sm-nat" target="_blank" class="enlace-natalia">
                    Natalia Silva Medina
                </a>
            </div>



        </div>
    );
}


export default MusicPlayer;
