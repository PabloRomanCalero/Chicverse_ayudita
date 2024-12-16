const sectionProfile = document.querySelector('#section-profile');
const profileInfo = document.querySelector('#profile-info');
const mediaContainer = document.querySelector('#media-container');
const buttonFollow = document.getElementById('followUserButton');
const buttonUnfollow = document.getElementById('unfollowUserButton');
const userId = buttonFollow.getAttribute('data-user-id');
var userIdLogged = "";
let token = document.querySelector('[name=_token]').value;

async function getUserLogged(){
    let respUserLogged = await fetch('/api/users/getUserIdLogged');
    let userLogged = await respUserLogged.json();
    userIdLogged = userLogged;
    console.log(userIdLogged);
}

function updateFollowStatus(status) {
    if (userIdLogged) { 
        localStorage.setItem('followStatus_' + userIdLogged + userId, status);
    }
}

function getFollowStatus() {
    if (userIdLogged) {
        const followStatus = localStorage.getItem('followStatus_' + userIdLogged + userId);
        return followStatus;
    }
}

async function updateFollowers() {
    let respFollowers = await fetch(`/api/followers/getFollowers/${userId}`, {
        method: "POST",
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
        },
    });
    let followersCount = await respFollowers.json();
    return followersCount;
}

listarUsuario = async () => {
    
    let respUsers = await fetch(`api/users/viewUserMedia/${userId}`);
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
    
    function displayButtons() {
        const followStatus = getFollowStatus();
        console.log(followStatus);
        
        if(followStatus === 'unfollowed' || followStatus === null){
            buttonFollow.style.display = 'block';
            buttonUnfollow.style.display = 'none';
            
        }else{
            buttonFollow.style.display = 'none';
            buttonUnfollow.style.display = 'block';
        }
    }

    async function updateFollowersText(){
        let followersCount = await updateFollowers();
        followers.innerHTML = "<strong>Followers:</strong> " + followersCount;
    }

    buttonFollow.addEventListener("click", () => {  
        if(userIdLogged != "not_logged"){
            fetch("/api/followers/followUser", {
                method: "POST",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"searchedUserId": userId}),
            });
            updateFollowStatus('followed');
            displayButtons();
            updateFollowersText();
        }   
    });

    buttonUnfollow.addEventListener("click", () => {  
        if(userIdLogged != "not_logged"){
            fetch("/api/followers/unfollowUser", {
                method: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"searchedUserId2": userId}),
            });
            updateFollowStatus('unfollowed');
            displayButtons();
            updateFollowersText();
        }
    });
    displayButtons();
    listarMedia();
}

listarMedia = async () => {
    mediaContainer.innerHTML = ''; 

    let likedMedia = JSON.parse(localStorage.getItem('likedMedia')) || [];
    console.log(likedMedia);

    let respMedia = await fetch(`api/media/mediaSearchedUser/${userId}`);
    let mediaJson = await respMedia.json();

    let respUserLogged = await fetch(`api/users/getUserIdLogged`);
    let userLogged = await respUserLogged.json();
    console.log(userLogged);

    const h2Publicaciones = document.createElement('h2');
    h2Publicaciones.innerHTML = 'Publicaciones';
    h2Publicaciones.classList.add('titleH2Publi');
    const divPublicaciones = document.createElement("div");
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

        likeButton.onclick = async function () {
            console.log(media.id);
            console.log(media.user_id);
            if (userLogged != 'not_logged' && !likedMedia.includes(`${media.id}-${media.user_id}-${userLogged}`)) {
                let likes = media.likes + 1;
                let likesResp = await fetch('api/media/likesByMedia', {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "likes": likes, "media_id": media.id }),
                });
                
                const likeCount = this.parentElement.querySelector('.like-count');
                if (likesResp.status === 200) {
                    likeCount.textContent = parseInt(likeCount.textContent) + 1;
                    likedMedia.push(`${media.id}-${media.user_id}-${userLogged}`);
                    localStorage.setItem('likedMedia', JSON.stringify(likedMedia));

                    await fetch('api/crearDescuento', {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "user_id": media.user_id})
                    }); 
                }
                
            }
        };
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

        const input = document.createElement('input');
        input.classList.add('inputComment');
        input.type = 'text';
        input.placeholder = 'Escribir comentario';
        const button = document.createElement('button');
        button.classList.add('botonCrearComment');
        button.type = 'submit';


        divComments.appendChild(input);
        divComments.appendChild(button);

        commentButton.onclick = function () {
            divComments.style.display = 'block';
        };

        input.addEventListener('keypress', async function (event) {
            if (event.key === 'Enter') {
                const y = window.scrollY;
                localStorage.setItem('scrollPosition', y);
                
                await fetch('api/comments/createComment', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "media_id": media.id, "comment": input.value }),
                });
                input.value = '';
                window.location.reload();
            }
            
        });

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
async function init() {
    await getUserLogged(); 
    listarUsuario(); 
}

init();

