/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Modal } from '@/components/Modal';
import { ModalC } from '@/components/ModalContent';
import { DrawerDemo } from '@/components/Drawer';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);

  const empleados = [
    { nombre: 'Erick Castro', correo: 'castrocamachoerickmiguel21@gmail.com', telefono: '+526313446741', saldoPendiente: '100', fechaCorte: '2023-10-01' },
    { nombre: 'Juan Perez', correo: 'example@gmail.com', telefono: '+526313421421', saldoPendiente: '150', fechaCorte: '2023-10-05' },
    { nombre: 'Maria Hernandez', correo: 'example@gmail.com', telefono: '+526313421422', saldoPendiente: '200', fechaCorte: '2023-10-10' },
    { nombre: 'Pedro Sanchez', correo: 'example@gmail.com', telefono: '+526313421423', saldoPendiente: '250', fechaCorte: '2023-10-15' },
    { nombre: 'Lolita Lopez', correo: 'example@hotmail.com', telefono: '+526311263636', saldoPendiente: '300', fechaCorte: '2023-10-20' },
  ];

  const openModal = (empleado: any) => {
    setSelectedEmployee(empleado);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = empleados.filter((empleado) =>
    [empleado.nombre, empleado.telefono].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const toggleEmployeeSelection = (empleado: any) => {
    setSelectedEmployees((prevState) => {
      const isSelected = prevState.some((emp) => emp.telefono === empleado.telefono);
      return isSelected ? prevState.filter((emp) => emp.telefono !== empleado.telefono) : [...prevState, empleado];
    });
  };

  const toggleSelectAll = () => {
    setSelectedEmployees(
      selectedEmployees.length === filteredEmployees.length ? [] : filteredEmployees
    );
  };

  const sendMessages = async (empleadosParaEnviar: any[], mensajePersonalizado: string, mensajeSeleccionado: string) => {
    if (empleadosParaEnviar.length === 0) {
      toast.error('No hay empleados seleccionados');
      console.error('Error: No hay empleados seleccionados');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/sendmessage', {
        empleados: empleadosParaEnviar,
        mensajePersonalizado,
        mensajeSeleccionado,
      });
  
      response.data.detalles.forEach((detalle: any) => {
        if (detalle.status === 'enviado') {
          toast.success(`Mensaje enviado a ${detalle.empleado}`);
          console.log(`Mensaje enviado a ${detalle.empleado}`);
          console.log(`Mensaje enviado: ${detalle.mensaje}`); // Aquí se mostrará el mensaje
        } else {
          toast.error(`Error al enviar a ${detalle.empleado}: ${detalle.error}`);
          console.error(`Error al enviar a ${detalle.empleado}: ${detalle.error}`);
        }
      });
    } catch (error) {
      toast.error('Error al enviar mensajes');
      console.error('Error en la petición:', error);
    }
  };

  return (
    <div className='flex flex-col items-center p-6 w-full max-w-4xl mx-auto'>
      <Toaster position='top-right' />
      <h1 className='text-3xl font-semibold mb-4'>Gestión de Mensajes</h1>

      <div className='w-full bg-white shadow-lg rounded-lg p-6 mb-4'>
        <div className='flex flex-row items-center gap-2'>
          <input
            type='text'
            placeholder='Buscar empleados por nombre o teléfono'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full md:w-3/4 p-2 border border-gray-300 rounded-lg'
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
                      className='hover:bg-blue-300 bg-blue-500 text-white px-3 py-1 rounded-lg transition-all'
                    >
                      Más
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className='text-center p-6 text-gray-500'>
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
  );
}

export { App };