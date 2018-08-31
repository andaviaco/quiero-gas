
import qs from 'query-string';


const API_URL = 'http://192.168.0.42:3000';

export async function getStations({ lat, lng, limit = 50 }) {
  const params = qs.stringify({
    lat,
    lng,
    limit,
  });

  try {
    const response = await fetch(`${API_URL}/stations/?${params}`);

    return await response.json();
  } catch (error) {
    console.log('MTS');

    console.error(error);
    throw error;
  }
}

export default {
  getStations,
};