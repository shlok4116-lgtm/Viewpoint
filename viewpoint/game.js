const photos = [
    {
        name: "Golden Sky",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80",
        rating: 1000,
        wins: 0,
        battles: 0
    },
    {
        name: "Mountain Lake",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
        rating: 1000,
        wins: 0,
        battles: 0
    },
    {
        name: "Blue Mountains",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80",
        rating: 1000,
        wins: 0,
        battles: 0
    },
    {
        name: "Ocean Sunset",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        rating: 1000,
        wins: 0,
        battles: 0
    },
    {
        name: "Forest",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
        rating: 1000,
        wins: 0,
        battles: 0
    },
    {
        name: "Night Sky",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
        rating: 1000,
        wins: 0,
        battles: 0
    },
    {
        name: "Waterfall",
        image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1000&q=80",
        rating: 1000,
        wins: 0,
        battles: 0
    },
    {
        name: "Green Valley",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
        rating: 1000,
        wins: 0,
        battles: 0
    }
];


let photoA;
let photoB;


const imageA = document.getElementById("photoA");
const imageB = document.getElementById("photoB");

const voteA = document.getElementById("voteA");
const voteB = document.getElementById("voteB");

const nextBattle = document.getElementById("nextBattle");

const leaderboardList =
    document.getElementById("leaderboardList");


function getRandomPhoto(excludePhoto = null) {

    const availablePhotos =
        photos.filter(photo => photo !== excludePhoto);

    const randomIndex =
        Math.floor(Math.random() * availablePhotos.length);

    return availablePhotos[randomIndex];
}


function startBattle() {

    photoA = getRandomPhoto();

    photoB = getRandomPhoto(photoA);

    imageA.src = photoA.image;
    imageB.src = photoB.image;

    imageA.alt = photoA.name;
    imageB.alt = photoB.name;

    voteA.disabled = false;
    voteB.disabled = false;
}


function calculateElo(winner, loser) {

    const K = 32;

    const expectedWinner =
        1 /
        (
            1 +
            Math.pow(
                10,
                (loser.rating - winner.rating) / 400
            )
        );

    const expectedLoser =
        1 /
        (
            1 +
            Math.pow(
                10,
                (winner.rating - loser.rating) / 400
            )
        );


    winner.rating =
        winner.rating +
        K * (1 - expectedWinner);


    loser.rating =
        loser.rating +
        K * (0 - expectedLoser);
}


function vote(winner, loser) {

    calculateElo(winner, loser);

    winner.wins++;

    winner.battles++;

    loser.battles++;

    updateLeaderboard();


    voteA.disabled = true;
    voteB.disabled = true;


    setTimeout(() => {

        startBattle();

    }, 700);
}


function updateLeaderboard() {

    const rankedPhotos =
        [...photos].sort(
            (a, b) => b.rating - a.rating
        );


    leaderboardList.innerHTML = "";


    rankedPhotos.forEach((photo, index) => {

        const item =
            document.createElement("p");


        item.innerHTML = `
            <strong>#${index + 1}
            ${photo.name}</strong>
            — ${Math.round(photo.rating)} rating
            (${photo.wins} wins /
            ${photo.battles} battles)
        `;


        leaderboardList.appendChild(item);

    });
}


voteA.addEventListener("click", () => {

    vote(photoA, photoB);

});


voteB.addEventListener("click", () => {

    vote(photoB, photoA);

});


nextBattle.addEventListener("click", () => {

    startBattle();

});


startBattle();