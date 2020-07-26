import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../redux/Products/products.actions";
import Modal from "./../../components/Modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Admin = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("regular");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("reg");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      //payload for action in redux saga
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDescription,
      })
    );
    resetForm();
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button className="button" onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

            <FormSelect
              label="Category"
              options={[
                {
                  value: "Whole Cakes",
                  name: "Whole Cakes",
                },
                {
                  value: "Weekly Specials",
                  name: "Weekly Specials",
                },
                {
                  value: "Cookies",
                  name: "Reg Cookies",
                },
                {
                  value: "Dessert Boxes",
                  name: "Reg Boxes",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
            />
            <FormInput
              label="Description"
              type="text"
              value={productDescription}
              handleChange={(e) => setProductDescription(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
            />

            <Button className="button" type="submit">
              Add product
            </Button>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {products.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        productDescription,
                        documentID,
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={productThumbnail} />
                          </td>
                          <td>{productName}</td>
                          <td>${productPrice}</td>
                          <td> {productDescription}</td>
                          <td>
                            <Button
                              className="button"
                              onClick={() =>
                                dispatch(deleteProductStart(documentID))
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
