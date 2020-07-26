import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import { addDelivery, sendCartData } from "../../redux/Cart/cart.actions";
import Button from "../../components/forms/Button";
import { useHistory } from "react-router-dom";
import { Card, CardContent, Typography } from "@material-ui/core";
import moment from "moment";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const DeliveryDetails = (state) => {
  const { currentUser } = useSelector(mapState);
  const cart = useSelector((state) => state.cart.quantityByName);
  const [add, setAdd] = useState("");
  const [unit, setUnit] = useState("");
  const [postal, setPostal] = useState("");
  const [hideModal, setHideModal] = useState(false);
  const [deliverDate, setDeliverDate] = useState(
    moment().day(7).format("MM-DD")
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      //payload for action in redux saga
      addDelivery(currentUser, {
        add,
        unit,
        postal,
      })
    );
    dispatch(sendCartData(currentUser, deliverDate, cart));
    history.push("/payment");
  };

  const handleButton = () => {
    dispatch(sendCartData(currentUser, deliverDate, cart));
    history.push("/payment");
  };

  const showForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2> Delivery Details </h2>
          <FormInput
            label="Main Address"
            type="text"
            value={add}
            handleChange={(e) => setAdd(e.target.value)}
          />
          <FormInput
            label="Unit Address"
            type="text"
            value={unit}
            handleChange={(e) => setUnit(e.target.value)}
          />

          <FormInput
            label="Postal Code"
            type="text"
            value={postal}
            handleChange={(e) => setPostal(e.target.value)}
          />

          <FormSelect
            label="Select Date"
            options={[
              {
                value: moment().day(7).format("MM-DD"),
                name: "Sunday",
              },
              {
                value: moment().day(6).format("MM-DD"),
                name: "Saturday",
              },
            ]}
            handleChange={(e) => setDeliverDate(e.target.value)}
          />

          <Button className="button" type="submit">
            Submit Details
          </Button>
        </form>
      </div>
    );
  };

  const showButton = () => {
    return (
      <div>
        <FormSelect
          label="Select Date"
          options={[
            {
              value: moment().day(7).format("MM-DD"),
              name: "Sunday",
            },
            {
              value: moment().day(6).format("MM-DD"),
              name: "Saturday",
            },
          ]}
          handleChange={(e) => setDeliverDate(e.target.value)}
        />
        <Button className="button" type="button" onClick={handleButton}>
          Proceed to Payment
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography className={"MuiTypography--heading"} variant={"h5"}>
            ISLANDWIDE DELIVERY
          </Typography>
          <Typography className={"MuiTypography--body1"} variant="body1">
            Flat fee of $6, available on the weekends.
            <br />
            Free for orders above $60.
            <br />
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography className={"MuiTypography--heading"} variant={"h5"}>
            PICK-UP
          </Typography>
          <Typography className={"MuiTypography--body1"} variant="body1">
            Pick up available at Holland Raffles Medical open car park
            <br />
            Timing to be confirmed via WhatsApp(Phone Number will be saved for
            this purpose only.)
          </Typography>
        </CardContent>
      </Card>
      <FormSelect
        label="Select Option"
        options={[
          {
            value: "pickup",
            name: "Pick-Up",
          },
          {
            value: "delivery",
            name: "Delivery",
          },
        ]}
        handleChange={(e) => {
          if (e.target.value === "delivery") {
            setHideModal(true);
          } else {
            setHideModal(false);
          }
        }}
      />
      {hideModal ? showForm() : showButton()}
    </div>
  );
};
export default DeliveryDetails;
