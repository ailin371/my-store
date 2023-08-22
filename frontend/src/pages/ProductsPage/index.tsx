import { useNavigate } from "react-router-dom";
import ProductListView from "../../components/view/ProductsListView";
import { useGetProductsQuery } from "../../app/api";


const ProductsPage = () => {
    const navigate = useNavigate();
    const { data: products = [] } = useGetProductsQuery({})

    return (
        <ProductListView
            products={products}
            onProductClick={(selectedProduct) => navigate(`/products/${selectedProduct.id}`)}
        />
    );
};

export default ProductsPage;