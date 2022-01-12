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

        /*const request = require(['request'], function(request) {

        });

        const options = {
          method: 'POST',
          url: 'https://api-uat.kushkipagos.com/subscriptions/v1/card',
          headers: {'content-type': 'application/json', 'Private-Merchant-Id': private},
          body: {
            token: token,
            planName: 'On-Demand-Risk-Testing',
            periodicity: 'custom',
            fullResponse: true,
            contactDetails: {
              documentType: 'CC',
              documentNumber: '123123321',
              email: email,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: '+513112212121'
            },
            amount: {
              iva: 0,
              subtotalIva: 0,
              subtotalIva0: 0,
              currency: currency
            },
            startDate: startDate,
            language: 'es',
            metadata: {
              executedBy: name,
              publicMerchantId: public
            },
          },
          json: true
        };

        request(options, (error, response, body) => {
          if (error) throw new Error(error);
          console.log(body);
        });*/

        var myHeaders = new Headers();
        myHeaders.append("Private-Merchant-Id", private);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Origin", "http://localhost");

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