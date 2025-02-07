/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

function ModalC({ empleado }: { empleado: any }) {
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('value1');

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="flex-row flex mb-2 gap-1">
        <h1 className="text-xl font-bold">{empleado.nombre}</h1>
        <span className="text-xl font-semibold">{empleado.telefono}</span>
      </div>

      <p>{empleado.email ?? 'Sin correo disponible'}</p>
      <hr className="h-0.5 my-2 bg-gray-400 border-0 rounded-lg dark:bg-gray-700" />

      <div className="my-6">
        <h2 className="text-lg font-semibold">Mensajes predeterminados</h2>
        <select
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="value1">Enviar mensaje customizado</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>

      <div className="my-6">
        <h2 className="text-lg font-semibold">Mensaje personalizado</h2>
        <textarea
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto"
          placeholder={
            selectedOption === 'value1'
              ? 'Escribe tu mensaje aquí'
              : 'Este mensaje no es editable. Seleccione la opción "Mensaje customizado".'
          }
          rows={5}
          value={message}
          onChange={handleMessageChange}
          disabled={selectedOption !== 'value1'}

        />
        {/* Mostrar la cantidad de caracteres */}
        <p className="text-sm text-gray-500 mt-1">
          <span className={message.length > 160 ? 'text-red-500 font-bold' : 'text-black'}>
            {message.length <= 160
              ? `${message.length} caracteres`
              : `Te estás pasando de ${Math.ceil(message.length / 160) - 1} mensaje${Math.ceil(message.length / 160) - 1 > 1 ? 's' : ''}`}
          </span>
        </p>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            Enviar mensaje
          </button>
        </div>
      </div>
    </>
  );
}
export { ModalC };