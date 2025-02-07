import React from 'react';
import { useProduct } from '../../../store/useProduct';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../../api/apiProduct';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ProductTableRow = ({ product, index, onEdit, onDelete }) => {
    const { setProductToEdit } = useProduct();
    const queryClient = useQueryClient();
    const handleEdit = () => {
        setProductToEdit(product);
       
      };
      const { mutate: deleteProductoFn } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
          Swal.close();
          toast.success('Producto eliminado');
    
          queryClient.invalidateQueries('products');
        },
        onError: (e) => {
          Swal.close();
          toast.error(e.message);
        },
      });


      const handleDelete = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: `Estás por eliminar irreversiblemente el blog "${product.nombre}"`,
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar',
          cancelButtonText: 'No',
        }).then((res) => {
          if (res.isConfirmed) {
            Swal.showLoading();
            deleteProductoFn(product._id);
          }
        });
      };
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {index}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.nombre}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${product.precio}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.stock}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.material}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.color}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <button 
            className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 sm:px-4 sm:py-2"
            onClick={handleEdit}
          >
            Editar
          </button>
          <button 
            className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 sm:px-4 sm:py-2"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;