import { useNavigate } from "react-router-dom";
import ProductListView from "../../components/view/ProductsListView";
import { MOCK_PRODUCTS } from "../../mock/mockProducts";


const ProductsPage = () => {
    const navigate = useNavigate();

    return (
        <ProductListView
            products={MOCK_PRODUCTS}
            onProductClick={(selectedProduct) => {
                console.log("Clicked product:", selectedProduct);
                navigate(`/product/${selectedProduct.id}`);
            }}
        />
    );
};

export default ProductsPage;