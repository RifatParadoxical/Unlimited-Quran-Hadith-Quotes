let currentIndex = 0;
let quotes = [
    "Indeed, Allah is with those who fear Him and those who are doers of good.",
    "Verily, with hardship comes ease.",
    "And We have certainly created man, and We know what his soul whispers to him.",
    "And whoever puts their trust in Allah, He will be sufficient for them",
    "And speak to people kindly.",
    "Allah does not burden a soul beyond that it can bear.",
    "And We have not sent you, [O Muhammad], except as a mercy to the worlds.",
    "Indeed, prayer prohibits immorality and wrongdoing.",
    "And whoever fears Allah, He will make for him a way out.",
    "Indeed, the Hereafter is better for you than the present [life].",
    "Indeed, the human being is in loss, except those who believe and do good deeds.",
    "Call upon Me; I will respond to you."
];

function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

async function fetchQuotes() {
    try {
        const response = await fetch('quotes.json');
        const data = await response.json();
        return [...data.quran.map(q => q.verse), ...data.hadith.map(h => h.text)];
    } catch (error) {
        console.error('Error loading quotes:', error);
        return null;
    }
}

async function initializeData() {
    const useHardcodedArray = Math.random() < 0.5;

    if (useHardcodedArray) {
        console.log("Using hardcoded array");
        quotes = shuffleArray(quotes);
    } else {
        console.log("Fetching from JSON");
        const fetchedQuotes = await fetchQuotes();
        if (fetchedQuotes) {
            quotes = shuffleArray(fetchedQuotes);
        } else {
            quotes = shuffleArray(quotes);
        }
    }

    updateUI();
    setupEventListeners();
}

function updateUI() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="page page1">
            <div class="heading">Al Quran</div>
            <div class="para para1">${quotes[currentIndex]}</div>
            <div class="button">
                <button class="button1">Next</button>
            </div>
        </div>
        <div class="page page2">
            <div class="heading">Al Hadith</div>
            <div class="para para2">${quotes[currentIndex]}</div>
            <div class="button">
                <button class="button2">Next</button>
            </div>
        </div>`;
    console.log(quotes[currentIndex]);
}

function setupEventListeners() {
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    const button1 = document.querySelector('.button1');
    const button2 = document.querySelector('.button2');

    function switchPage(fromPage, toPage, fromButton, toButton) {
        fromButton.style.opacity = '0.2';
        fromPage.style.transform = 'translateX(-100%)';
        fromPage.style.opacity = '0';
        
        toPage.style.display = 'flex';
        toPage.style.transform = 'translateX(0)';
        toPage.style.opacity = '1';
        toButton.style.opacity = '1';

        currentIndex = (currentIndex + 1) % quotes.length;
        document.querySelector(`${toPage.classList.contains('page1') ? '.para1' : '.para2'}`).innerText = quotes[currentIndex];
        console.log(quotes[currentIndex]);
    }

    button2.addEventListener('click', () => switchPage(page2, page1, button2, button1));
    button1.addEventListener('click', () => switchPage(page1, page2, button1, button2));
}

initializeData();
