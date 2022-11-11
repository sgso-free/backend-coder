(function () {
    let mensajes = [];
    const formMessage = document.getElementById('form-message');
    const inputMessage = document.getElementById('input-message');
    const showMessage = document.getElementById('show-message');
    
    const inputEmail = document.getElementById('input-email');
    const inputNombre = document.getElementById('input-nombre');
    const inputApellido = document.getElementById('input-apellido');
    const inputEdad = document.getElementById('input-edad');
    const inputAlias = document.getElementById('input-alias');
    const inputAvatar = document.getElementById('input-avatar');
      
    const compressH1 = document.getElementById('compress');

    const authorSchema = new normalizr.schema.Entity('author',{},{idAttribute: 'email'})

    const mensajeSchema = new normalizr.schema.Entity('mensaje', {
        author: authorSchema 
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
        
        item.innerHTML = `<span class="email-message">${data.author.email}</span> [<span class="date-message">${formatDate(data.fecha)}</span>] : <span class="text-message">${data.text}</span>`;
        showMessage.appendChild(item);
      })
    }
   
    function updateTitle(compressValue) {
      compressH1.innerHTML = compressValue; 
    }

    formMessage.addEventListener('submit', (event) => {
      event.preventDefault();
 
      let data = {
              "text":inputMessage.value, 
              "author":{
                  "email":inputEmail.value,
                  "nombre":inputNombre.value,
                  "apellido":inputApellido.value,
                  "edad":inputEdad.value,
                  "alias":inputAlias.value,
                  "avatar":inputAvatar.value
          }};

      socket.emit('nuevo-mensaje', data);
      inputMessage.value = '';
      inputMessage.focus();
    })
   
    socket.on('connect', () => {
      console.log('Conectados al servidor');
    });
  
    socket.on('inicio', (normMensj) => { 

      const denormMensj = normalizr.denormalize(normMensj, mensajesSchema)
      messages = denormMensj.mensajes 
      updateMessages(mensajes);

      const originalSize = JSON.stringify(denormMensj).length
      const normalizedSize = JSON.stringify(normMensj).length
      const compressValue = (normalizedSize * 100) / originalSize
 
      updateTitle(compressValue);
    });
  
    socket.on('notificacion-mensaje', (data) => {
      mensajes.push(data);
      updateMessages(mensajes);
    });
 
    
  })();