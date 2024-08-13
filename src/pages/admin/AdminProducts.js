import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  // type: 決定 model 展開的用途
  const [type, setType] = useState("create"); // create / edit
  const [tempProduct, setTempProduct] = useState({}); // 暫存產品資訊

  const productModal = useRef(null);
  const deleteModal = useRef(null);
  useEffect(() => {
    productModal.current = new Modal("#productModal", { backdrop: "static" });
    deleteModal.current = new Modal("#deleteModal");
    getProducts();
  }, []);

  const getProducts = async (page = 1) => {
    const productResult = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    console.log(productResult);
    setProducts(productResult.data.products);
    setPagination(productResult.data.pagination);
  };

  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  };

  const closeProductModal = () => {
    productModal.current.hide();
  };

  const openDeleteModal = (product) => {
    setTempProduct(product);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      if (res.data.success) {
        getProducts();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-3'>
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        tempProduct={tempProduct}
        type={type}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempProduct.title}
        handleDelete={deleteProduct}
        id={tempProduct.id}
      />
      <h3>產品列表</h3>
      <hr />
      <div className='text-end'>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          onClick={() => openProductModal("create", {})}
        >
          建立新商品
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>分類</th>
            <th scope='col'>名稱</th>
            <th scope='col'>售價</th>
            <th scope='col'>啟用狀態</th>
            <th scope='col'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-primary btn-sm'
                    onClick={() => openProductModal("edit", product)}
                  >
                    編輯
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm ms-2'
                    onClick={() => openDeleteModal(product)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination changePage={getProducts} pagination={pagination} />
    </div>
  );
}

export default AdminProducts;
