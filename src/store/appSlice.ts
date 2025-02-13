import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InventoryItem {
  id: string; // Use string for Firebase keys
  name: string;
  quantity: number;
  date: string;
}

interface Sale {
  id: string; // Use string for sale ID
  productName: string;
  quantitySold: number;
  salesDate: string;
}

interface AppState {
  inventoryItems: InventoryItem[];
  salesItems: Sale[];
}

const initialState: AppState = {
  inventoryItems: [],
  salesItems: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Inventory reducers
    addInventoryItem(state, action: PayloadAction<InventoryItem>) {
      state.inventoryItems.push(action.payload);
    },
    updateInventoryItem(state, action: PayloadAction<InventoryItem>) {
      const index = state.inventoryItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.inventoryItems[index] = action.payload;
      }
    },
    deleteInventoryItem(state, action: PayloadAction<string>) {
      state.inventoryItems = state.inventoryItems.filter(item => item.id !== action.payload);
    },
    clearInventoryItems(state) {
      state.inventoryItems = [];
    },

    // Sales reducers
    addSale(state, action: PayloadAction<Sale>) {
      state.salesItems.push(action.payload);
    },
    updateSale(state, action: PayloadAction<Sale>) {
      const index = state.salesItems.findIndex(sale => sale.id === action.payload.id);
      if (index !== -1) {
        state.salesItems[index] = action.payload;
      }
    },
    deleteSale(state, action: PayloadAction<string>) {
      state.salesItems = state.salesItems.filter(sale => sale.id !== action.payload);
    },
    clearSales(state) {
      state.salesItems = [];
    },
  },
});

// Export actions and reducer
export const { 
  addInventoryItem, 
  updateInventoryItem, 
  deleteInventoryItem, 
  clearInventoryItems, 
  addSale, 
  updateSale, 
  deleteSale, 
  clearSales 
} = appSlice.actions;

export default appSlice.reducer;