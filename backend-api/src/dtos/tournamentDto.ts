// src/dtos/tournament.dto.ts
export interface CreateTournamentDto {
    name?: string;
    description?: string;
  }
  
  export interface UpdateTournamentDto extends Partial<CreateTournamentDto> {}
  