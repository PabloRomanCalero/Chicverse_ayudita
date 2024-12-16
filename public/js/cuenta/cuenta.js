const sectionProfile = document.querySelector('#section-profile');
const profileInfo = document.querySelector('#profile-info');
const mediaContainer = document.querySelector('#media-container');

let token = document.querySelector('[name=_token]').value;

listarUsuario = async () => {
    let respUsers = await fetch('api/users/viewUser');
    let dataProfile = await respUsers.json();
    let user = dataProfile[0];

    const profilePicture = document.createElement('div');
    profilePicture.classList.add('profile-picture');

    const profileImg = document.createElement('img');
    profileImg.src = `${user.profile_photo}`;
    profileImg.alt = "Profile Picture";
    profileImg.classList.add('profile-img');

    profilePicture.appendChild(profileImg);

    const profileDetails = document.createElement('div');
    profileDetails.classList.add('profile-details');

    const username = document.createElement('h2');
    username.textContent = `${user.username}`;

    const name = document.createElement('p');
    name.textContent = `${user.name} ${user.surname} ${user.surname2 ? user.surname2 : ''}`;

    const profileStats = document.createElement('ul');
    profileStats.classList.add('profile-stats');

    const followers = document.createElement('li');
    followers.innerHTML = "<strong>Followers:</strong> " + `${dataProfile[4]}`;

    const following = document.createElement('li');
    following.innerHTML = "<strong>Following:</strong> " + `${dataProfile[5]}`;

    const posts = document.createElement('li');
    posts.innerHTML = "<strong>Posts:</strong> " + `${dataProfile[3]}`;

    profileStats.appendChild(followers);
    profileStats.appendChild(following);
    profileStats.appendChild(posts);

    profileDetails.appendChild(username);
    profileDetails.appendChild(name);
    profileDetails.appendChild(profileStats);

    profileInfo.appendChild(profilePicture);
    profileInfo.appendChild(profileDetails);

    listarMedia();
}

listarMedia = async () => {
    mediaContainer.innerHTML = ''; 

    let respMedia = await fetch('api/media/mediaLogedUser');
    let mediaJson = await respMedia.json();

    const h2Publicaciones = document.createElement('h2');
    h2Publicaciones.innerHTML = 'Publicaciones';
    h2Publicaciones.classList.add('titleH2Publi');

    let divPublicaciones = document.createElement("div");
    divPublicaciones.classList.add("divPublicaciones");
    mediaContainer.appendChild(h2Publicaciones);
    mediaJson.forEach(async (media) => {
        let respMediaProduct = await fetch(`api/product/mediaProduct/${media.product_id}`);
        let mediaProduct = await respMediaProduct.json();
        let product = mediaProduct[0];

        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media');

        const divVideoElement = document.createElement('div');
        divVideoElement.classList.add('divVideoImagen');

        const hr = document.createElement('hr');
        hr.style.width = '92%'; 
        hr.style.borderTop = '1px solid #ccc';

        const contentElement = document.createElement('div');
        contentElement.classList.add('media-content');

        const mediaFunctions = document.createElement('div');
        mediaFunctions.classList.add('media-functions');

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = media.description;

        const likeButton = document.createElement('button');
        likeButton.innerHTML = '<i class="fas fa-heart"></i>';
        likeButton.classList.add('like-button');

        const likesElement = document.createElement('p');
        likesElement.innerHTML = `<span class="like-count">${media.likes}</span>`;

        const commentButton = document.createElement('button');
        commentButton.innerHTML = '<i class="fas fa-comment"></i>';
        commentButton.classList.add('comment-button');

        const commentsElement = document.createElement('p');
        commentsElement.innerHTML = `<span class="comment-count">0</span>`;

        const productName = document.createElement('p');
        productName.innerHTML = `<strong>Prenda:</strong> ${product.name}`;

        const divComments = document.createElement('div');
        divComments.classList.add('divComments')

        let commentsMedia = await fetch('api/comments/mediaComments', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "media_id": media.id }),
        });
        let commentsJson = await commentsMedia.json();
        let i = 1;

        if (commentsJson != 0) {
            await commentsJson.forEach(commentsArray => {
                commentsArray.forEach(async comment => {
                    let userCommentResp = await fetch(`api/users/viewUserMedia/${comment.user_id}`)
                    let userJson = await userCommentResp.json();
                    let userComment = userJson[0];
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');
                    const imageUserComment = document.createElement('div');
                    imageUserComment.classList.add('imageUserComment');
                    const profileImageComment = document.createElement('img');
                    profileImageComment.src = `${userComment.profile_photo}`; 
                    profileImageComment.alt = 'Profile Image'; 
                    imageUserComment.appendChild(profileImageComment);

                    const commentInfo = document.createElement('span');
                    commentInfo.classList.add('commentInfo');
                    commentInfo.textContent = `${userComment.username}: ${comment.comment}`;
                    
                    commentDiv.appendChild(imageUserComment);
                    commentDiv.appendChild(commentInfo);
                    commentsElement.innerHTML = `<span class="comment-count">${i}</span>`;
                    divComments.appendChild(commentDiv);
                    i++;
                });
            });
        }

        commentButton.onclick = function () {
            divComments.style.display = 'block';
        };

        mediaFunctions.appendChild(likeButton);
        mediaFunctions.appendChild(likesElement);
        mediaFunctions.appendChild(commentButton);
        mediaFunctions.appendChild(commentsElement);
        contentElement.appendChild(mediaFunctions);
        contentElement.appendChild(descriptionElement);
        contentElement.appendChild(productName);
        contentElement.appendChild(divComments);

        if (media.url.toLowerCase().endsWith('.mp4')) {
            const videoElement = document.createElement('video');
            videoElement.classList.add('videoMedia');
            videoElement.controls = true;
            videoElement.src = media.url;
            divVideoElement.appendChild(videoElement);
            mediaElement.appendChild(divVideoElement);
        } else {
            const imageElement = document.createElement('img');
            imageElement.classList.add('imagenesMedia');
            imageElement.src = media.url;
            imageElement.alt = 'Media';
            divVideoElement.appendChild(imageElement);
            mediaElement.appendChild(divVideoElement);
        }

        mediaElement.appendChild(hr);
        mediaElement.appendChild(contentElement);
        divPublicaciones.appendChild(mediaElement);
        mediaContainer.appendChild(divPublicaciones);
    });
}


document.getElementById('profile_image').addEventListener('change', function() {
    document.getElementById('profilePhotoForm').submit();
});

listarUsuario();

document.addEventListener('DOMContentLoaded', function () {

    const profileModal = document.getElementById('profileModal');
    const profileImageInput = document.getElementById('profile_image');
    const changePhoto = document.getElementById('changePhoto');
    const deletePhotoButton = document.getElementById('deletePhoto');
    const cancelButton = document.getElementById('cancelModal');
    const modalDiv = document.querySelector('.modalDiv');
    const profilePicture = document.querySelector(".profile-picture");
    
    profilePicture.addEventListener('click', function () {
        profileModal.classList.remove('hidden');
        profileModal.classList.add('active');
    });

    changePhoto.addEventListener('click', function () {
        profileImageInput.click();
    });

    cancelButton.addEventListener('click', function () {
        profileModal.classList.remove('active');
    });

    profileImageInput.addEventListener('change', function () {
        document.getElementById('profilePhotoForm').submit();
    });

    deletePhotoButton.addEventListener('click', function () {
        document.getElementById('profile_image').value = null;
        document.getElementById('profilePhotoForm').submit();
        profileModal.classList.remove('active');
    });

    profileModal.addEventListener('click', function (event) {
        if (!modalDiv.contains(event.target)) {
            profileModal.classList.remove('active');
        }
    });  
});


