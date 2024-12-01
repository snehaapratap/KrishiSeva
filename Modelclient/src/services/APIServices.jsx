import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const recommendCrop = async (cropData) => {
  try {
    const response = await axios.post(`${API_URL}/recommend`, cropData);
    return response.data;
  } catch (error) {
    console.error('Error recommending crop:', error);
    throw error;
  }
};