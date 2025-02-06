import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
// import Layout from '@/components/Layout';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function App() {
  const [empleados] = useState([
    { nombre: 'Erick Castro', monto: 1200, sueldoDisponible: 2000, telefono: '+526313446741' },
    { nombre: 'Juan Perez', monto: 1500, sueldoDisponible: 2000, telefono: '+526313421421' },
    { nombre: 'Maria Hernandez', monto: 1000, sueldoDisponible: 2000, telefono: '+526313421421' },
    { nombre: 'Pedro Sanchez', monto: 2000, sueldoDisponible: 2000, telefono: '+526313421421' },
  ]);

  const [search, setSearch] = useState("");
  const filteredEmployees = empleados.filter((empleado) =>
    [empleado.nombre, empleado.telefono].some((field) => field.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  );


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessage = async (empleado: any) => {
    try {
      const response = await axios.post('http://localhost:3000/sendmessage', {
        nombre: empleado.nombre,
        monto: empleado.monto,
        sueldoDisponible: empleado.sueldoDisponible,
        telefono: empleado.telefono,
      });

      toast.success(`Mensaje enviado a ${empleado.nombre} con éxito`);
      console.log(response.data);
    } catch (error) {
      toast.error(`Hubo un error al enviar el mensaje a ${empleado.nombre}`);
      console.error(error);
    }
  };



  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Toaster position="top-right"/>

      <div className="flex flex-col items-center p-4 w-full max-w-4xl"> {/* Ajusta max-w-4xl según sea necesario */}
        <input
          type="text"
          placeholder="Buscar por nombre, correo o teléfono..."
          className="p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="w-full bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
          <Table className="border-collapse w-full">
            <TableCaption className="text-lg font-semibold mb-4">
              Gestión de Empleados - OOMAPAS
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead className="w-[100px] p-4 text-lg">Nombre</TableHead>
                <TableHead className="p-4 text-lg">Monto</TableHead>
                <TableHead className="p-4 text-lg">Sueldo Disponible</TableHead>
                <TableHead className="p-4 text-lg">Teléfono</TableHead>
                <TableHead className="p-4 text-lg text-center">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((empleado, index) => (
                  <TableRow key={index} className="border-b hover:bg-gray-100">
                    <TableCell className="p-4 text-base font-medium">{empleado.nombre}</TableCell>
                    <TableCell className="p-4 text-base">{empleado.monto}</TableCell>
                    <TableCell className="p-4 text-base">{empleado.sueldoDisponible}</TableCell>
                    <TableCell className="p-4 text-base">{empleado.telefono}</TableCell>
                    <TableCell className="p-4 text-center">
                      <button
                        onClick={() => sendMessage(empleado)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                      >
                        Enviar mensaje
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-6 text-gray-500">
                    No se encontraron empleados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export { App }
