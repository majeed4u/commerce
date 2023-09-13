'use client';

import { useContext, createContext, useState } from 'react';

interface ProductModalContextProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductModalContext = createContext<ProductModalContextProps>({
  visible: false,
  setVisible: () => {},
});

export function ProductModalProvider({ children }) {
  const [visible, setVisible] = useState(false);

  return (
    <ProductModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModalContext() {
  return useContext(ProductModalContext);
}
