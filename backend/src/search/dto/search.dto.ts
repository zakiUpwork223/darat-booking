import { IsNotEmpty, IsString } from "class-validator";

export class SearchDto {
    @IsString()
    @IsNotEmpty()
    query: string;
  }
  
  export class SearchResponseDTO {
    doctors: any[];
    services: any[];
    categories: any[];
  }