var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

var xhrbtn = document.querySelector('#xhr');
var fetchbtn = document.querySelector('#fetch');
var jquerybtn = document.querySelector('#jquery');
var axiosbtn = document.querySelector('#axios');
var display = document.querySelector('#quote');

// XHR version of GET request
xhrbtn.addEventListener('click', function () {
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            var quote = JSON.parse(XHR.responseText)[0];
            display.innerText = quote;
        }
    };
    XHR.open('GET', url);
    XHR.send();
});

// fetch version of GET request
fetchbtn.addEventListener('click', function () {
    fetch(url)
        .then(function (req) {
            req.json().then(function (data) {
                display.innerText = data[0];
            });
        })
        .catch(function () {
            alert('ERROR!');
        });
});

// jQuery version of GET request
$('#jquery').click(function () {
    $.getJSON(url)
        .done(function (data) {
            $('#quote').text(data[0]);
        })
        .fail(function () {
            alert("ERROR!");
        })
});

// axios version of GET request
axiosbtn.addEventListener('click', function () {
    axios.get(url)
        .then(function (res) {
            display.innerText = res.data[0];
            // display.innerText = data[0];
        })
        .catch(function () {
            alert("Error!");
        })
});


// RANDOM DOG PHOTO CODE
var btn2 = document.querySelector('#btn-dog');
var dogImage = document.querySelector('#dog-image');

//listen for clicks
btn2.addEventListener('click', function () {
    //make the request
    var XHR = new XMLHttpRequest();

    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            // XHR.responseText.message contains url received from the dog api, JSON.parse - parses the JSON object to JavaScript object so it can be used in the code, when not parsed it behaves like normal text
            var url = JSON.parse(XHR.responseText).message;
            dogImage.src = url;
        }
    };

    XHR.open('GET', 'https://dog.ceo/api/breeds/image/random');
    XHR.send();
});

// BITCOIN PRICE CODE

var btn = document.querySelector('#btn-btc');
var span = document.querySelector('#price-btc');

function getPrice() {
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            var rate = JSON.parse(XHR.responseText).bpi.USD.rate;
            var currency = JSON.parse(XHR.responseText).bpi.USD.code;
            span.textContent = rate + ' ' + currency;
        }
    };
    XHR.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
    XHR.send();
}

// have price when webiste starts
window.onload = function () {
    getPrice();
};

//listen for clicks
btn.addEventListener('click', function () {
    getPrice();
});
