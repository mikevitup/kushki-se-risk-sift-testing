const express = require("express")
const cors = require("cors")

var LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch')

const app = express()
app.use(cors({
  origin: '*'
}))

// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}))

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome Sales Engineering Kushki Implementation."
  })
})

// Token available
app.get("/token", cors(), (req, res) => {
  var backToken = localStorage.getItem("token")
  res.json({
    token: backToken
  })
})

// Responde for Cajita and Kajita
app.post("/confirm", cors(), (req, res) => {
  body = req.body
  localStorage.setItem("token", body.kushkiToken)
  res.redirect('http://localhost:4200/confirm')
})

app.post("/confirmSubscriptions", cors(), (req, res) => {
  body = req.body
  localStorage.setItem("token", body.kushkiToken)
  res.redirect('http://localhost:4200/confirmSubscriptions')
})

// Responde for Kushki.js
app.post("/confirmJS", (req, res) => {
  var body = req.body
  localStorage.setItem("token", body.token)

  const axios = require('axios')

  axios.post('https://api-uat.kushkipagos.com/subscriptions/v1/card', {
    token: body.token,
    planName: 'On-Demand-Risk-Testing',
    periodicity: 'custom',
    fullResponse: true,
    contactDetails: {
        documentType: 'CC',
        documentNumber: '123123321',
        email: 'miguel.mahecha@kushkipagos.com',
        firstName: 'Miguel',
        lastName: 'Mahecha',
        phoneNumber: '+513112212121'
    },
    amount: {
        iva: 0,
        subtotalIva: 0,
        subtotalIva0: 0,
        currency: 'CLP'
    },
    startDate: '2022-01-12',
    language: 'es',
    metadata: {
        executedBy: 'Miguel Mahecha',
        publicMerchantId: '24ba5dd69e3e44b09511b29fa6b98c29'
    }
  }, {
    headers: {
      'Private-Merchant-Id': 'c68ed946415643918489f6f199a11f9e'
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  /*const fetch = require('node-fetch');
  
  // Propmise then/catch block
  // Make request
  fetch('https://api-uat.kushkipagos.com/subscriptions/v1/card', {
    method: 'POST',
    body: JSON.stringify({
      token: body.token,
      planName: 'On-Demand-Risk-Testing',
      periodicity: 'custom',
      fullResponse: true,
      contactDetails: {
          documentType: 'CC',
          documentNumber: '123123321',
          email: 'miguel.mahecha@kushkipagos.com',
          firstName: 'Miguel',
          lastName: 'Mahecha',
          phoneNumber: '+513112212121'
      },
      amount: {
          iva: 0,
          subtotalIva: 0,
          subtotalIva0: 0,
          currency: 'CLP'
      },
      startDate: '2022-01-12',
      language: 'es',
      metadata: {
          executedBy: 'Miguel Mahecha',
          publicMerchantId: '24ba5dd69e3e44b09511b29fa6b98c29'
      }
    }),
    headers: {
      'Content-type': 'application/json',
      'Private-Merchant-Id': 'c68ed946415643918489f6f199a11f9e'
    },
  })

  // Parse JSON data
  .then((response) => response.json())
  
  // Showing response
  .then((json) => console.log(json))
  .catch(err => console.log(err))*/

})

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})