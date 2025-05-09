// src/dtos/elo.dto.ts

export interface CreateEloDto {
    name?: string;
    description?: string;
  }
  
  export interface UpdateEloDto extends Partial<CreateEloDto> {}
  
  export interface CreateEloParticipationDto {
    userId: number;
    score?: number;
  }
  