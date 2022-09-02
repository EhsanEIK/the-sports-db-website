const loadPlayers = () => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=g`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPlayers(data.player));
}

const showPlayers = players => {
    const playersContainer = document.getElementById('players-container');
    playersContainer.innerHTML = '';
    players.forEach(player => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadPlayerDetails(${player.idPlayer})" class="card h-100">
            <img src="${player.strThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
                <p class="card-text">Team: ${player.strTeam}</p>
                <p class="card-text">Jersey Number: ${player.strNumber ? player.strNumber : 'Not Given'}</p>
            </div>
        </div>
        `;
        playersContainer.appendChild(div);
    })
}
loadPlayers();

// search players
const searchPlayers = () => {
    const searchInputField = document.getElementById('search-input-field');
    const searchValue = searchInputField.value;
    loadPlayersByName(searchValue);
}

const loadPlayersByName = name => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPlayers(data.player));
}

// player details
const loadPlayerDetails = id => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPlayerDetails(data.players[0]));
}

const showPlayerDetails = details => {
    const playerDetails = document.getElementById('player-details');
    playerDetails.innerHTML = `
    <div class="card-body">
        <img src="${details.strThumb}" class="card-img-top" alt="">
        <h5 class="card-title">${details.strPlayer}</h5>
        <p class="card-text">Nationality: ${details.strNationality}</p>
        <p class="card-text">Sports: ${details.strSport}</p>
        <p class="card-text">Team: ${details.strTeam}</p>
        <p class="card-text">Position: ${details.strPosition}</p>
        <p class="card-text">Jersey Number: ${details.strNumber ? details.strNumber : 'Not Given'}</p>
        <p class="card-text">Height: ${details.strHeight}</p>
        <p class="card-text">Weight: ${details.strWeight}</p>
    </div>
    `;
}