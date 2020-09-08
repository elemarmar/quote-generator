// Get elements from DOM
const elements = {
  quoteContainer: document.getElementById('quote-container'),
  quoteText: document.getElementById('quote'),
  authorText: document.getElementById('author'),
  twitterBtn: document.getElementById('twitter'),
  newQuoteBtn: document.getElementById('new-quote'),
};

// Get Quote from API
async function getQuote() {
  const proxyUrl = 'https://shrouded-inlet-14671.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // If author is blank -> add 'Unknown'
    if (data.quoteAuthor === '') {
      elements.authorText.innerText = 'Unknown';
    } else {
      elements.authorText.innerText = data.quoteAuthor;
    }

    // Reduce Quote size if too long
    if (data.quoteText.length > 120) {
      elements.quoteText.classList.add('long-quote');
    } else {
      elements.quoteText.classList.remove('long-quote');
    }
    elements.quoteText.innerText = data.quoteText;
  } catch (error) {
    // getQuote();
    getQuote();
    console.log('No quote', error);
  }
}

// On Load
getQuote();
