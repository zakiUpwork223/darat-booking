import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class GoogleMapsAPIService {
  constructor() {}

  async searchPlaces(query: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input: query,
            key: process.env.GOOGLE_MAP_API_KEY,
          },
        },
      );
      console.log('response', response);
      return response.data.predictions;
    } catch (error) {
      throw error;
    }
  }
}
