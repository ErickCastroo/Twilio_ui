import axios from 'axios'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Modal } from '@/components/Modal'
import { ModalC } from '@/components/ModalContent'
import { DrawerDemo } from '@/components/Drawer'


type Empleado = {
  nombre: string
  correo?: string
  telefono: string
  saldoPendiente: string
  fechaCorte: string
}

/**
 * Componente principal para la gestión de mensajes a empleados.
 * Permite buscar, seleccionar, y enviar mensajes personalizados o predeterminados a los empleados.
 */
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Empleado | null>(null)  // Usamos Empleado en lugar de any
  const [search, setSearch] = useState('')
  const [selectedEmployees, setSelectedEmployees] = useState<Empleado[]>([])  // Usamos Empleado en lugar de any[]
  
  /**
   * Lista de empleados con información relevante para el envío de mensajes.
   */
  const empleados: Empleado[] = [
    { nombre: 'Erick Castro', correo: 'castrocamachoerickmiguel21@gmail.com', telefono: '+526313446741', saldoPendiente: '100', fechaCorte: '2023-10-01' },
    { nombre: 'Juan Perez', correo: 'example@gmail.com', telefono: '+526313421421', saldoPendiente: '150', fechaCorte: '2023-10-05' },
    { nombre: 'Maria Hernandez', correo: 'example@gmail.com', telefono: '+526313421422', saldoPendiente: '200', fechaCorte: '2023-10-10' },
    { nombre: 'Pedro Sanchez', correo: 'example@gmail.com', telefono: '+526313421423', saldoPendiente: '250', fechaCorte: '2023-10-15' },
    { nombre: 'Lolita Lopez', correo: 'example@hotmail.com', telefono: '+526311263636', saldoPendiente: '300', fechaCorte: '2023-10-20' },
  ]
  
  /**
   * Abre el modal con la información del empleado seleccionado.
   * 
   * @param empleado - El empleado seleccionado para ver más detalles.
   */
  const openModal = (empleado: Empleado) => {  // Usamos Empleado en lugar de any
    setSelectedEmployee(empleado)
    setIsModalOpen(true)
  }
  
  /**
   * Cierra el modal y resetea la información del empleado seleccionado.
   */
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEmployee(null)
  }
  
  const filteredEmployees = empleados.filter((empleado) =>
    [empleado.nombre, empleado.telefono].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  )
  
  /**
   * Alterna la selección de un empleado en la lista.
   * 
   * @param empleado - El empleado a ser seleccionado o deseleccionado.
   */
  const toggleEmployeeSelection = (empleado: Empleado) => {  // Usamos Empleado en lugar de any
    setSelectedEmployees((prevState) => {
      const isSelected = prevState.some((emp) => emp.telefono === empleado.telefono)
      return isSelected ? prevState.filter((emp) => emp.telefono !== empleado.telefono) : [...prevState, empleado]
    })
  }
  
  /**
   * Alterna la selección de todos los empleados en la lista filtrada.
   */
  const toggleSelectAll = () => {
    setSelectedEmployees(
      selectedEmployees.length === filteredEmployees.length ? [] : filteredEmployees
    )
  }
  
  /**
   * Envía mensajes a los empleados seleccionados.
   * 
   * Realiza una petición al backend para enviar los mensajes y maneja las respuestas,
   * mostrando notificaciones de éxito o error según corresponda.
   * 
   * @param empleadosParaEnviar - Lista de empleados a los que se les enviará el mensaje.
   * @param mensajePersonalizado - Mensaje personalizado para los empleados seleccionados.
   * @param mensajeSeleccionado - Identificador del mensaje predefinido seleccionado.
   */
  const sendMessages = async (empleadosParaEnviar: Empleado[], mensajePersonalizado: string, mensajeSeleccionado: string) => {  // Usamos Empleado en lugar de any
    if (empleadosParaEnviar.length === 0) {
      toast.error('No hay empleados seleccionados')
      console.error('Error: No hay empleados seleccionados')
      return
    }
    try {
      const response = await axios.post('http://localhost:3000/sendmessage', {
        empleados: empleadosParaEnviar,
        mensajePersonalizado,
        mensajeSeleccionado,
      })

      response.data.detalles.forEach((detalle: { empleado: string, status: string, mensaje: string, error?: string }) => {  // Define los detalles explícitamente
        if (detalle.status === 'enviado') {
          toast.success(`Mensaje enviado a ${detalle.empleado}`)
          console.log(`Mensaje enviado a ${detalle.empleado}`)
          console.log(`Mensaje enviado: ${detalle.mensaje}`)
        } else {
          toast.error(`Error al enviar a ${detalle.empleado}: ${detalle.error}`)
          console.error(`Error al enviar a ${detalle.empleado}: ${detalle.error}`)
        }
      })
    } catch (error) {
      toast.error('Error al enviar mensajes')
      console.error('Error en la petición:', error)
    }
  }
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-4xl mx-auto'>
      <img className='relative w-15 h-14 mb-2' src="./img/logooomapas.png" alt="logo Oomapas" />
      <Toaster position='top-right' />
      <h1 className='text-3xl font-semibold mb-4 text-[#ffffff]'>Gestión de Mensajes</h1>
      <div className='w-full shadow-xl rounded-lg p-6 mb-4 bg-bgSecundario'>
        <div className='flex flex-row items-center gap-2'>
          <input
            type='text'
            placeholder='Buscar empleados por nombre o teléfono'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full md:w-3/4 p-2 border border-[#eeeeee] rounded-lg text-[#424242]'
          />
          <DrawerDemo sendMessages={sendMessages} selectedEmployees={selectedEmployees} />
        </div>
      </div>

      <div className='w-full shadow-xl rounded-lg p-6 overflow-x-auto bg-bgSecundario'>
        <Table className='border-collapse w-full border-[#eeeeee]'>
          <TableCaption className='text-lg font-semibold text-[#bdbcbc] mb-4'>
            Nogales Sonora - OOMAPAS
          </TableCaption>
          <TableHeader>
            <TableRow className=''>
              <TableHead className='w-[50px] p-4 text-lg text-center'>
                <input
                  type='checkbox'
                  checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className='p-4 text-lg text-white'>Nombre</TableHead>
              <TableHead className='p-4 text-lg text-white'>Correo</TableHead>
              <TableHead className='p-4 text-lg text-white'>Teléfono</TableHead>
              <TableHead className='p-4 text-lg text-white'>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((empleado, index) => (
                <TableRow key={index} className='border-b hover:bg-[#141961]'>
                  <TableCell className='p-4 text-base text-center'>
                    <input
                      type='checkbox'
                      checked={selectedEmployees.some((emp) => emp.telefono === empleado.telefono)}
                      onChange={() => toggleEmployeeSelection(empleado)}
                    />
                  </TableCell>
                  <TableCell className='p-4 text-base font-medium text-white'>{empleado.nombre}</TableCell>
                  <TableCell className='p-4 text-base text-white'>{empleado.correo}</TableCell>
                  <TableCell className='p-4 text-base text-white'>{empleado.telefono}</TableCell>
                  <TableCell className='p-4 text-base'>
                    <button
                      onClick={() => openModal(empleado)}
                      className='bg-[#4caf50] hover:bg-[#43a047] text-white px-3 py-1 rounded-lg transition-all'
                    >
                      Más
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className='text-center p-6 text-[#bdbdbd]'>
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEmployee && <ModalC sendMessages={sendMessages} empleado={selectedEmployee} />}
      </Modal>
    </div>
  )
}

export { App }
