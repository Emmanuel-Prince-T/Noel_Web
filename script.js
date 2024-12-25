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

// Garder un historique des fichiers uploadés
let uploadedFiles = [];

document.getElementById('fileUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = '';

    if (file) {
        showPreview(file, previewContainer);
    }
});

function showPreview(file, container) {
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.className = 'file-preview';
        img.src = URL.createObjectURL(file);
        container.appendChild(img);
    }
    else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.className = 'file-preview';
        video.controls = true;
        video.src = URL.createObjectURL(file);
        container.appendChild(video);
    }
    else if (file.type === 'application/pdf') {
        const pdfPreview = document.createElement('div');
        pdfPreview.className = 'pdf-preview';
        pdfPreview.innerHTML = `
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='red' d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h3v3h-3v-3zm0-4h3v3h-3v-3zm-4 4h3v3h-3v-3zm0-4h3v3h-3v-3zm8 8h3v3h-3v-3zm0-4h3v3h-3v-3zm0-4h3v3h-3v-3z'/%3E%3C/svg%3E" alt="PDF icon">
            <p>${file.name}</p>
        `;
        container.appendChild(pdfPreview);
    }
}

document.getElementById('wishForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const wishes = document.getElementById('wishes').value;
    const file = document.getElementById('fileUpload').files[0];
    
    if (file) {
        // Créer un objet pour le fichier uploadé
        const uploadedFile = {
            id: Date.now(),
            file: file,
            name: name,
            wishes: wishes,
            timestamp: new Date().toLocaleString()
        };
        
        // Ajouter à l'historique
        uploadedFiles.push(uploadedFile);
        
        // Mettre à jour l'affichage de l'historique
        updateHistory();
        
        // Afficher la carte de vœux (pop-up)
        const wishCard = document.getElementById('wishCard');
        document.querySelector('.sender-name').textContent = `🎄 ${name}`;
        document.querySelector('.wish-text').textContent = wishes;
        
        // Gérer l'affichage du fichier dans la carte
        const mediaContainer = document.getElementById('wishVideo').parentElement;
        mediaContainer.innerHTML = '';
        
        const fileURL = URL.createObjectURL(file);
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.className = 'file-preview';
            img.src = fileURL;
            mediaContainer.appendChild(img);
        }
        else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.className = 'file-preview';
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.src = fileURL;
            mediaContainer.appendChild(video);
        }
        else if (file.type === 'application/pdf') {
            const pdfLink = document.createElement('a');
            pdfLink.href = fileURL;
            pdfLink.className = 'pdf-link';
            pdfLink.innerHTML = `
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h3v3h-3v-3zm0-4h3v3h-3v-3zm-4 4h3v3h-3v-3zm0-4h3v3h-3v-3zm8 8h3v3h-3v-3zm0-4h3v3h-3v-3zm0-4h3v3h-3v-3z'/%3E%3C/svg%3E" alt="PDF icon">
                <span>Voir le PDF</span>
            `;
            pdfLink.target = '_blank';
            mediaContainer.appendChild(pdfLink);
        }

        document.querySelector('.christmas-decoration').textContent = "🎁 Joyeux Noël ! 🎁";
        wishCard.classList.remove('hidden');
        
        // Gérer la fermeture du pop-up
        document.body.addEventListener('click', function hidePopup(event) {
            if (!wishCard.contains(event.target)) {
                wishCard.classList.add('hidden');
                document.body.removeEventListener('click', hidePopup);
                // Réinitialiser uniquement le formulaire
                document.getElementById('fileUpload').value = '';
                document.getElementById('preview-container').innerHTML = '';
                URL.revokeObjectURL(fileURL); // Libérer la mémoire
            }
        });
        

        // Réinitialiser le formulaire mais pas l'historique
        document.getElementById('fileUpload').value = '';
        document.getElementById('preview-container').innerHTML = '';
    }
});

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    uploadedFiles.forEach((item) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const fileType = item.file.type.startsWith('image/') ? '🖼️' :
                        item.file.type.startsWith('video/') ? '🎥' :
                        item.file.type === 'application/pdf' ? '📄' : '📁';
        
        historyItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">${fileType}</span>
                <span class="file-name">${item.file.name}</span>
                <span class="file-timestamp">${item.timestamp}</span>
            </div>
            <div class="file-preview-mini"></div>
            <button class="btn btn-danger btn-sm remove-file" data-id="${item.id}">
                Supprimer
            </button>
        `;
        
        // Ajouter une mini prévisualisation
        const previewContainer = historyItem.querySelector('.file-preview-mini');
        showPreview(item.file, previewContainer);
        
        historyList.appendChild(historyItem);
    });
    
    // Ajouter les événements de suppression
    document.querySelectorAll('.remove-file').forEach(button => {
        button.onclick = function() {
            const id = parseInt(this.dataset.id);
            uploadedFiles = uploadedFiles.filter(item => item.id !== id);
            updateHistory();
        };
    });
}