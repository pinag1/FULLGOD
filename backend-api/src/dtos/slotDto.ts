// src/dtos/slotDto.ts

export interface SlotVariantDto {
  displayName: string;
  isSuper?: boolean;
}

export interface CreateSlotDto {
  name: string;
  displayName: string;
  provider: string;
  rtp?: number | null;
  potencial?: number | null;
  volatility?: number | null;
  releaseDate?: string | null;
  isSuper?: boolean;
  slotReferenceId?: number | null;

  // <-- adicionado
  variants?: SlotVariantDto[];
}

export interface UpdateSlotDto extends Partial<CreateSlotDto> {}
