import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
  oosProductStart,
  inProductHandle,
} from "./../../redux/Products/products.actions";
import Modal from "./../../components/Modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

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
  const [productThumbnail2, setProductThumbnail2] = useState("");
  const [productThumbnail3, setProductThumbnail3] = useState("");
  const [productPriceArray, setProductPriceArray] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productPrice, setProductPrice] = useState(0);

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
    setProductThumbnail2("");
    setProductThumbnail3("");
    setProductPriceArray([]);
    setProductDescription("");
  };

  const resetPrice = () => {
    setProductPriceArray((result) => [
      ...result,
      { size: productSize, price: productPrice },
    ]);
    setProductPrice(0);
    setProductSize("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      //payload for action in redux saga
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productThumbnail2,
        productThumbnail3,
        productPriceArray,
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
                  value: "regular",
                  name: "Whole Cakes",
                },
                {
                  value: "Weekly Specials",
                  name: "Weekly Specials",
                },
                {
                  value: "regular",
                  name: "Reg Cookies",
                },
                {
                  value: "regular",
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
              label="second image URL"
              type="url"
              value={productThumbnail2}
              handleChange={(e) => setProductThumbnail2(e.target.value)}
            />

            <FormInput
              label="third image URL"
              type="url"
              value={productThumbnail3}
              handleChange={(e) => setProductThumbnail3(e.target.value)}
            />
            <TextField
              styles={{ width: "30ch" }}
              id="standard-basic"
              label="Price"
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <TextField
              styles={{ width: "30ch" }}
              id="standard-basic"
              label="Size"
              onChange={(e) => setProductSize(e.target.value)}
            />
            <IconButton aria-label="submit tag" onClick={() => resetPrice()}>
              <AddIcon />
            </IconButton>
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
                        oos,
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={productThumbnail} />
                          </td>
                          <td>{productName}</td>
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
                            {oos ? (
                              <Button
                                className="button"
                                onClick={() =>
                                  dispatch(inProductHandle(documentID))
                                }
                              >
                                {" "}
                                set inStock{" "}
                              </Button>
                            ) : (
                              <Button
                                className="button"
                                onClick={() =>
                                  dispatch(oosProductStart(documentID))
                                }
                              >
                                setOOS
                              </Button>
                            )}
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
