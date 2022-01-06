import { useCallback, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import api from "../services/api";
import { Product } from "../types/Product";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(async () => {
    setProducts(await api.getProdcuts());
  }, []);

  const purchase = async (product: Product) => {
    setLoading(true);

    try {
      await api.purchase(user?.id || "", product.id, 1);
      await getProducts();
      alert(`Successfully purchased ${product.name}`)
    } catch (err) {
      const errObj = err as any;
      if (errObj.response?.data?.message) {
        alert(errObj.response?.data?.message);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="Home">
      <h3>Product List</h3>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-row">
            <div className="info">
              <div className="name">{product.name}</div>
              <div className="meta">
                <div className="price">Price: ${product.price}</div>
                <div className="quantity">
                  Quantity: {product.quantiyInStock}
                </div>
              </div>
            </div>
            <div className="product-actions">
              {product.quantiyInStock > 0 && (
                <button
                  className="button"
                  onClick={() => purchase(product)}
                  disabled={loading}
                >
                  Purchase
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
