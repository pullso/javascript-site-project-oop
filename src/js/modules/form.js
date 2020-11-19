export default class Form {
  constructor (forms, url = 'assets/question.php') {
    this.forms = document.querySelector(forms)
    this.inputs = document.querySelectorAll('input')
    this.message = {
      loading: 'Loading...',
      success: 'Success!',
      failure: 'Something went wrong',
    }
    this.path = url
  }
  
  checkMailInputs () {
    const mailInputs = document.querySelectorAll('[type="email"]')
    mailInputs.forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key.match(/[^a-z @ \. 0-9^]/ig)) {
          e.preventDefault()
        }
      })
    })
  }
  
  clearInputs () {
    this.inputs.forEach(input => {
      input.value = ''
    })
  }
  
  async postData (url, data) {
    let res = await fetch(url, {
      method: 'post',
      body: data,
    })
    
    return await res.text()
  }
  
  init () {
    try {
      this.checkMailInputs()
      this.forms.forEach(form => {
        form.addEventListener('submit', (e) => {
          e.preventDefault()
          
          let statusMessage = document.createElement('div')
          statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          color: grey;
        `
          form.parentNode.appendChild(statusMessage)
          
          statusMessage.textContent = this.message.loading
          
          const formData = new FormData(form)
          
          this.postData(this.path, formData).then((res) => {
            console.log(res, `: res`)
            statusMessage.textContent = this.message.success
          }).catch(err => {
            statusMessage.textContent = this.message.failure
          }).finally(() => {
            this.clearInputs()
            setTimeout(() => {
              statusMessage.remove()
            }, 6000)
          })
        })
      })
    } catch (e) {}
  }
}
