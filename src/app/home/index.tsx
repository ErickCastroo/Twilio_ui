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

function App() {

  //data de empleados simula una base de datos
  const [empleados] = useState([
    { nombre: 'Erick Castro', monto: 1200, sueldoDisponible: 2000, telefono: '+526313446741' },
    { nombre: 'Lolita Lopez', monto: 1800, sueldoDisponible: 2000, telefono: '+526311263636' },
    { nombre: 'Juan Perez', monto: 1500, sueldoDisponible: 2000, telefono: '+526313421421' },
    { nombre: 'Maria Hernandez', monto: 1000, sueldoDisponible: 2000, telefono: '+526313421421' },
    { nombre: 'Pedro Sanchez', monto: 2000, sueldoDisponible: 2000, telefono: '+526313421421' },
  ])


  //manejo de estados para la busqueda y seleccion de empleados
  const [search, setSearch] = useState('')
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([])

  //funcion para filtrar empleados por nombre y telefono
  const filteredEmployees = empleados.filter((empleado) =>
    [empleado.nombre, empleado.telefono].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  )

  //funcion para seleccionar empleados
  const toggleEmployeeSelection = (empleado: any) => {
    setSelectedEmployees((prevState) => {
      const isSelected = prevState.some((emp) => emp.telefono === empleado.telefono)
      if (isSelected) {
        return prevState.filter((emp) => emp.telefono !== empleado.telefono)
      }
      return [...prevState, empleado]
    })
  }

  //funcion para seleccionar todos los empleados
  const toggleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(filteredEmployees)
    }
  }

  //funcion para enviar mensajes a los empleados seleccion
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

  //renderizado de la aplicacion
  return (
    <div className='flex flex-col items-center p-6 w-full max-w-4xl mx-auto'>
      <Toaster position='top-right' />
      <input
        type='text'
        placeholder='Buscar por nombre o teléfono...'
        className='p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='flex gap-4 mb-4'>
        <button
          onClick={() => sendMessages(selectedEmployees)}
          className='bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all'
        >
          Enviar mensaje a seleccionados
        </button>
      </div>
      <div className='w-full bg-white shadow-lg rounded-lg p-6 overflow-x-auto'>
        <Table className='border-collapse w-full'>
          <TableCaption className='text-lg font-semibold mb-4'>
            Gestión de Empleados - OOMAPAS
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
              <TableHead className='p-4 text-lg'>Monto</TableHead>
              <TableHead className='p-4 text-lg'>Sueldo Disponible</TableHead>
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
                  <TableCell className='p-4 text-base'>${empleado.monto}</TableCell>
                  <TableCell className='p-4 text-base'>${empleado.sueldoDisponible}</TableCell>
                  <TableCell className='p-4 text-base'>{empleado.telefono}</TableCell>
                  <TableCell className='p-4 text-base'>
                    <button
                      onClick={() => sendMessages([empleado])}
                      className='bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-all'
                    >
                      Enviar mensaje
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
    </div>
  )
}

export { App }
