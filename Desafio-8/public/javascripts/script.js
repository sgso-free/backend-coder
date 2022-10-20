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
    const showProduct = document.getElementById('show-producto');
 
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
    
      return `${date}/${month}/${year} ${dData.getHours()}:${dData.getMinutes()}:${dData.getSeconds()}`;
    }

    
    function updateMessages(messages = []) {
      showMessage.innerText = '';
      messages.forEach((data) => {
        const item = document.createElement('li');
        
        item.innerHTML = `<span class="email-message">${data.email}</span> [<span class="date-message">${formatDate(data.fecha)}</span>] : <span class="text-message">${data.mensaje}</span>`;
        showMessage.appendChild(item);
      })
    }
  
    function updateProduct(productos = []) {
      showProduct.innerHTML = '<tr><th>Nombre</th><th>Precio</th><th>Foto</th></tr>';
      productos.forEach((data) => {
        const item = document.createElement('tr');
         
        item.innerHTML = `<tr>
              <td>${data.nombre}</td>
              <td>${data.precio}</td>
               <td><img src="${data.thumbnail}" alt="${data.nombre}" style="width:50px ;"></td>
           </tr>`
           showProduct.appendChild(item);
      })
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
  
    socket.on('inicio', (mensInicio,prodInicio) => {
      mensajes = mensInicio;
      updateMessages(mensajes);

      productos=prodInicio;
      updateProduct(productos);

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