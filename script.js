const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('newquote')
const loader = document.getElementById('loader')

let apiQuotes=[];

// Show Loading
function loading() {
        loader.hidden = false;
        quoteContainer.hidden = true;

}

// Hide loading
function complete() {
        loader.hidden = true;
        quoteContainer.hidden = false;
}

//Show new quote
function newQuote(){
        loading();
        //pick a random quote from apiQuotes array
        const quote =  apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        
        //Checj ir author field is blanck and replace it with unknow
        if(!quote.author) {
                authorText.textContent = 'unknown';

        } else {
                authorText.textContent = quote.author;
        }
         
        // Check quote lenght to determine syling
        if(quote.text.length > 120) {
                quoteText.classList.add('long-quote')
        } else {
                quoteText.classList.remove('long-quote')
        }

        // Set quote, hide loader
        quoteText.textContent = quote.text;
        complete();
        

}





// get quotes from api
async function getQuotes() {
        loading();
        const apiUrl = "https://type.fit/api/quotes"; 
        try {
        const response = await fetch(apiUrl); 
        apiQuotes = await response.json();  
        newQuote();      
        } catch(error) {
                // Catch error here
        
        }
}

// Tweet Quote
function tweetQuote() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorText.textContent}`;
        window.open(twitterUrl, '_blank')
}

//Event listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)


// on load
getQuotes();



