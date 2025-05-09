// src/dtos/king.dto.ts

export interface CreateKingDto {
    name?: string;
    description?: string;
  }
  
  export interface UpdateKingDto extends Partial<CreateKingDto> {}
  
  export interface CreateKingEntryDto {
    slotId: number;
    userId: number;
  }
  