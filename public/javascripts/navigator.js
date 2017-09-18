document.addEventListener('DOMContentLoaded', () => {
  new Navigator();
});

class Navigator {
  constructor() {
    if ('serviceWorker' in navigator) {
      console.log('Service worker is supported');
      navigator.serviceWorker.register('/javascripts/sw.js').then(reg => {
        console.log(':^)', reg);
      }).catch(err => {
        console.log(':^)', reg);
      });
    }
    this.nowModal = null;
    this.nowInfo = null;
    this.nowAddProduct = document.querySelector('#cpuDetails');
    this.init();
  }

  init() {
    document.querySelector('.mdl-layout__drawer').addEventListener('click', e => {
      this.navLogic(e);
    });

    setTimeout(() => {
      if(document.querySelector('.mdl-layout__obfuscator')) {
        document.querySelector('.mdl-layout__obfuscator').addEventListener('click', () => {
          this.exitModal();
          this.exitDim();
          this.exitNav();
        });
        document.querySelector('.mdl-layout__content').addEventListener('click', e => {
          this.showInfoModal(e);
        });
      } else {
        console.log('dim is not loaded yet');
      }
    }, 300);
    document.querySelector('.selectPart').addEventListener('change', this.changeDetails.bind(this));
    document.querySelector('.selectInfo').addEventListener('change', e => {
      e.target.closest('.selectBox').querySelector('label').innerText = e.target.value;
    });
    document.querySelector("#moveToSignUp").addEventListener('click', event => {
      this.flip('loginModal');
    });

    document.querySelector("#moveToLogin").addEventListener('click', event => {
      this.flip('loginModal');
    });
  }

  flip(id) {
    let toFlipp = document.querySelector('#' + id);
    console.log('flipped!');
    if(toFlipp.classList.contains('flipped')) {
      toFlipp.classList.remove('flipped');
    } else {
      toFlipp.classList.add('flipped');
    }
  }

  showInfoModal(event) {
    if(event.target.className === 'mdl-card__title mdl-card--expand') {
      this.showDim();
      this.showModal('information');
      this.showInformation(event.target.closest('.demo-card-image').id);
    }
  }

  showInformation(id) {
    if(this.nowInfo) {
      this.nowInfo.classList.remove('is-visible');
    }
    let name = id.split('Img')[0];
    this.nowInfo = document.querySelector('#' + name);
    this.nowInfo.classList.add('is-visible');
  }

  changeDetails() {
    let part = document.querySelector('.selectPart').value;
    document.querySelector('.selectBox label').innerText = part;
    let toShow = document.querySelector('#' + part + 'Details');
    if(toShow) {
      this.nowAddProduct.classList.remove('is-visible');
      this.nowAddProduct = toShow;
      this.nowAddProduct.classList.add('is-visible');
      //animation으로 천천히 생기게
    }
  }

  showModal(name) {
    this.nowModal = document.querySelector('#' + name + 'Modal');
    this.nowModal.classList.add('is-visible');
  }

  exitModal() {
    if(this.nowModal) {
      this.nowModal.classList.remove('is-visible');
      this.nowModal = null;
    }
  }

  exitNav() {
    document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
  }

  showDim() {
    document.querySelector('.mdl-layout__obfuscator').classList.add('is-visible');
  }

  exitDim() {
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
  }

  navLogic(e) {
    this.exitModal();
    this.showModal(e.target.id);
  }
}
