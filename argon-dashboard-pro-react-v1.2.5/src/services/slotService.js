import { createSlot, deleteSlot, editSlot, getSlots } from '../api/Slot';

// Fetch all slots or filter by name
export const fetchSlots = async (searchTerm = '') => {
  try {
    const slots = await getSlots(searchTerm); // Agora usa a função getSlots que lida com o filtro de busca
    return slots;
  } catch (error) {
    console.error('Error fetching slots:', error);
    throw new Error('Erro ao buscar slots11111111');
  }
};

// Add a new slot
export const addSlot = async (slotData) => {
  console.log("skrrrrr ", slotData)
  try {
    const slot = await createSlot(slotData);
    return slot;
  } catch (error) {
    console.error('Error creating slot:', error);
    throw error;
  }
};

// Update an existing slot
export const updateSlot = async (id, slotData) => {
  try {
    const updatedSlot = await editSlot(id, slotData);
    return updatedSlot;
  } catch (error) {
    console.error('Error editing slot:', error);
    throw error;
  }
};

// Delete a slot by ID
export const removeSlot = async (id) => {
  try {
    await deleteSlot(id);
  } catch (error) {
    console.error('Error deleting slot:', error);
    throw error;
  }
};
