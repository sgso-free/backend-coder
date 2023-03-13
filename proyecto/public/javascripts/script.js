(function () {
    let mensajes = [];
    const formMessage = document.getElementById('form-message');
    const inputMessage = document.getElementById('input-message');
    const showMessage = document.getElementById('show-message');
    
    const inputEmail = document.getElementById('input-email');
    const inputNombre = document.getElementById('input-nombre'); 
    const inputEdad = document.getElementById('input-edad'); 
        
    /*const authorSchema = new normalizr.schema.Entity('author',{},{idAttribute: 'email'})*/

    const mensajeSchema = new normalizr.schema.Entity('mensaje', {
    }) 
    const mensajesSchema = new normalizr.schema.Entity('mensajes', { 
      mensajes: [mensajeSchema]
    })
 
    const socket = io();
   
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

    
    function updateMessages(messages) {
      showMessage.innerText = '';
 
      messages.forEach((data) => {
        const item = document.createElement('li');
        
        item.innerHTML = `<span class="email-message">${data.email}</span> [<span class="date-message">${formatDate(data.fecha)}</span>] : <span class="text-message">${data.cuerpo}</span>`;
        showMessage.appendChild(item);
      })
    }
     
    formMessage.addEventListener('submit', (event) => {
      event.preventDefault();
 
      let data = {
              "cuerpo":inputMessage.value, 
              "email":inputEmail.value
          };
      console.log(data)
      socket.emit('nuevo-mensaje', data);
      inputMessage.value = '';
      inputMessage.focus();
    })
    
    socket.on('connect', () => {
      console.log('Conectados al servidor');
    });
  
    socket.on('inicio', (normMensj) => { 
 
      const denormMensj = normalizr.denormalize(normMensj.result, mensajesSchema,normMensj.entities)
      console.log(denormMensj)
      messages = denormMensj.mensajes 
      console.log(messages)
      updateMessages(messages);

      const originalSize = JSON.stringify(denormMensj).length
      const normalizedSize = JSON.stringify(normMensj).length
      console.log(originalSize,normalizedSize)
      //const compressValue = (normalizedSize * 100) / originalSize
 
      //updateTitle(compressValue);
    });
  
    socket.on('notificacion-mensaje', (data) => {
      mensajes.push(data);
      updateMessages(mensajes);
    });
  
  })();