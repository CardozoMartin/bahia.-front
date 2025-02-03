import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, updateProduct } from '../../../api/apiProduct';
import { toast } from 'sonner';
import { Upload, Package, DollarSign, FileText, Palette, Box, Database, Image } from 'lucide-react';

const FormProducts = ({ isEditing, product, onSubmitSuccess }) => {
  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditing ? {
      ...product,
      imagen: undefined // Reset imagen field since we can't set a file input value
    } : {}
  });

  const queryClient = useQueryClient();

  const { mutate: postProduct } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'imagen' && data[key][0]) {
          formData.append('imagen', data[key][0]);
        } else if (key !== 'imagen') {
          formData.append(key, data[key]);
        }
      });
      return createProduct(formData);
    },
    onSuccess: () => {
      toast.success('Producto creado con éxito');
      reset();
      queryClient.invalidateQueries('product');
      onSubmitSuccess?.();
    },
    onError: (e) => {
      toast.error('Error al crear el producto: ' + (e.message || 'Error desconocido'));
    },
  });

  const { mutate: putProduct } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'imagen' && data[key][0]) {
          formData.append('imagen', data[key][0]);
        } else if (key !== 'imagen') {
          formData.append(key, data[key]);
        }
      });
      return updateProduct(product.id, formData);
    },
    onSuccess: () => {
      toast.success('Producto editado con éxito');
      reset();
      queryClient.invalidateQueries('product');
      onSubmitSuccess?.();
    },
    onError: (e) => {
      toast.error('Error al editar el producto: ' + (e.message || 'Error desconocido'));
    },
  });

  const handleSubmit = (data) => {
    if (isEditing) {
      putProduct(data);
    } else {
      postProduct(data);
    }
  };

  const InputWrapper = ({ label, icon: Icon, children, error }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Icon size={16} className="text-gray-500" />
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Package className="text-indigo-600" />
        {isEditing ? 'Editar' : 'Nuevo'} Producto
      </h2>

      <form onSubmit={onSubmitRHF(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWrapper label="Nombre del producto" icon={Package} error={errors.nombre?.message}>
            <input
              type="text"
              {...register('nombre', { required: true, minLength: 4, maxLength: 60 })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Ej: Silla Ergonómica"
            />
          </InputWrapper>

          <InputWrapper label="Precio" icon={DollarSign} error={errors.precio?.message}>
            <input
              type="number"
              step="0.01"
              {...register('precio', { required: true, min: 0 })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="0.00"
            />
          </InputWrapper>

          <InputWrapper label="Material" icon={Box} error={errors.material?.message}>
            <input
              type="text"
              {...register('material', { required: true })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Ej: Madera"
            />
          </InputWrapper>

          <InputWrapper label="Color" icon={Palette} error={errors.color?.message}>
            <input
              type="text"
              {...register('color', { required: true })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Ej: Negro"
            />
          </InputWrapper>

          <InputWrapper label="Stock" icon={Database} error={errors.stock?.message}>
            <input
              type="number"
              {...register('stock', { required: true, min: 0 })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="0"
            />
          </InputWrapper>

          <InputWrapper label="Imagen del producto" icon={Image} error={errors.imagen?.message}>
            <div className="relative">
              <input
                type="file"
                {...register('imagen', {
                  required: !isEditing // Only required for new products
                })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {isEditing && (
                <p className="mt-1 text-sm text-gray-500">
                  Deja este campo vacío si no deseas cambiar la imagen actual
                </p>
              )}
            </div>
          </InputWrapper>

          <div className="md:col-span-2">
            <InputWrapper label="Descripción" icon={FileText} error={errors.descripcion?.message}>
              <textarea
                {...register('descripcion', { required: true, minLength: 10 })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                rows="4"
                placeholder="Describe el producto..."
              />
            </InputWrapper>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
          >
            <Upload size={18} />
            {isEditing ? 'Actualizar' : 'Crear'} Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProducts;