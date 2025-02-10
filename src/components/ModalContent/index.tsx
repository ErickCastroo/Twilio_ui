import { useState } from 'react'

// Definimos el tipo de "Empleado"
interface Empleado {
  nombre: string
  telefono: string
  saldoPendiente: string
  fechaCorte: string
  correo?: string // Opcional, ya que no todos los empleados tienen un correo disponible
}

/**
 * Componente para gestionar el envío de mensajes a empleado seleccionado.
 * Este componente presenta un modal con un formulario para seleccionar y personalizar mensajes.
 */
function ModalC({ sendMessages, empleado }: {
  sendMessages: (empleadosParaEnviar: Empleado[], mensajePersonalizado: string, mensajeSeleccionado: string) => void
  empleado: Empleado // Ahora se usa el tipo de empleado en lugar de "any"
}) {
  const [message, setMessage] = useState<string>('') // Especificamos que el estado es un string
  const [selectedOption, setSelectedOption] = useState<string>('value1') // Especificamos que el estado es un string

  /**
   * Maneja el cambio en el contenido del campo de mensaje personalizado.
   * 
   * @param event - El evento de cambio que contiene el nuevo valor del campo de texto.
   */
  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  /**
   * Maneja el cambio en la opción seleccionada del mensaje.
   * Si se selecciona una opción diferente a "Mensaje customizado", se limpia el mensaje.
   * 
   * @param event - El evento de cambio que contiene el nuevo valor de la opción seleccionada.
   */
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
    // Limpiamos el mensaje personalizado cuando se selecciona una opción predeterminada
    if (event.target.value !== 'value1') {
      setMessage('') // Limpiamos el textarea
    }
  }

  /**
   * Envía el mensaje a los empleados seleccionados, utilizando el mensaje personalizado o el predeterminado.
   */
  const handleSendMessage = () => {
    // Si la opción seleccionada no es "Mensaje customizado", no usamos el mensaje del textarea
    const mensajePersonalizado = selectedOption === 'value1' ? message : ''
    sendMessages([empleado], mensajePersonalizado, selectedOption)
  }

  return (
    <>
      <div className="flex-row flex mb-2 gap-1">
        <h1 className="text-xl font-bold text-white">{empleado.nombre}</h1>
        <span className="text-xl font-semibold text-white">{empleado.telefono}</span>
      </div>

      <p className='text-white'>{empleado.correo ?? 'Sin correo disponible'}</p>
      <hr className="h-0.5 my-2 bg-gray-400 border-0 rounded-lg dark:bg-gray-700" />

      <div className="my-6">
        <h2 className="text-lg font-semibold text-white">Mensajes predeterminados</h2>
        <select
          className="w-full p-2 mt-2 border  border-gray-300 rounded-lg"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="value1">Enviar mensaje customizado</option>
          <option value="descuento">Descuento</option>
          <option value="aviso">Aviso</option>
        </select>
      </div>

      <div className="my-6">
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
        <p className="text-sm text-gray-500 mt-1">
          <span className={message.length > 160 ? 'text-red-500 font-bold' : 'text-white'}>
            {message.length <= 160
              ? `${message.length} caracteres`
              : `Te cobraran el valor de ${Math.ceil(message.length / 160) - 1} mensaje${Math.ceil(message.length / 160) - 1 > 1 ? 's' : ''}`}
          </span>
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSendMessage}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            Enviar mensaje
          </button>
        </div>
      </div>
    </>
  )
}

export { ModalC }
