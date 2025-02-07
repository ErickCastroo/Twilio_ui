/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

function DrawerDemo({ sendMessages, selectedEmployees }: { sendMessages: (empleadosParaEnviar: any[]) => void, selectedEmployees: any[] }) {
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('value1');

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== 'value1') {
      setMessage('Este mensaje no es editable. Seleccione la opción "Mensaje customizado".');
    } else {
      setMessage('');
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="w-full">Enviar mensajes</button>
      </DrawerTrigger>
      <DrawerContent className="bg-white dark:bg-gray-800 p-4">
        <DrawerHeader>
          <DrawerTitle>Enviar Mensajes</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Mensajes predeterminados</h2>
          <select
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="value1">Enviar mensaje customizado</option>
            <option value="value2">Descuento</option>
            <option value="value3">Aviso</option>
          </select>

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
            <p className="text-sm text-gray-500 mt-1">
              <span className={message.length > 160 ? 'text-red-500 font-bold' : 'text-black'}>
                {message.length <= 160
                  ? `${message.length} caracteres`
                  : `Te estás pasando de ${Math.ceil(message.length / 160) - 1} mensaje${Math.ceil(message.length / 160) - 1 > 1 ? 's' : ''}`}
              </span>
            </p>
          </div>
          <button
            onClick={() => sendMessages(selectedEmployees)}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            Enviar mensaje
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { DrawerDemo };
