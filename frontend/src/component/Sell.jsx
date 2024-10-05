import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const Sell = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // If hour is 0, make it 12
  const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;

  const naviagte = useNavigate();
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitFlag, setSubmitFlag] = useState(false);

  const onSubmit = async (data) => {
    const goodsInfo = {
      id: authUser._id,
      goods: data.goods,
      weight: data.weight,
      age: data.age,
      price: data.price,
      remarks: data.remarks,
      time: formattedDateTime,
    };
    setSubmitFlag(true);
    await axios
      .post("http://localhost:3000/goods/postGoods", goodsInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log("Posted", res.data);
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("Failed to post" + err);
        console.log(err.message);
      });
  };
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-2  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <span className=" text-green-600 font-semibold text-xl">Sell/Post</span>
          <hr></hr>
          <div className="mt-4 font-semibold">
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <select {...register("goods", { required: true })} name="goods" className="btn rounded-md w-52 text-center border-slate-600 border-opacity-75">
                  <option disabled selected>
                    Select goods
                  </option>
                  <option defaultValue={"Paddy (धान)"}>Paddy (धान)</option>
                  <option defaultValue={"Wheat (गहुँ)"}>Wheat (गहुँ)</option>
                  <option defaultValue={"Maize (मकै)"}>Maize (मकै)</option>
                  <option defaultValue={"Barley (जौ)"}>Barley (जौ)</option>
                  <option defaultValue={"Millet (कोदो)"}>Millet (कोदो)</option>
                  <option defaultValue={"Sorghum (ज्वार)"}>Sorghum (ज्वार)</option>
                </select>
                {errors.goods && <span className=" text-red-600">This field is required</span>}
              </div>

              <div className="mt-4">
                <label htmlFor="weight" className="block font-bold">
                  Weight (kg)
                </label>
                <input {...register("weight", { required: true })} className="rounded-md w-full border border-slate-600 p-2" id="weight" max={1000} type="number" placeholder="Enter weight in kilograms" />
                {errors.weight && <span className=" text-red-600">This field is required</span>}
              </div>

              <div className="mt-4">
                <label htmlFor="age" className="block font-bold">
                  Age (months)
                </label>
                <input {...register("age", { required: true })} className="rounded-md w-full border border-slate-600 p-2" id="age" max={24} type="number" placeholder="Enter age in months" />
                {errors.age && <span className=" text-red-600">This field is required</span>}
              </div>

              <div className="mt-4">
                <label htmlFor="price" className="block font-bold">
                  Price (per kg in local currency)
                </label>
                <input {...register("price", { required: true })} className="rounded-md w-full border border-slate-600 p-2" id="price" type="number" placeholder="Enter price per kg" />
                {errors.price && <span className=" text-red-600">This field is required</span>}
              </div>

              <div className="mt-4">
                <label htmlFor="remarks" className="block font-bold">
                  Remarks
                </label>
                <textarea {...register("remarks", { required: true })} className="rounded-md w-full border border-slate-600 p-2" id="remarks" rows="4" placeholder="Any additional comments or information"></textarea>
                {errors.remarks && <span className=" text-red-600">This field is required</span>}
              </div>

              <div className="mt-6">
                <button disabled={submitFlag} type="submit" className="btn w-full bg-green-600 text-white rounded-md p-2">
                  Sell
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sell;
