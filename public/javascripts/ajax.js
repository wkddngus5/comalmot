document.addEventListener('DOMContentLoaded', () => {
  new Ajax();
});

class Ajax {
  constructor() {
    this.init();
  }

  init() {
    document.querySelector('#loginSubmit').addEventListener('click', e => {
      this.login(e);
    });
    document.querySelector('#addProductButton').addEventListener('click', e => {
      this.addProduct();
    })
  }

  login(e) {
    e.preventDefault();
    let inputId = document.querySelector('#id').value;
    let inputPassword = document.querySelector('#password').value;

    let user = {
      id: inputId,
      password: inputPassword
    };

    console.log(user);

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(user)
    }).then(res => {
      return res.json();
    }).then(json => {
      document.querySelector('.mdl-layout__obfuscator').click();
    });
  }

  addProduct() {
    let part = document.querySelector('.selectPart').value;
    let inputs = document.querySelector('#' + part + 'Details').querySelectorAll('.mdl-textfield__input');

    let product = {
      name: document.querySelector('#name').value,
      company: document.querySelector('#company').value,
      part: document.querySelector('#part').value
    }

    let details = {};
    inputs.forEach(input => {
      details[input.name] = input.value;
    });

    product['details'] = details;
    console.log(product);

    fetch('http://localhost:3000/product', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then(res => {
      return res.json();
    }).then(json => {
      document.querySelector('.mdl-layout__obfuscator').click();
    });
  }
}
