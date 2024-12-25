function createSnowflakes() {
    const snowflakes = document.getElementById('snowflakes');
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflakes.appendChild(snowflake);
    }
}
createSnowflakes();

document.getElementById('wishForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const name = document.getElementById('name').value;
    const wishes = document.getElementById('wishes').value;
    const videoFile = document.getElementById('videoUpload').files[0];

    // Afficher le pop-up
    const wishCard = document.getElementById('wishCard');
    document.querySelector('.sender-name').textContent = `🎄 ${name}`;
    document.querySelector('.wish-text').textContent = wishes;

    // Charger la vidéo dans l'élément <video>
    const videoElement = document.getElementById('wishVideo');
    if (videoFile) {
        const videoURL = URL.createObjectURL(videoFile);
        videoElement.src = videoURL;
        videoElement.load();
        videoElement.play();
    }

    // Ajouter un message de Joyeux Noël
    document.querySelector('.christmas-decoration').textContent = "🎁 Joyeux Noël ! 🎁";

    // Rendre visible la carte de vœux
    wishCard.classList.remove('hidden');

    // Fermer le pop-up en cliquant sur l'écran
    document.body.addEventListener('click', function hidePopup(event) {
        if (!wishCard.contains(event.target)) {
            wishCard.classList.add('hidden');
            document.body.removeEventListener('click', hidePopup);

            // Réinitialiser le formulaire après la fermeture
            document.getElementById('wishForm').reset();
            videoElement.src = ''; // Réinitialiser la vidéo
        }
    });
});
