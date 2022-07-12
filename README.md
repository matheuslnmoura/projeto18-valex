<p align="center">
  <a href="https://github.com/matheuslnmoura/projeto18-valex">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    Valex
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/matheuslnmoura-github/projeto18-valex

$ cd projeto18-valex

$ npm install

$ npm run dev
```

API:

```
- POST /create-card
    - Rota para cadastrar um novo cartão
    - headers: {"x-api-key": $"x-api-key"}
    - body: {
        "employeeId": <NUMBER>,
        "type": "<education || groceries || restaurant || transport || health"
    }
    
- PATCH /activate-card
    - Rota para ativar cartão
    - headers: {}
    - body: {
        "id": <NUMBER>,
        "password": <NUMBER || STRING>,
        "CVV": <NUMBER>
    }

- GET /get-card (não-autenticada)
    - Rota para retornar um cartão através do id do mesmo
    - headers: {}
    - body: {
        "employeeId": <NUMBER>,
        "cardPassword": <NUMBER || STRING>
    }

- PATCH /recharge-card
    - Rota para recarregar cartão
    - headers: {"x-api-key": $"x-api-key"}
    - body: {
        "id": <NUMBER>,
        "amount": <NUMBER>
    }

- POST /payment
    - Rota para realizar pagamentos com cartão
    - headers: {}
    - body: {
        "cardId": <NUMBER>,
        "businessId": <NUMBER>,
        "password": <NUMBER || STRING>,
        "amount": <NUMBER>
    }

- GET /balance
    - Rota para receber extrato do cartão
    - headers: {}
    - body: {
        "cardId": <NUMBER>,
    }

- PATCH /block-card 
    - Rota para bloquear um cartão pelo id
    - headers: {}
    - body: {
        "cardId": <NUMBER>,
        "password": <NUMBER || STRING>,
    }

- PATCH /unblock-card 
    - Rota para desbloquear um cartão pelo id
    - headers: {}
    - body: {
        "cardId": <NUMBER>,
        "password": <NUMBER || STRING>,
    }
```
