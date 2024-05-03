import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";

import noimg from "../../assets/images/dummy-product.jpg"

import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { addOrder, getOrders, openAddModal } from "../../store/features/order/orderSlice";
import { getProduct, getProducts } from "../../store/features/product/productSlice";

const FormValidationSchema = yup
  .object({
    // productid: yup.string().required("Product Id is required"),
    address: yup.string().required("Address is required"),
    name: yup.string().required("Name is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    zipCode: yup.string().required("Pincode is required"),
  })
  .required();

const AddOrder = () => {
  const { addModal } = useSelector((state) => state.order);
  const { admin } = useSelector((state) => state?.auth);
  const [productid, setProductid] = useState('');
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  }, []);

  const handleChangeProduct = useCallback((selectedOption) => {
    const productId = selectedOption.value;
    dispatch(getProduct(productId));
  }, [dispatch]);

  // const images = useSelector((state) => state.image?.images[0]);
  const { product, products } = useSelector((state) => state?.product);

  console.log(products)


  const getproducts = []

  const addproduct = {
    name: product?.name,
    price: product?.price,
    _id: product?._id
  }

  getproducts?.push({
    product: addproduct,
    quantity: quantity
  })

  console.log(admin)

  let userid = {}
  userid = {
    username: admin?.username,
    _id: admin?._id
  }

  useEffect(() => {
    const newTotal = (product?.price || 0) * (quantity);
    setTotal(newTotal);
  }, [quantity]);

  useEffect(() => {

    setTotal(product.price);
  }, [product]);

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });





  const onSubmit = (data) => {
    console.log(data)
    const newData = {
      name: data.name,
      shippingAddress:{
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode
      },
      total: total,
      paymentmethod: data.paymentmethod.value,
      products: getproducts,
      userId: userid
    }
    console.log(newData)

    dispatch(addOrder(newData));

    setTimeout(() => {
      dispatch(openAddModal(false));
      dispatch(getOrders());
      reset();

      setQuantity(1);
      setTotal(0);
    }, 300);
  };


  const selecOption = products.map(product => ({
    value: product._id,
    label: product.name
  }));

  const option = [
    { value: "onlinePayment", label: "Online Payment" },
    { value: "cashOnDelivery", label: "Cash On Delivery" },

  ];

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  }

  return (
    <div>
      <Modal
        title="Add Order"
        labelclassName="btn-outline-dark"
        activeModal={addModal}
        onClose={() => dispatch(openAddModal(false))}

      >
        <div className="grid mb-4">
          <label className="form-label" htmlFor="icon_x">
            Select Product
          </label>
          <Controller
            name="product"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="product"
                className="react-select"
                classNamePrefix="select"
                options={selecOption}
                onChange={handleChangeProduct}
                register={register}
                styles={styles}
                id="icon_x"
              />
            )}
          />
          {errors.paymentmethod}
          {/* <Textinput
            name="productid"
            label="product id"
            type="text"
            placeholder="Enter product id..."
            onChange={
              (e) =>
                setProductid(e.target.value)}
            onBlur={handelBlur}
            register={register}
            error={errors.productid}
          /> */}
        </div>
        <div className="grid gap-4 grid-cols-2 mb-4 items-center">
          <div className="h-24 w-24 border rounded ">
            <img className="object-contain w-full h-full" src={product.thumbnailImage ? product.thumbnailImage : noimg} alt={product?.name} />
          </div>
          <div>
            <p>Product Name : {product?.name ? product?.name : "XXXX"}</p>
            <p>Price : {product?.price ? product?.price : "XXXX"} Rs.</p>
          </div>

        </div>
        <div className="grid gap-4 grid-cols-2 mb-4 items-center">
          <Textinput
            name="quantity"
            label="quantity"
            type="number"
            value={quantity}
            defaultValue={1}
            placeholder="Quantity"
            onChange={(e) => { setQuantity(e.target.value) }}
            register={register}
            error={errors.quantity}
            className="w-24 h-8"
            min="1"
          />
          <div className="text-center">
            <p>Total Amount : {total ? total : "XXXX"} Rs.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

          <div className="grid gap-4 grid-cols-2">
            <div>
              <label className="form-label" htmlFor="icon_s">
                Payment Method
              </label>
              <Controller
                name="paymentmethod"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="payment method"
                    className="react-select"
                    classNamePrefix="select"
                    options={option}
                    register={register}
                    styles={styles}
                    id="icon_s"
                  />
                )}
              />
              {errors.paymentmethod}

            </div>
          </div>
          <div className="text-center">
            <h6>
              Delivery Address
            </h6>
          </div>
          <div className="grid">
            <Textinput
              name="name"
              label="Name"
              type="text"
              placeholder="Enter name..."
              register={register}
              error={errors.name}
            />
          </div>
          <div className="grid">
            <Textinput
              name="address"
              label="address"
              type="text"
              placeholder="Enter address..."
              register={register}
              error={errors.address}
            />
          </div>
          <div className="grid gap-4 grid-cols-2">

            <Textinput
              name="city"
              label="city"
              type="text"
              placeholder="Enter city name..."
              register={register}
              error={errors.city}
            />
            <Textinput
              name="zipCode"
              label="pincode"
              type="number"
              placeholder="Enter Pincode"
              register={register}
              error={errors.zipCode}
            />
          </div>
          <div className="grid gap-4 grid-cols-2">

            <Textinput
              name="state"
              label="state"
              type="text"
              placeholder="State"
              register={register}
              error={errors.state}
            />
            <Textinput
              name="country"
              label="country"
              type="text"
              placeholder="Country"
              register={register}
              error={errors.country}
            />
          </div>
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark text-center">Submit</button>
          </div>
        </form>
      </Modal>
    </div >
  );
};

export default AddOrder;
