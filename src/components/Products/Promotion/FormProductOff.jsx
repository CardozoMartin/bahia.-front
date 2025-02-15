import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createProductOff, updateProductOff } from '../../../api/apiProductOffert';
import { Package, Upload, DollarSign, Box, Palette, Database, Image, FileText, Tag } from 'lucide-react';
import { toast } from 'sonner';


const FormProductOff = ({ product, onSubmitSuccess }) => {
  const isEditing = !!product;

  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: isEditing ? {
      nombre: product.nombre,
      precio: product.precio,
      precioAnterior: product.precioAnterior,
      descuento: product.descuento,
      descripcion: product.descripcion,
      material: product.material,
      color: product.color,
      stock: product.stock
    } : {}
  });

  // Watch precio and precioAnterior to calculate descuento
  const precio = watch('precio');
  const precioAnterior = watch('precioAnterior');

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (precioAnterior && precio) {
      const discount = ((precioAnterior - precio) / precioAnterior) * 100;
      return Math.round(discount * 100) / 100; // Round to 2 decimal places
    }
    return 0;
  };

  const queryClient = useQueryClient();

  const { mutate: postProductOff } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      // Add calculated discount if not provided
      const finalData = {
        ...data,
        descuento: data.descuento || calculateDiscount()
      };

      Object.keys(finalData).forEach(key => {
        if (key === 'imagen' && finalData[key][0]) {
          formData.append('imagen', finalData[key][0]);
        } else if (key !== 'imagen') {
          formData.append(key, finalData[key]);
        }
      });

      
      return createProductOff(formData);
    },
    onSuccess: () => {
      toast.success('Producto creado con éxito');
      reset();
      queryClient.invalidateQueries('productsoff');
      onSubmitSuccess?.();
    },
    onError: (e) => {
      console.error('Error completo:', e);
      toast.error('Error al crear el producto: ' + (e.message || 'Error desconocido'));
    },
  });

  const { mutate: putProductOff } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      const finalData = {
        ...data,
        descuento: data.descuento || calculateDiscount()
      };

      Object.keys(finalData).forEach(key => {
        if (key === 'imagen' && finalData[key][0]) {
          formData.append('imagen', finalData[key][0]);
        } else if (key !== 'imagen') {
          formData.append(key, finalData[key]);
        }
      });

      return updateProductOff(product.id, formData);
    },
    onSuccess: () => {
      toast.success('Producto editado con éxito');
      reset();
      queryClient.invalidateQueries('productsoff');
      onSubmitSuccess?.();
    },
    onError: (e) => {
      toast.error('Error al editar el producto: ' + (e.message || 'Error desconocido'));
    },
  });

  const handleSubmit = (data) => {
    
    if (isEditing) {
      putProductOff(data);
    } else {
      postProductOff(data);
    }
  };

  const InputWrapper = ({ label, icon: Icon, children, error, hint }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Icon size={16} className="text-gray-500" />
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
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
        {isEditing ? 'Editar' : 'Nuevo'} Producto en Oferta
      </h2>

      <form onSubmit={onSubmitRHF(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWrapper 
            label="Nombre del producto" 
            icon={Package} 
            error={errors.nombre?.message}
          >
            <input
              type="text"
              {...register('nombre', { 
                required: 'El nombre es requerido',
                minLength: { value: 4, message: 'Mínimo 4 caracteres' },
                maxLength: { value: 60, message: 'Máximo 60 caracteres' }
              })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Ej: Silla Ergonómica"
            />
          </InputWrapper>

          <InputWrapper 
            label="Precio Anterior" 
            icon={Tag}
            error={errors.precioAnterior?.message}
            hint="Precio original antes del descuento"
          >
            <input
              type="number"
              step="0.01"
              {...register('precioAnterior', { 
                required: 'El precio anterior es requerido',
                min: { value: 0, message: 'El precio debe ser positivo' }
              })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="0.00"
            />
          </InputWrapper>

          <InputWrapper 
            label="Precio con Descuento" 
            icon={DollarSign}
            error={errors.precio?.message}
          >
            <input
              type="number"
              step="0.01"
              {...register('precio', { 
                required: 'El precio es requerido',
                min: { value: 0, message: 'El precio debe ser positivo' },
                validate: value => !precioAnterior || value < precioAnterior || 'El precio con descuento debe ser menor al precio anterior'
              })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="0.00"
            />
          </InputWrapper>

          <InputWrapper 
            label="Descuento (%)" 
            icon={Tag}
            error={errors.descuento?.message}
            hint={`Descuento calculado: ${calculateDiscount()}%`}
          >
            <input
              type="number"
              step="0.01"
              {...register('descuento', { 
                required: 'El descuento es requerido',
                min: { value: 0, message: 'El descuento debe ser positivo' },
                max: { value: 100, message: 'El descuento no puede ser mayor a 100%' }
              })}
              defaultValue={calculateDiscount()}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="0"
            />
          </InputWrapper>

          <InputWrapper 
            label="Material" 
            icon={Box}
            error={errors.material?.message}
          >
            <input
              type="text"
              {...register('material', { required: 'El material es requerido' })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Ej: Madera"
            />
          </InputWrapper>

          <InputWrapper 
            label="Color" 
            icon={Palette}
            error={errors.color?.message}
          >
            <input
              type="text"
              {...register('color', { required: 'El color es requerido' })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Ej: Negro"
            />
          </InputWrapper>

          <InputWrapper 
            label="Stock" 
            icon={Database}
            error={errors.stock?.message}
          >
            <input
              type="number"
              {...register('stock', { 
                required: 'El stock es requerido',
                min: { value: 0, message: 'El stock no puede ser negativo' }
              })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="0"
            />
          </InputWrapper>

          <InputWrapper 
            label="Imagen del producto" 
            icon={Image}
            error={errors.imagen?.message}
          >
            <div className="relative">
              <input
                type="file"
                {...register('imagen', {
                  required: !isEditing ? 'La imagen es requerida' : false
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
            <InputWrapper 
              label="Descripción" 
              icon={FileText}
              error={errors.descripcion?.message}
            >
              <textarea
                {...register('descripcion', { 
                  required: 'La descripción es requerida',
                  minLength: { value: 10, message: 'La descripción debe tener al menos 10 caracteres' }
                })}
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

export default FormProductOff;