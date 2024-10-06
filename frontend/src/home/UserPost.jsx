import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useForm } from "react-hook-form";

const UserPost = () => {
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [authUser] = useAuth(); // Assuming you're destructuring authUser

  const getUserPost = async () => {
    const info = {
      id: authUser._id,
    };
    try {
      const res = await axios.post("https://agrowtik-back.vercel.app/goods/getUserPost", info);
      setUserPost(res.data);
      console.log("Response data:", res.data);
    } catch (error) {
      console.error(error.message, "error from userPost");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      getUserPost();
    }
  }, [authUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // to delete
  const onSubmit = async (data) => {
    const { id } = data;
    const toDelInfo = {
      id: id,
    };
    try {
      const res = await axios.post("https://agrowtik-back.vercel.app/goods/toDelInfo", toDelInfo);
      if (res) {
        // Refresh the user posts after deletion
        getUserPost();
      }
    } catch (error) {
      console.error(error.message + " to delete");
    }
  };

  // to sell
  const onSubmit2 = async (data) => {
    const { id, bidsId } = data;
    const toSellInfo = {
      id: id,
      bidsId: bidsId,
    };

    try {
      const res = await axios.post("https://agrowtik-back.vercel.app/goods/getSold", toSellInfo);
      console.log(res.data + " from to sell");
      // Optionally refresh the user posts after selling
      getUserPost();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <span className="text-xl font-bold mb-7">Your sells</span>
        <div className="">
          {loading ? (
            <p>Loading...</p>
          ) : userPost.length > 0 ? (
            <div className="space-y-4">
              {userPost.map((post) => {
                const isSold = post.bid && post.bid.some((bids) => bids.status === "sold");
                return (
                  <div key={post._id}>
                    <div className="w-full bg-gray-100 p-3 rounded-md">
                      <span className="text-xs font-semibold text-red-600">{post.time} </span>{" "}
                      <div className="flex justify-between">
                        <div className="flex justify-start space-x-5">
                          <span className="font-semibold">{post.goods}</span>
                          <span className="font-semibold">{post.weight} KG</span>
                          <span className="font-semibold text-gray-600">({post.age} Months old)</span>
                          <span className="font-semibold text-gray-600">(Rs.{post.price}/Kg)</span>
                        </div>
                        <div className="flex flex-row space-x-3">
                          {post.bid.length > 0 ? (
                            <div>
                              <form className="flex space-x-2" onSubmit={handleSubmit((data) => onSubmit2({ ...data, id: post._id, bidsId: data[`bidsId${post._id}`] }))}>
                                <select {...register(`bidsId${post._id}`, { required: true })} className="rounded-md border-gray-400 max-w-28">
                                  <option value="" disabled>
                                    Choose bid
                                  </option>
                                  {post.bid.map((bids) => (
                                    <option value={bids._id} key={bids._id}>
                                      {bids.amount}
                                    </option>
                                  ))}
                                </select>
                                {errors[`bidsId${post._id}`] && <span className="text-red-500">Bid is required</span>}
                                <button type="submit" className={` ${isSold ? "bg-red-600 cursor-not-allowed" : ""} p-2 rounded-md text-gray-50 bg-green-600 font-semibold`}>
                                  {isSold ? "Sold" : "Sell"}
                                </button>
                              </form>
                            </div>
                          ) : (
                            <span className="font-semibold p-2 bg-slate-300 rounded-md">No bid yet!</span>
                          )}
                          <form onSubmit={handleSubmit((data) => onSubmit({ ...data, id: post._id }))}>
                            <button className="rounded-md bg-red-600 text-gray-50 p-2 font-semibold" type="submit">
                              Remove
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No posts available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPost;
