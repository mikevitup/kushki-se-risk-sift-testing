var email = "";
var currency = "";
var public = "";
var private = "";
var name = "";
var names = [];
var firstName = "";
var lastName = "";

var month = (new Date().getMonth() + 1);
if (month < 10) {
    month = "0" + month;
};
var day = (new Date().getDate());
if (day < 10) {
    day = "0" + day;
};
var startDate = (new Date().getFullYear()) + "-" + month + "-" + day;

document
  .getElementById("user-form")
  .addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("register").disabled = true;
  email = document.getElementById("email").value;
  currency = document.getElementById("currency").value;
  public = document.getElementById("public").value;
  private = document.getElementById("private").value;
  name = document.getElementById("name").value;
  names = name.split(' ');
  firstName = names[0];
  lastName = names[1];
});

document
  .getElementById("payment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("button").disabled = true;
    var number = document.getElementById("number").value;
    var cvv = document.getElementById("cvv").value;
    var expirationMonth = document.getElementById("expirationMonth").value;
    var expirationYear = document.getElementById("expirationYear").value;
    const kushki = new Kushki({
      merchantId: public,
      inTestEnvironment: true
    });
    kushki.requestSubscriptionToken({
      currency: currency,
      card: {
        name: firstName + " " + lastName,
        number: number,
        cvc: cvv,
        expiryMonth: expirationMonth,
        expiryYear: expirationYear,
      },
    }, (response) => {
      if (response.token != null) {
        console.log("TOKEN:");
        token = response.token;
        console.log(response);

        var myHeaders = new Headers();
        myHeaders.append("Private-Merchant-Id", private);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
        myHeaders.append("accept-language", "en-US,en;q=0.9,es;q=0.8");
        myHeaders.append("cache-control", "max-age=0");
        myHeaders.append("content-type", "application/x-www-form-urlencoded");
        myHeaders.append("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"");
        myHeaders.append("sec-ch-ua-mobile", "?1");
        myHeaders.append("sec-ch-ua-platform", "\"Android\"");
        myHeaders.append("sec-fetch-dest", "document");
        myHeaders.append("sec-fetch-mode", "no-cors");
        myHeaders.append("sec-fetch-site", "same-site");
        myHeaders.append("upgrade-insecure-requests", "1");

        var raw = JSON.stringify({
          "token": token,
          "planName": "On-Demand-Risk-Testing",
          "periodicity": "custom",
          "fullResponse": true,
          "contactDetails": {
              "documentType": "CC",
              "documentNumber": "123123321",
              "email": email,
              "firstName": firstName,
              "lastName": lastName,
              "phoneNumber": "+513112212121"
          },
          "amount": {
              "iva": 0,
              "subtotalIva": 0,
              "subtotalIva0": 0,
              "currency": currency
          },
          "startDate": startDate,
          "language": "es",
          "metadata": {
              "executedBy": name,
              "publicMerchantId": public
          }
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://api-uat.kushkipagos.com/subscriptions/v1/card", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);})
            .catch(error => console.log('error', error));
      } else {
        console.log("ERROR:");
        console.log(response);
      }
    });
  });

/*document
  .getElementById("tokenCharge")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("charge").disabled = true;
    kushki.requestTokenCharge({
      subscriptionId: subscriptionId // Replace with your subscription id
    }, (response) => {
      if (response.code) {
        console.log(response);
      } else {
        console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
      }
    }
  });*/