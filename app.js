const buttonSearch = document.getElementById("searchButton");
buttonSearch.addEventListener("click", function () {
    const buttonValue = document.getElementById("searchInput").value;
    console.log(buttonValue);
    songSearch(buttonValue);
})
function songSearch(buttonValue) {
    document.getElementById('songDisplay').innerHTML = "";
    fetch(`https://api.lyrics.ovh/suggest/${buttonValue}`)
        .then(res => res.json())
        .then(data => {
            data = data.data.slice(0, 10);
            const songDisplay = document.getElementById('songDisplay');
            for (let i = 0; i < data.length; i++) {
                const song = data[i];
                const div = document.createElement('div');
                div.innerHTML = `<div class="single-result row align-items-center my-3 p-3">
                                        <div class="col-md-9">
                                            <h3 class="lyrics-name">${song.album.title}</h3>
                                            <p class="author lead">Album by <span>${song.artist.name}</span></p>
                                        </div>
                                        <div class="col-md-3 text-md-right text-center">
                                            <button class="btn btn-success" onclick="getLyrics('${song.title}','${song.artist.name}')">Get Lyrics</button>
                                        </div>
                                                </div>`
                songDisplay.appendChild(div);
                console.log(song.artist.name);
            }
        });
}
function getLyrics(songName, artistName) {
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`)
        .then(res => res.json())
        .then(data => {
            const displayLyrics = document.getElementById('displayLyrics');
            displayLyrics.innerHTML = ` <div class="single-lyrics text-center">
                    <button class="btn go-back">&lsaquo;</button>
                    <h2 class="text-success mb-4">${songName} - ${artistName}</h2>
                    <pre class="lyric text-white">
                        '${data.lyrics}'
                    </pre>
                </div>`
            console.log(data.lyrics);
        })

}