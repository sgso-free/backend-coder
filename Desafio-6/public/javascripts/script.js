(function () {
    let mensajes = [];
    const formMessage = document.getElementById('form-message');
    const inputMessage = document.getElementById('input-message');
    const showMessage = document.getElementById('show-message');
    const inputEmail = document.getElementById('input-email');
    
    let productos = [];
    const formProduct = document.getElementById('form-product');
    const inputProdTitle = document.getElementById('product-title');
    const inputProdPrice = document.getElementById('product-price');
    const inputProdImg = document.getElementById('product-thumbnail');
 
    const socket = io();
  0
    /* inputMessage.addEventListener('keyup', (event) => {
      socket.emit('nuevo-mensaje', event.target.value);
    }) */
  
    function formatDate(data) {

      let dData = new Date(data);
      let date, month, year;
    
      date = dData.getDate();
      month = dData.getMonth() + 1;
      year = dData.getFullYear(); 
       
        date = date
            .toString()
            .padStart(2, '0');
    
        month = month
            .toString()
            .padStart(2, '0');
    
      return `${date}/${month}/${year} ${hour} ${dData.getHours()}:${dData.getMinutes()}:${dData.getSeconds()}`;
    }

    
    function updateMessages(messages = []) {
      showMessage.innerText = '';
      messages.forEach((data) => {
        const item = document.createElement('li');
       
        try {
          console.log(formatDate(data.fecha));    
        } catch ( err) {
          console.log(err);
        }  
       
        item.innerHTML = `<span class="email-message">${data.email}</span> [<span class="date-message">${data.fecha}</span>] : <span class="text-message">${data.mensaje}</span>`;
        showMessage.appendChild(item);
      })
    }
  
    function updateProduct(productos = []) {
      /*showMessage.innerText = '';
      messages.forEach((data) => {
        const item = document.createElement('li');
       
        try {
          console.log(formatDate(data.fecha));    
        } catch ( err) {
          console.log(err);
        }  
       
        item.innerHTML = `<span class="email-message">${data.email}</span> [<span class="date-message">${data.fecha}</span>] : <span class="text-message">${data.mensaje}</span>`;
        showMessage.appendChild(item);
      })*/
    }

    formMessage.addEventListener('submit', (event) => {
      event.preventDefault();
      socket.emit('nuevo-mensaje', inputMessage.value, inputEmail.value);
      inputMessage.value = '';
      inputMessage.focus();
    })
  
    formProduct.addEventListener('submit', (event) => {
      event.preventDefault();
      socket.emit('nuevo-producto', inputProdTitle.value, inputProdPrice.value,inputProdImg.value);
      inputProdTitle.value = '';
      inputProdPrice.value = '';
      inputProdImg.value='';
      inputProdTitle.focus();
    })

    socket.on('connect', () => {
      console.log('Conectados al servidor');
    });
  
    socket.on('inicio', (data) => {
      mensajes = data;
      updateMessages(mensajes);
    });
  
    socket.on('notificacion-mensaje', (data) => {
      mensajes.push(data);
      updateMessages(mensajes);
    });

    socket.on('notificacion-producto', (data) => {
      productos.push(data);
      updateProduct(productos);
    });
    
  })();