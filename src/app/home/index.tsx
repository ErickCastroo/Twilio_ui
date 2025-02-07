/* eslint-disable @typescript-eslint/no-explicit-any */
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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  const openModal = (empleado: any) => {
    setSelectedEmployee(empleado);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const [empleados] = useState([
    { nombre: 'Erick Castro', correo: 'castrocamachoerickmiguel21@gmail.com', telefono: '+526313446741' },
    { nombre: 'Juan Perez', correo: 'example@gmail.com', telefono: '+526313421421' },
    { nombre: 'Maria Hernandez', correo: 'example@gmail.com', telefono: '+526313421421' },
    { nombre: 'Pedro Sanchez', correo: 'example@gmail.com', telefono: '+526313421421' },
    { nombre: 'Lolita Lopez', correo: 'example@hotmail.com', telefono: '+526311263636' },
  ])

  const [search, setSearch] = useState('')
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([])

  const filteredEmployees = empleados.filter((empleado) =>
    [empleado.nombre, empleado.telefono].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  )

  const toggleEmployeeSelection = (empleado: any) => {
    setSelectedEmployees((prevState) => {
      const isSelected = prevState.some((emp) => emp.telefono === empleado.telefono)
      if (isSelected) {
        return prevState.filter((emp) => emp.telefono !== empleado.telefono)
      }
      return [...prevState, empleado]
    })
  }

  const toggleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(filteredEmployees)
    }
  }

  const sendMessages = async (empleadosParaEnviar: any[]) => {
    if (empleadosParaEnviar.length === 0) {
      toast.error('No hay empleados seleccionados')
      return
    }
    try {
      console.log('Enviando datos:', empleadosParaEnviar)
      const response = await axios.post('http://localhost:3000/sendmessage', {
        empleados: empleadosParaEnviar,
      })

      response.data.detalles.forEach((detalle: any) => {
        if (detalle.status === 'enviado') {
          toast.success(`Mensaje enviado a ${detalle.empleado}`)
        } else {
          toast.error(`Error al enviar a ${detalle.empleado}: ${detalle.error}`)
        }
      })

      console.log(response.data)
    } catch (error) {
      toast.error('Error al enviar mensajes')
      console.error('Error en la petición:', error)
    }
  }

  return (
    <div className='flex flex-col items-center p-6 w-full max-w-4xl mx-auto'>
      <Toaster position='top-right' />
      <h1 className='text-3xl font-semibold mb-4'>Gestión de Mensajes</h1>

      <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-4">
        <div className="flex flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Buscar empleados por nombre o teléfono"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" w-full md:w-3/4 p-2 border border-gray-300 rounded-lg "
          />
          <div className='w-full md:w-1/4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all'>
            <DrawerDemo sendMessages={sendMessages} selectedEmployees={selectedEmployees} />
          </div>
        </div>
      </div>
      <div className='w-full bg-white shadow-lg rounded-lg p-6 overflow-x-auto'>
        <Table className='border-collapse w-full'>
          <TableCaption className='text-lg font-semibold text-gray-500 mb-4'>
            Nogales Sonora - OOMAPAS
          </TableCaption>
          <TableHeader>
            <TableRow className='bg-slate-100'>
              <TableHead className='w-[50px] p-4 text-lg text-center'>
                <input
                  type='checkbox'
                  checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className='p-4 text-lg'>Nombre</TableHead>
              <TableHead className='p-4 text-lg'>Correo</TableHead>
              <TableHead className='p-4 text-lg'>Teléfono</TableHead>
              <TableHead className='p-4 text-lg'>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((empleado, index) => (
                <TableRow key={index} className='border-b hover:bg-gray-100'>
                  <TableCell className='p-4 text-base text-center'>
                    <input
                      type='checkbox'
                      checked={selectedEmployees.some((emp) => emp.telefono === empleado.telefono)}
                      onChange={() => toggleEmployeeSelection(empleado)}
                    />
                  </TableCell>
                  <TableCell className='p-4 text-base font-medium'>{empleado.nombre}</TableCell>
                  <TableCell className='p-4 text-base'>{empleado.correo}</TableCell>
                  <TableCell className='p-4 text-base'>{empleado.telefono}</TableCell>
                  <TableCell className='p-4 text-base'>
                    <button
                      onClick={() => openModal(empleado)}
                      className="hover:bg-blue-300 bg-blue-500 text-white px-3 py-1 rounded-lg transition-all"
                    >
                      Más
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className='text-center p-6 text-gray-500'>
                  No se encontraron empleados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEmployee && <ModalC empleado={selectedEmployee} />}
      </Modal>
    </div>
  )
}

export { App }
