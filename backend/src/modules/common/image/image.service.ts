import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { v2 } from 'cloudinary';

export class ImageService {
  async uploadFile(image, public_id = ''): Promise<{ url: string }> {
    try {
      const imageUrl = await this.uploadImage(image, public_id);
      return { url: imageUrl };
    } catch (error) {
      throw error;
    }
  }

  uploadImage(image, public_id = ''): Promise<string> {
    try {
      if (!image) throw new ForbiddenException('Credential Incorrect!');

      return new Promise((resolve, reject) => {
        const uploadStream = v2.uploader.upload_stream(
          { folder: 'Ecommerce App', public_id: public_id },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          },
        );

        uploadStream.end(
          typeof image === 'string' ? Buffer.from(image, 'base64') : image,
        );
      });
    } catch (error) {
      throw error;
    }
  }

  extractPublicIdFromUrl(url) {
    try {
      const regex = /\/v\d+\/([^\/]+)\/[^\/]+$/;
      const match = url.match(regex);

      if (match && match[1]) {
        const publicId = match[0];
        return publicId;
      } else {
        throw new Error('Failed to extract public ID from the URL.');
      }
    } catch (error) {
      console.error('Error extracting public ID:', error.message);
      throw error;
    }
  }

  async fetchImage(public_id: string): Promise<string> {
    try {
      const imageInfo = await v2.image(public_id);
      return imageInfo;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw new NotFoundException('Image not found');
    }
  }

  async deleteImage(public_id: string): Promise<void> {
    try {
      await v2.uploader.destroy(public_id);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new NotFoundException('Image not found');
    }
  }

  async updateImage(public_id: string, newImage): Promise<string> {
    try {
      await this.deleteImage(public_id);

      const imageUrl = await this.uploadImage(newImage, public_id);
      return imageUrl;
    } catch (error) {
      console.error('Error updating image:', error);
      throw error; // Consider providing a more specific error message or handling
    }
  }

  getImage(public_id: string) {
    return v2.image(public_id);
  }
}
