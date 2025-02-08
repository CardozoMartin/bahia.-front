import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProductsOff } from '../../../api/apiProductOffert';
import ProductTableOffRow from './ProductTableOffRow';


const ProductsTableOff = () => {
    const {
        data: productsoff,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['productsoff'],
        queryFn: getProductsOff
    });



    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="text-gray-600">Cargando productos...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="text-red-600">
                    Error al cargar productos: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Material
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Color
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {productsoff?.map((productsoff, index) => (
                        <ProductTableOffRow
                            key={productsoff.id}
                            productsoff={productsoff}
                            index={index}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTableOff;