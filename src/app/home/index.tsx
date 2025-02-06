import { useState } from 'react';
import axios from 'axios';

function App() {
  const [empleados] = useState([
    { nombre: 'Erick Castro', monto: 1200, sueldoDisponible: 2000, telefono: '+526313446741' }
  ]);

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3000/sendmessage');
      alert('Mensajes enviados con éxito');
      console.log(response.data);
    } catch (error) {
      alert('Hubo un error al enviar los mensajes');
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className='text-4xl text-slate-200'>Gestión de Empleados - OOMAPAS</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Monto</th>
            <th>Sueldo Disponible</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, index) => (
            <tr key={index}>
              <td>{empleado.nombre}</td>
              <td>{empleado.monto}</td>
              <td>{empleado.sueldoDisponible}</td>
              <td>{empleado.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={sendMessage}>Enviar Mensajes</button>
    </div>
  );
}

export { App }
