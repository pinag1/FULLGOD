// seeders/importSlots.ts
/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
import path from 'path';

interface RawSlot {
  id: number;
  name: string;
  provider?: string;
  rtp?: number;
  potencial?: number;
  volatility?: number;
  bestwin?: number | null;
  bestX?: number | null;
  avgX?: number | null;
  quantidadeBonus?: number | null;
  releaseDate?: string | null;
  isSuper: boolean;
  slotReference?: number | null;
  imageURL?: string | null;
}

const prisma = new PrismaClient();

// Ajuste aqui: voltar um nível, depois prisma/data
const slotsData: RawSlot[] = require(path.resolve(__dirname, '../prisma/data/slots.js'));

async function main() {
  console.log('🗑️  Limpando tabelas slotPayment e slot…');
  await prisma.slotPayment.deleteMany();
  await prisma.slot.deleteMany();

  console.log(`🔢 Total de slots a importar: ${slotsData.length}`);

  const chunkSize = 1000;
  for (let i = 0; i < slotsData.length; i += chunkSize) {
    const batch = slotsData.slice(i, i + chunkSize).map(s => {
      const [baseName] = s.name.split('|');
      return {
        id:              s.id,
        name:            baseName,
        displayName:     s.name,
        provider:        s.provider ?? null,
        rtp:             s.rtp ?? null,
        potencial:       s.potencial ?? null,
        volatility:      s.volatility ?? null,
        bestwin:         s.bestwin ?? null,
        bestX:           s.bestX ?? null,
        avgX:            s.avgX ?? null,
        quantidadeBonus: s.quantidadeBonus ?? null,
        releaseDate:     s.releaseDate ? new Date(s.releaseDate) : null,
        isSuper:         s.isSuper,
        imageURL:        s.imageURL ?? null,
        slotReferenceId: s.slotReference ?? null,
      };
    });

    await prisma.slot.createMany({
      data:           batch,
      skipDuplicates: true,
    });

    console.log(`  ✔️  Importados slots ${i + 1}–${Math.min(i + chunkSize, slotsData.length)}`);
  }

  console.log('✅ Import concluído!');
}

main()
  .catch(err => console.error('❌ Erro no import:', err))
  .finally(() => prisma.$disconnect());
