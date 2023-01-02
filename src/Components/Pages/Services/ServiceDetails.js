import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MainSpinner from "../../SharedPages/Spinners/MainSpinner/MainSpinner";
const MySwal = withReactContent(Swal);

const ServiceDetails = () => {
  const [friendcheck, setFriendcheck] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState();
  const [fruits, setFruits] = useState();
  const [place, setPlace] = useState();
  const [name, setName] = useState();
  const [identity, setIdentity] = useState("unknown");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://voting-server.vercel.app/fakedata/friendcheck`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setFriendcheck(data[0]);
      });
  }, []);

  fetch(`https://voting-server.vercel.app/saved/ownerItem`)
    .then((res) => res.json())
    .then((data) => setIdentity(name + data.length));

  const totalselecteditem = {
    color,
    fruits,
    place,
    name,
    identity,
    result: [],
  };
  const handleselectForm = (e) => {
    e.preventDefault();

    if (color !== undefined && fruits !== undefined && place !== undefined) {
      if (name !== undefined && name.length > 2) {
        const savedItem = localStorage.getItem("Identity");
        let savedthis = [];
        savedthis = JSON.parse(savedItem) || [];
        const newArray = [...savedthis, { identity }];
        savedthis = newArray;
        localStorage.setItem("Identity", JSON.stringify(savedthis));
        console.log(savedItem);
        setError(false);

        // post
        fetch(`https://voting-server.vercel.app/save/owneritem`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(totalselecteditem),
        })
          .then((res) => res.json())
          .then((data) => console.log(data, "datap"))
          .catch((err) => console.log(err));
        // post

        MySwal.fire({
          title: <p>Submitted Successfully!</p>,
          html: (
            <i>You can check your Pool Result in #Check-Result on Navbar</i>
          ),
          icon: "success",
        });
        navigate("/service/serviceResult");
      } else {
        setError(true);
        toast.error("Please Enter a valid Name Befor Submit");
      }
    } else {
      toast.error("Please Select All the Fields");
    }
  };

  if (loading) {
    return <MainSpinner></MainSpinner>;
  }

  return (
    <div className="min-h-[80vh] lg:w-3/5 md:w-3/5  mx-auto lg:py-36 pt-16">
      <div>
        <form onSubmit={handleselectForm} className="mx-auto w-[80%]">
          <div className="my-6">
            <p className="font-semibold">Whats Your favourit Color?</p>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1">
              {friendcheck?.color?.map((item, idx) => (
                <div
                  onClick={() => setColor({ id: item.id, name: item.name })}
                  key={idx}
                  className={`flex ${
                    color?.id === item.id && "selectedfruits unselectedfruits"
                  } hovrimg ease-in duration-100 bg-[#51557E] p-1 rounded text-white flex-col m-2`}
                >
                  <div>
                    <img
                      className="w-full h-[6rem]"
                      src={`${item.image}`}
                      alt=""
                    />
                  </div>
                  <h4>{item.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="my-6">
            <p className="font-semibold">Whats Your favourit Fruit?</p>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1">
              {friendcheck?.fruits?.map((item, idx) => (
                <div
                  onClick={() => setFruits({ id: item.id, name: item.name })}
                  key={idx}
                  className={`flex ${
                    fruits?.id === item.id && "selectedfruits unselectedfruits"
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
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1">
              {friendcheck?.places?.map((item, idx) => (
                <div
                  onClick={() => setPlace({ id: item.id, name: item.name })}
                  key={idx}
                  className={`flex ${
                    place?.id === item.id && "selectedfruits unselectedfruits"
                  } hovrimg ease-in duration-100 bg-[#51557E] p-1 rounded text-white flex-col m-2`}
                >
                  <img
                    className="w-full h-[6rem]  rounded"
                    src={item.image}
                    alt=""
                  />
                  <h4>{item.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="my-6">
            <p className="text-amber-400">Dont Forget to Click Submit Button</p>
          </div>
          <div className="pt-5 ">
            <div className="my-2">
              <p>Enter Your Name and Click Submit</p>
              <input
                onChange={(e) => {
                  setError(false);
                  setName(e.target.value);
                }}
                type="text"
                className={`input w-1/2 focus:outline-none focus:border-2 ${
                  error
                    ? "border-2 border-red-600"
                    : "focus:border-green-600 border-2"
                } input-bordered`}
                placeholder="Name"
              />
            </div>
            <button className="btn btn-primary mt-6 px-12 pt-1">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceDetails;
