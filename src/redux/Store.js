import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import userReducer from './Slice/UserSlice';
import { persistReducer, persistStore } from 'redux-persist';
import UnitReducer from "./Slice/CategorySlice"
import LocationReducer from "./Slice/LocationSlice";
import MaterialReducer from "./Slice/MaterialSlice";
import SupplierReducer from "./Slice/SupplierSlice";




import ThemeSlice from "./Slice/ThemeSlice";
import CategoryReducer from "./Slice/CategorySlice";


// Persist config
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Persisted reducers
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    theme: ThemeSlice,
  })
);

// Root reducer
const rootReducer = combineReducers({
  persisted: persistedReducer,
  // Add non-persisted reducers here
  nonPersisted: combineReducers({
    unit: UnitReducer,
    location: LocationReducer,
    material: MaterialReducer,
    supplier: SupplierReducer,
    category:CategoryReducer


  }),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
