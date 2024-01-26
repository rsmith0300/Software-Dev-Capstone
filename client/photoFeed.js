document.addEventListener("DOMContentLoaded", function () {
    const addPhotoButton = document.getElementById("addPhoto");
    const photoFeedContainer = document.querySelector('#photoFeedContainer');

axios.get('/photoDump').then(response => {
    console.log(response.data)
    for (let i = 0; i < response.data.length; i++) {
        const currentUrl = response.data[i]
        const newPhoto = document.createElement("img");
        newPhoto.src = 'uploads/' + currentUrl;
        photoFeedContainer.appendChild(newPhoto);
    }
})

});