import React, { useState } from "react";

function Menu() {
  const productos = [
    { numero: 1, nombre: "Pizza especial", precio: 289 },
    { numero: 2, nombre: "Pizza campesina", precio: 289 },
    { numero: 3, nombre: "Pizza Pancho Villa", precio: 289 },
    { numero: 4, nombre: "Pizza norteña", precio: 320 },
    { numero: 5, nombre: "Pizza chicken-bufalo", precio: 289 },
    { numero: 6, nombre: "Spaggetti de la casa", precio: 179 },
    { numero: 7, nombre: "Spaggetti con crema", precio: 175 },
    { numero: 8, nombre: "Spaggetti con chorizo", precio: 179 },
    { numero: 9, nombre: "Spaggetti de la casa", precio: 289 },
    { numero: 10, nombre: "Boneless naturales", precio: 175 },
    { numero: 11, nombre: "Boneless Búfalo", precio: 175 },
    { numero: 12, nombre: "Boneless Mango habanero", precio: 179 },
    { numero: 14, nombre: "Boneless BBQ", precio: 179 },
    { numero: 15, nombre: "Boneless Mango habanero", precio: 179 },
    { numero: 14, nombre: "Boneless BBQ", precio: 179 },
    { numero: 15, nombre: "Papas fritas CH", precio: 110 },
    { numero: 15, nombre: "Papas fritas G", precio: 165 },
    { numero: 16, nombre: "Agua natural", precio: 28 },
    { numero: 17, nombre: "Coca cola", precio: 28 },
    { numero: 18, nombre: "Fanta Uva", precio: 28 },
    { numero: 19, nombre: "Fanta Fresa", precio: 28 },
    { numero: 20, nombre: "Fanta Naranja", precio: 28 },
    { numero: 21, nombre: "Manzanita", precio: 28 },
    { numero: 22, nombre: "Spaggetti con crema", precio: 28 },
  ];

  const [ordenActual, setOrdenActual] = useState(1); // Variable para mantener el número de la orden actual
  const [ordenes, setOrdenes] = useState({}); // Estado para mantener las órdenes activas
  const [preciosTotales, setPreciosTotales] = useState({});

  const agregarProducto = (numeroOrden, numeroProducto) => {
    const productoEncontrado = productos.find(
      (producto) => producto.numero === numeroProducto
    );
    if (productoEncontrado) {
      setOrdenes((prevOrdenes) => {
        const newOrdenes = { ...prevOrdenes };
        if (!newOrdenes[numeroOrden]) {
          newOrdenes[numeroOrden] = [];
        }
        newOrdenes[numeroOrden].push(productoEncontrado);
        console.log("Producto agregado:", productoEncontrado);
        return newOrdenes;
      });
    } else {
      console.log("El producto no existe");
    }
  };

  const eliminarProducto = (numeroOrden, indice) => {
    setOrdenes((prevOrdenes) => {
      const newOrdenes = { ...prevOrdenes };
      newOrdenes[numeroOrden] = newOrdenes[numeroOrden].filter(
        (_, index) => index !== indice
      );
      console.log(
        "Producto eliminado en la orden",
        numeroOrden,
        "índice",
        indice
      );
      return newOrdenes;
    });
  };

  const agregarOrden = () => {
    const nuevaOrden = ordenes[ordenActual];

    if (!nuevaOrden || nuevaOrden.length > 0) {
      if (Object.keys(ordenes).length < 6) {
        setOrdenes((prevOrdenes) => {
          const newOrdenes = { ...prevOrdenes };
          newOrdenes[ordenActual + 1] = [];
          console.log("Orden agregada:", ordenActual + 1);
          return newOrdenes;
        });
        setOrdenActual((prevOrden) => prevOrden + 1);
      } else {
        alert("No se pueden agregar más órdenes. Máximo 6 órdenes.");
      }
    } else {
      alert("No se puede agregar una orden vacía.");
    }
  };

  const eliminarOrden = (numeroOrden) => {
    setOrdenes((prevOrdenes) => {
      const newOrdenes = { ...prevOrdenes };
      delete newOrdenes[numeroOrden];
      console.log("Orden eliminada:", numeroOrden);
      return newOrdenes;
    });
  };

  const calcularPrecioTotal = (numeroOrden) => {
    const productosOrden = ordenes[numeroOrden];
    const precioTotal = productosOrden.reduce(
      (total, producto) => total + producto.precio,
      0
    );
    alert(`El precio total de la orden ${numeroOrden} es: $${precioTotal}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Número de Producto
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Precio
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {productos.map((producto, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{producto.numero}</td>
              <td className="px-6 py-4 whitespace-nowrap">{producto.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${producto.precio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-orange-600 p-2 rounded text-white hover:bg-orange-700"
                  onClick={() => agregarProducto(ordenActual, producto.numero)}
                >
                  Agregar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-green-500 p-2 text-white rounded hover:bg-green-300 m-4"
        onClick={agregarOrden}
      >
        Agregar Orden
      </button>

      <div>
        {Object.entries(ordenes).map(([numeroOrden, productosOrden]) => (
          <div key={numeroOrden}>
            <h2 className="bold text-orange-500 ml-4">Orden {numeroOrden}</h2>
            <table className="min-w-full bg-white border divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productosOrden.map((producto, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {producto.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${producto.precio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-red-600 p-2 rounded text-white hover:bg-red-700"
                        onClick={() => eliminarProducto(numeroOrden, index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="bg-blue-500 p-2 text-white rounded hover:bg-blue-300"
              onClick={() => calcularPrecioTotal(numeroOrden)}
            >
              Calcular Precio Total
            </button>

            <button
              className="bg-red-600 p-2 rounded text-white hover:bg-red-700 m-4"
              onClick={() => eliminarOrden(numeroOrden)}
            >
              Eliminar Orden
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
