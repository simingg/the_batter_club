import React from "react";

const CartModal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;
  return (
    <>
      <div onClick={() => toggleModal()} />
      <div>{children}</div>
    </>
  );
};

export default CartModal;
