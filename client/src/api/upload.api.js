import axios from 'axios';

export const getTasksRequest = async () => {
  return await axios.get("http://localhost:3000/api/upload");
}

export const deleteTaskRequest = async (id) => {
  await axios.delete(`http://localhost:3000/api/upload/${id}`);
};

export const deleteAllTasks = async (id) => {
  await axios.delete("http://localhost:3000/api/upload/");
};

export const uploadingtask = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('http://localhost:3000/api/upload', formData);

    console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error al enviar el archivo:', error.response.data.message);
    console.log('Código de Estado:', error.response.status);
    console.log('Detalles del error:', error.response.data);
    throw error;
  }
};
