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
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(user)
    }).then(res => {
      return res.json();
    }).then(json => {
      console.log(json);
    });
  }
}
