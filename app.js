//Check the connection between index.html and app.js
console.log("connected!");

const setJumbotron = (jumbo) => {
  jumbo.style.paddingTop = "2rem";
  jumbo.style.paddingBottom = "2rem";
  jumbo.style.width = "80%";
  jumbo.style.margin = "0 auto";
  jumbo.style.borderRadius = "2rem";
};

//Make the GUI nicer
document.body.style.textAlign = "center";
const jumbotronSetting = document.querySelector(".jumbotron");
setJumbotron(jumbotronSetting);
const main = document.querySelector("main");
main.style.margin = "2rem";
const quoteBtn = document.getElementById("quoteBtn");
quoteBtn.style.backgroundColor = "lightblue";
quoteBtn.style.width = "15rem";
document.querySelector("p").style.fontSize = "2rem";

//Declare the API url
const url = "https://type.fit/api/quotes";

//Get the quote form the API site
const getQuote = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

//Generate random number
const getRandomNumber = (quoteLength) =>
  Math.floor(Math.random() * quoteLength);

//Render quote
const showQuote = async () => {
  //Clear the previous content
  const quoteSentence = document.getElementById("quote");
  quoteSentence.innerHTML = "";
  const quote = await getQuote();
  const randomNumber = getRandomNumber(quote.length);
  const quoteParagraph = document.createElement("p");
  quoteParagraph.style.fontSize = "2rem";
  quoteParagraph.innerHTML = `" ${quote[randomNumber].text} "`;
  const quoteAuthor = document.createElement("aside");
  let author = "";
  if (quote[randomNumber].author) {
    author = quote[randomNumber].author;
  } else {
    author = "Unknown";
  }
  quoteAuthor.innerHTML = `by ${author}`;
  quoteParagraph.appendChild(quoteAuthor);
  quoteSentence.appendChild(quoteParagraph);
};

//When the button is clicked
quoteBtn.onclick = showQuote;
