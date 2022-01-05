document
  .getElementById("payment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("button").disabled = true;
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var cvv = document.getElementById("cvv").value;
    var expirationMonth = document.getElementById("expirationMonth").value;
    var expirationYear = document.getElementById("expirationYear").value;
    const kushki = new Kushki({
      merchantId: 'd22d3935caf346df9cee6168eacaa0c3',
      inTestEnvironment: true
    });
    kushki.requestSubscriptionToken({
      currency: "COP",
      card: {
        name: name,
        number: number,
        cvc: cvv,
        expiryMonth: expirationMonth,
        expiryYear: expirationYear,
      },
    }, (response) => {
      if (response.token != null) {

        fetch("http://localhost:3000/confirmJS", {
          "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,es;q=0.8",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-site",
            "upgrade-insecure-requests": "1"
          },
          "referrer": "http://localhost:4200/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "token=" + response.token,
          "method": "POST",
          "mode": "cors",
          "credentials": "omit"
        });

        const myTimeout = setTimeout(redirection_page, 500);

        function redirection_page() {
          window.location = "http://localhost:4200/confirmOnDemand";
        }
      };
    });
  });
