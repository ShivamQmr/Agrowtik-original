import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useForm } from "react-hook-form";

const Buy = () => {
  const [authUser] = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPost = async () => {
    try {
      const res = await axios.get("https://agrowtik-back.vercel.app/goods/getPost");
      setPosts(res.data);
    } catch (error) {
      console.log(error + error.message + " from Buy.jsx");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [authUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { id, amount } = data;

    const buyInfo = {
      bidderId: authUser._id,
      amount: amount,
      id: id,
    };
    console.log(buyInfo);

    try {
      const res = await axios.post("https://agrowtik-back.vercel.app/goods/bidGoods", buyInfo);
      if (res) {
        console.log(res + "manish");
        window.location.reload();
      }
    } catch (error) {
      console.log(error + error.message + " from buy.jsx");
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <span className="text-green-600 font-semibold text-xl">In sell</span>
        {loading ? (
          <p>Loading...</p>
        ) : posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => {
              // Check if any bid has the status "sold"
              const isSold = post.bid.some((bids) => bids.status === "sold");
              return (
                <div key={post._id} className="flex bg-slate-200 p-4 rounded-md font-semibold flex-row justify-between">
                  <div className="flex justify-start space-x-5">
                    <span className="font-semibold">{post.goods}</span>
                    <span className="font-semibold">{post.weight} KG</span>
                    <span className="font-semibold text-gray-600">({post.age} Months old)</span>
                    <span className="font-semibold text-gray-600">(Rs.{post.price}/Kg)</span>
                  </div>

                  <div className="flex justify-center items-center space-x-3">
                    <div>
                      {post.bid.length > 0 ? (
                        <select className="rounded-md border-gray-400 max-w-28">
                          <option value="" disabled selected>
                            All bids
                          </option>
                          {post.bid.map((bids) => (
                            <option key={bids._id} disabled={bids.status === "sold"}>
                              {bids.amount} {bids.status === "sold" ? "(Sold)" : ""}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-semibold p-2 bg-slate-300 rounded-md">No bid yet!</span>
                      )}
                    </div>

                    <div>
                      {authUser ? (
                        // Each form is specific to each post
                        <form className="flex flex-row space-x-2" onSubmit={handleSubmit((data) => onSubmit({ ...data, id: post._id, amount: data[`bidPrice_${post._id}`] }))}>
                          <div>
                            <select {...register(`bidPrice_${post._id}`, { required: true })} className="p-2 rounded-md bg-gray-300">
                              <option disabled>Choose bid</option>
                              <option value={post.price - post.price * (5 / 100)}>{post.price - post.price * (5 / 100)}</option>
                              <option value={post.price - post.price * (3 / 100)}>{post.price - post.price * (3 / 100)}</option>
                              <option value={post.price}>{post.price}</option>
                              <option value={post.price + post.price * (3 / 100)}>{post.price + post.price * (3 / 100)}</option>
                              <option value={post.price + post.price * (5 / 100)}>{post.price + post.price * (5 / 100)}</option>
                            </select>
                            {errors[`bidPrice_${post._id}`] && <span className="text-red-500">Bid Price is required</span>}
                          </div>
                          <button disabled={loading || isSold} type="submit" className={`${isSold ? "bg-red-600 cursor-not-allowed" : "bg-green-600"} text-white p-2 rounded-md`}>
                            {isSold ? "Sold" : "Buy"}
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No sells found</p>
        )}
      </div>
    </div>
  );
};

export default Buy;
