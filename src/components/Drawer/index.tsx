/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from 'sonner';

function DrawerDemo({ sendMessages, selectedEmployees }: {
  sendMessages: (empleadosParaEnviar: any[], mensajePersonalizado: string, mensajeSeleccionado: string) => void;
  selectedEmployees: any[];
}) {
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('value1');

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    // Limpiamos el mensaje personalizado cuando se selecciona una opción predeterminada
    if (event.target.value !== 'value1') {
      setMessage(''); // Limpiamos el textarea
    }
  };

  const handleSendMessages = () => {
    // Si la opción seleccionada no es "Mensaje customizado", no usamos el mensaje del textarea
    const mensajePersonalizado = selectedOption === 'value1' ? message : '';
    sendMessages(selectedEmployees, mensajePersonalizado, selectedOption);
    toast.success(`Mensaje enviado a todos los usuarios seleccionados`)
  };

  return (
    <Drawer>
      <DrawerTrigger className=" md:w-1/4 p-2 rounded-lg hover:bg-slate-200 text-bgSecundario bg-white h-full">
        Enviar
      </DrawerTrigger>
      <DrawerContent className="flex w-full items-center bg-bgSecundario dark:bg-gray-800 p-4">
        <div className='w-full sm:w-1/2 '>
          <DrawerHeader className='w-full'>
            <DrawerTitle className='text-white'>Enviar Mensajes a los seleccionados</DrawerTitle>
          </DrawerHeader>
          <form className="w-full p-4">
            <h2 className="text-lg font-semibold text-white">Mensajes predeterminados</h2>
            <select
              className="w-full p-2 mt-2 border border-gray-300  rounded-lg"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="value1">Enviar mensaje customizado</option>
              <option value="descuento">Descuento</option>
              <option value="aviso">Aviso</option>
              
            </select>

            <div className="w-full my-6">
              <h2 className="text-lg font-semibold text-white">Mensaje personalizado</h2>
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
              <p className="text-sm text-white mt-1">
                <span className={message.length > 160 ? 'text-red-500 font-bold' : 'text-white'}>
                  {message.length <= 160
                    ? `${message.length} caracteres`
                    : `Te estás pasando de ${Math.ceil(message.length / 160) - 1} mensaje${Math.ceil(message.length / 160) - 1 > 1 ? 's' : ''}`}
                </span>
              </p>
            </div>
            <button
              onClick={handleSendMessages}

              className=" bg-white hover:hover:bg-slate-200 text-bgSecundario px-4 py-2 rounded-lg transition-all"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { DrawerDemo };