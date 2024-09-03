document.addEventListener('DOMContentLoaded', function() {
    const searchImage = document.querySelector('.search');
    const searchBox = document.querySelector('.search-box');
    const micIcon = document.querySelector('.mic-icon');
    const elementsToHide = document.querySelectorAll('.menu-icon, .logo, .More, .Notification, .cast');
    const searchInput = document.querySelector('.search-box input');
    const closeIcon = document.querySelector('.close-icon');
    const searchResults = document.querySelector('.search-results');

    let isSearchOpen = false;

    searchImage.addEventListener('click', function() {
        if (!isSearchOpen) {
            searchBox.style.display = 'flex';
            micIcon.style.display = 'inline';
            elementsToHide.forEach(element => element.style.display = 'none');
            isSearchOpen = true;
        } else {
            searchBox.style.display = 'none';
            micIcon.style.display = 'none';
            elementsToHide.forEach(element => element.style.display = 'inline');
            isSearchOpen = false;
        }
    });

    // Event listener for search button
    searchBox.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query !== '') {
            // Perform your search or other actions here
            // For now, let's just log the query to the console
            console.log('Search query:', query);
        }
    });

    // Event listener for close icon
    searchInput.addEventListener('input', () => closeIcon.style.display = searchInput.value.trim() !== '' ? 'inline' : 'none');
    closeIcon.addEventListener('click', () => {
        searchInput.value = '';
        closeIcon.style.display = 'none';
    });

    // Event listener for mic icon
    micIcon.addEventListener('click', () => {
        const recognition = new (webkitSpeechRecognition || SpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.onstart = () => console.log('Voice recognition started');
        recognition.onresult = event => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            searchBox.submit(); // Trigger form submission
        };
        recognition.onerror = event => console.error('Voice recognition error:', event.error);
        recognition.start();
    });

    // Add click event listener to menu icon
    const menuIcon = document.querySelector('.menu-icon');
    const sideBar = document.querySelector('.side-bar');
    menuIcon.addEventListener('click', function() {
        // Toggle visibility of sidebar
        sideBar.classList.toggle('show-sidebar');
    });

    // Add click event listener to filter buttons
    const filterButtons = document.querySelectorAll('.filter-options');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove black background color from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('black');
            });

            // Add black background color to the clicked button
            this.classList.add('black');
        });
    });

    // Retrieve active link ID from local storage and set background color
    const activeLinkId = localStorage.getItem('activeLinkId');
    if (activeLinkId) {
        const activeLink = document.getElementById(activeLinkId);
        if (activeLink) {
            activeLink.style.backgroundColor = '#f0eded';
        }
    }

    // Add click event listener to links to set active state and store ID in local storage
    const links = document.querySelectorAll('.links');
    links.forEach(link => {
        link.addEventListener('click', function() {
            const previousActiveLink = document.querySelector('.links[style="background-color: rgb(240, 237, 237);"]');
            if (previousActiveLink) {
                previousActiveLink.style.backgroundColor = ''; // Remove inline style
            }

            this.style.backgroundColor = '#f0eded';
            localStorage.setItem('activeLinkId', this.id);
        });
    });
});






        const videoCardContainer = document.querySelector('.video-Container');

let api_key = "AIzaSyBOs6mDJ3FXyCeSStwt07yZrJbvCdqoaGI";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


fetch(video_http + new URLSearchParams({
    key: api_key,
    q: 'drama|film|video',
    type: 'video',
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 48,
    regionCode: 'pk'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    });
})
.catch(err => console.error(err)); // Added error handling for fetch request

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            mekeVideoCard(video_data);
        } else {
            console.error("Channel data not found");
        }
    })
    .catch(err => console.error(err)); // Added error handling for fetch request
};


const mekeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="banner">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="Channel-icon">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}


// search bar

const searchInput = document.querySelector('.search-box input'); // Corrected selector to target the input element
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => { // Removed ".document" from searchBtn
    if(searchInput.value.length){
        window.location.href = searchLink + encodeURIComponent(searchInput.value); // Used encodeURIComponent to handle special characters in search query
    }
});

