const searchSongs = () => {
  const searchText = document.getElementById("search-text").value;
  const url = `https://api.lyrics.ovh/suggest/${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displaySongs(data.data))
    .catch((error) =>
      errorMessage("Something went wrong! Please try again later.")
    );
};
// const searchSongs = async () => {
//   const searchText = document.getElementById("search-text").value;
//   const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   displaySongs(data.data);
// };

const displaySongs = (songs) => {
  const songsContainer = document.getElementById("songs-container");
  songsContainer.innerHTML = "";
  songs.forEach((song) => {
    const songDiv = document.createElement("div");

    songDiv.className = "single-result row align-items-center my-3 p-3";

    songDiv.innerHTML = `
    
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
          <source src="${song.preview}" type="audio/mpeg">
      </audio> 
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>

    `;
    songsContainer.appendChild(songDiv);
  });
};
// const getLyrics = (artist, title) => {
//   const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       callLyrics(data.lyrics);
//     })
//     .catch((error) =>
//       errorMessage("Something went wrong! Please try again later.")
//     );
// };
const getLyrics = async (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    callLyrics(data.lyrics);
  } catch (error) {
    errorMessage("Something went wrong! Please try again later.");
  }
};
const callLyrics = (lyrics) => {
  const lyricsContainer = document.getElementById("lyrics-container");
  lyricsContainer.innerText = lyrics;
};

const errorMessage = (error) => {
  const errorContainer = document.getElementById("error-message");
  errorContainer.innerText = error;
};
