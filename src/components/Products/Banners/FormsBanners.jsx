import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBanner, createBanner, deleteBanner } from '../../../api/apiBanner';

const FormsBanners = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const queryClient = useQueryClient();

  // Query para obtener los banners
  const {
    data: banners,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['banners'],
    queryFn: getBanner,
  });

  // Mutation para crear un banner
  const createBannerMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await createBanner(formData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('banners');
      setSelectedFile(null);
    },
    onError: (error) => {
      console.error('Error al crear el banner:', error);
    }
  });

  // Mutation para eliminar un banner
  const deleteBannerMutation = useMutation({
    mutationFn: (id) => deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries('banners');
    },
    onError: (error) => {
      console.error('Error al eliminar el banner:', error);
    }
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('imagen', selectedFile);
    createBannerMutation.mutate(formData);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este banner?')) {
      deleteBannerMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        Error al cargar los banners
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Formulario de subida */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Subir Nuevo Banner</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            disabled={!selectedFile || createBannerMutation.isPending}
            className={`w-full py-2 px-4 rounded font-medium text-white
              ${!selectedFile || createBannerMutation.isPending 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {createBannerMutation.isPending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Subiendo...
              </div>
            ) : (
              'Subir Banner'
            )}
          </button>
        </form>
      </div>

      {/* Visualización de banners */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Banners Actuales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners?.map((banner, index) => (
            <div key={banner._id || index} className="relative group">
              <img
                src={banner.imagen}
                alt={`Banner ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              />
              <button
                onClick={() => handleDelete(banner._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormsBanners;