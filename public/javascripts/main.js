document.addEventListener('DOMContentLoaded', () => {
  new Navigator();
});

class Navigator {
  constructor() {
    this.nowModal = null;
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
      }else {
       console.log('dim is not loaded yet');
      }
    }, 90);

    document.querySelector('.selectPart').addEventListener('change', this.changeDetails.bind(this));
  }

  changeDetails() {
    let part = document.querySelector('.selectPart').value;

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

  exitDim() {
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
  }

  navLogic(e) {
    this.exitModal();
    this.showModal(e.target.id);
    }
}
