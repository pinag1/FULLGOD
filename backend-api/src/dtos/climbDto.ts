// src/dtos/climb.dto.ts

export interface CreateClimbDto {
    name?: string;
    description?: string;
  }
  
  export interface UpdateClimbDto extends Partial<CreateClimbDto> {}
  
  export interface CreateParticipationDto {
    userId: number;
  }
  
  export interface UpdateLevelProgressDto {
    attemptsLeft?: number;
    result?: 'NAO_COMPLETOU' | 'COMPLETOU';
  }
  