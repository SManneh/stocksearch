// Initial array of stocks
const stockList = ['FB', "AAPL", 'TSLA', 'GOOG', 'AMZN'];
// let validationList = []
// Function for displaying stock data
const render = function () {

  // Delete the content inside the stocks-view div prior to adding new stocks
  // (this is necessary otherwise you will have repeat buttons)
  $("#stocks-view").empty()
  // Loop through the array of stocks, then generate buttons for each stock in the array
  for(let i = 0; i < stockList.length; i++){
    $("#stocks-view").append(`<button class="get-stock" value=${stockList[i]}>${stockList[i]}</button>`)
  }

}

// This function handles events where the add stock button is clicked
const addButton = function(event) {

  // event.preventDefault() prevents submit button from trying to send a form.
  // Using a submit button instead of a regular button allows the user to hit
  // 'Enter' instead of clicking the button if desired
  event.preventDefault();
  

  // Write code to grab the text the user types into the input field
  let newStock = $("#stock-input").val().trim()
  // Write code to add the new stock into the stocks array
  stockList.push(newStock);
  // Write code to delete the contents of the former input
  $("#stock-input").val("")
  // The renderButtons function is called, rendering the list of stock buttons
  render();
}

$('#add-stock').on('click', addButton);
$("#stocks-view").on('click', ".get-stock", function(event){ 
  
  event.preventDefault();
  const stock = $(this).val();
  
  const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=10`;
  
  const logoURL = `https://api.iextrading.com/1.0/stock/${stock}/logo`;

 

console.log(stock);
console.log(queryURL);
// ajax call function to get info from url ans pass it through response.
$.ajax({
  url:queryURL,
  method:"GET" 
}).then(function(response){

console.log(response);
// declaring variables which will be used in the append function
const companyName = response.quote.companyName;
const stockSymbol = response.quote.stockSymbol;
const price = response.quote.latestPrice;
const newsHeadline = response.news[0].headline;
// ajax call for the logo b/c its a url
$.ajax({
    url:logoURL,
    method:"GET"
}).then(function(response){
    const logo = response.url;

// function to display the variables in the html created table body
$('tbody').append(`<tr><td>${companyName}</td> + <td>${stockSymbol}</td> + <td>${price}</td> + 
<td><img src=${logo}></td> + <td>${newsHeadline}</td></tr>`);
});





});

// let getListSecurities = function(){
    // let rawList = [];

// }

});

// Calling the renderButtons function to display the initial list of stocks
render();

