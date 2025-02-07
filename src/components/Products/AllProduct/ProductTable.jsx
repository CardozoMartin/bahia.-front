import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../api/apiProduct';
import ProductTableRow from './ProductTableRow';

const ProductsTable = () => {
    const {
        data: products,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
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
                    {products?.map((product, index) => (
                        <ProductTableRow
                            key={product.id}
                            product={product}
                            index={index}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTable;