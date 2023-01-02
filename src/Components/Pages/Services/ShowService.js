import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../App.css";
import MainSpinner from "../../SharedPages/Spinners/MainSpinner/MainSpinner";

const ShowService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [friendcheck, setFriendcheck] = useState();
  const [serviceitem, setServiceItem] = useState();
  const location = useLocation();
  const newlocation = location.pathname.split("/service/showService/")[1];
  const [mark, setMark] = useState(0);

  const [fruits, setFruits] = useState("");
  const [place, setPlace] = useState("");
  const [color, setColor] = useState("");

  const colordb = serviceitem?.color;
  const fruitsdb = serviceitem?.fruits;
  const placedb = serviceitem?.place;

  useEffect(() => {
    setLoading(true);
    fetch(`https://voting-server.vercel.app/fakedata/friendcheck`)
      .then((res) => res.json())
      .then((data) => {
        setFriendcheck(data[0]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://voting-server.vercel.app/service/showService/${newlocation}`)
      .then((res) => res.json())
      .then((data) => {
        setServiceItem(data);
        setLoading(false);
      });
  }, [newlocation]);

  const handleresult = (e) => {
    e.preventDefault();
    const result = {
      name: e.target.name.value || "Unknown",
      fruits,
      place,
      color,
      mark,
    };

    if (fruits !== "" && place !== "" && color !== "") {
      fetch(
        `https://voting-server.vercel.app/saved/ownerItem?id=${newlocation}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(result),
        }
      )
        .then((res) => res.json())
        .then((data) => navigate("/"))
        .catch((err) => console.error(err));
    } else {
      toast.error("Please select All Fields");
    }
  };
  return (
    <div className="min-h-[80vh] lg:w-3/5 md:w-3/5  lg:mx-auto md:mx-auto mx-[20px] lg:py-32 pt-16">
      {loading ? (
        <MainSpinner></MainSpinner>
      ) : (
        <>
          <div className="my-6">
            <p className="font-semibold">Whats Your favourit Fruit?</p>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2">
              {friendcheck?.color?.map((item, idx) => (
                <div
                  onClick={() => {
                    if (color === "") {
                      setColor({ id: item.id, name: item.name });
                      if (colordb?.id !== item?.id) {
                        toast.error("Oopps Its wrong ans");
                        setMark(mark + 0);
                      } else {
                        toast.success("Wow, You did it Awesome!");
                        setMark(mark + 10);
                      }
                    } else {
                      toast.error("You can't select twice");
                    }
                  }}
                  key={idx}
                  className={`flex ${
                    color?.id === item?.id && "selectedfruits"
                  } ${
                    color?.id === item?.id
                      ? color?.id === colordb?.id
                        ? "bg-green-500"
                        : "bg-red-600"
                      : "bg-[#51557E]"
                  } hovrimg ease-in duration-100 bg-[#51557E] p-1 rounded text-white flex-col m-2`}
                >
                  <img
                    className="w-full h-[6rem]   rounded"
                    src={item.image}
                    alt=""
                  />
                  <h4>{item.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="my-6">
            <p className="font-semibold">Whats Your favourit Fruit?</p>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2">
              {friendcheck?.fruits?.map((item, idx) => (
                <div
                  onClick={() => {
                    if (fruits === "") {
                      setFruits({ id: item.id, name: item.name });
                      if (fruitsdb?.id !== item?.id) {
                        toast.error("Oopps Its wrong ans");
                        setMark(mark + 0);
                      } else {
                        toast.success("Wow, You did it Awesome!");
                        setMark(mark + 10);
                      }
                    } else {
                      toast.error("You can't select twice");
                    }
                  }}
                  key={idx}
                  className={`flex ${
                    fruits?.id === item?.id && "selectedfruits"
                  } ${
                    fruits?.id === item?.id
                      ? fruits?.id === fruitsdb?.id
                        ? "bg-green-500"
                        : "bg-red-600"
                      : "bg-[#51557E]"
                  } hovrimg ease-in duration-100 bg-[#51557E] p-1 rounded text-white flex-col m-2`}
                >
                  <img
                    className="w-full h-[6rem]   rounded"
                    src={item.image}
                    alt=""
                  />
                  <h4>{item.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="my-6">
            <p className="font-semibold">Whats Your favourit Fruit?</p>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2">
              {friendcheck?.places?.map((item, idx) => (
                <div
                  onClick={() => {
                    if (place === "") {
                      setPlace({ id: item.id, name: item.name });
                      if (placedb?.id !== item?.id) {
                        toast.error("Oopps Its wrong ans");
                        setMark(mark + 0);
                      } else {
                        toast.success("Wow, You did it Awesome!");
                        setMark(mark + 10);
                      }
                    } else {
                      toast.error("You can't select twice");
                    }
                  }}
                  key={idx}
                  className={`flex ${
                    place?.id === item?.id && "selectedfruits"
                  } ${
                    place?.id === item?.id
                      ? place?.id === placedb?.id
                        ? "bg-green-500"
                        : "bg-red-600"
                      : "bg-[#51557E]"
                  } hovrimg ease-in duration-100 bg-[#51557E] p-1 rounded text-white flex-col m-2`}
                >
                  <img
                    className="w-full h-[6rem]   rounded"
                    src={item.image}
                    alt=""
                  />
                  <h4>{item.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleresult}>
            <div className="pt-5 ">
              <div className="my-2">
                <p>Enter Your Name and Click Submit</p>
                <input
                  type="text"
                  name="name"
                  className={`input w-1/2 focus:outline-none focus:border-2 input-bordered`}
                  placeholder="Name"
                />
              </div>
              <button className="btn btn-primary mt-6 px-12 pt-1">
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ShowService;
