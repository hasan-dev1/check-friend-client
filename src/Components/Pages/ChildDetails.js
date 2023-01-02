import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../App.css";
import withReactContent from "sweetalert2-react-content";
import MainSpinner from "../SharedPages/Spinners/MainSpinner/MainSpinner";
const MySwal = withReactContent(Swal);

const ChildDetails = () => {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [checked, setChecked] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const newlocation = location.pathname.split("/service/showService/")[1];
  const [identity, setIdentity] = useState("unknown");

  const [serviceData, setServiceData] = useState([]);
  console.log(serviceData);
  useEffect(() => {
    setLoading(true);
    fetch(`https://voting-server.vercel.app/selectionitem`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPages(data[0]?.slectionarray);
      });
  }, []);

  useEffect(() => {
    fetch(`https://voting-server.vercel.app/saved/ownerItem`)
      .then((res) => res.json())
      .then((data) => setIdentity(name + data.length));
  }, [name]);

  const handleselectionform = (e) => {
    e.preventDefault();

    if (serviceData?.length === pages.length) {
      if (name !== undefined && name?.length > 2) {
        const totalselecteditem = {
          name,
          identity,
          serviceData,
          result: [],
        };

        const savedItem = localStorage.getItem("Identity");
        let savedthis = [];
        savedthis = JSON.parse(savedItem) || [];
        const newArray = [...savedthis, { identity }];
        savedthis = newArray;
        localStorage.setItem("Identity", JSON.stringify(savedthis));
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

  return (
    <div className="min-h-[80vh] lg:w-3/5 md:w-3/5  lg:mx-auto md:mx-auto mx-[20px] lg:py-32 pt-16">
      <form onSubmit={handleselectionform}>
        {loading ? (
          <MainSpinner></MainSpinner>
        ) : (
          pages?.map((item, idx) => (
            <div key={idx}>
              <p className="font-semibold">Whats Your favourit Fruit?</p>
              <div className="my-6" key={idx}>
                <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-6">
                  {item?.map((itemone, idx) => (
                    <label key={idx} htmlFor={`less${itemone?.id}`}>
                      <div
                        onClick={(e) => {
                          const index = serviceData.findIndex(
                            (ite) => ite.category === itemone.category
                          );
                          const one = serviceData[index];
                          if (one?.category === itemone?.category) {
                            serviceData.splice(index, 1);
                            setServiceData([
                              ...serviceData,
                              {
                                category: itemone.category,
                                id: itemone.id,
                                name: itemone.name,
                              },
                            ]);
                          } else {
                            setServiceData([
                              ...serviceData,
                              {
                                category: itemone.category,
                                id: itemone.id,
                                name: itemone.name,
                              },
                            ]);
                          }
                        }}
                        className={`hovrimg ease-in duration-100 bg-[#51557E] p-1 rounded text-white`}
                      >
                        <img
                          className="w-full h-[6rem]   rounded"
                          src={itemone.image}
                          alt=""
                        />

                        <div className="flex justify-between items-center py-1 px-2">
                          {itemone.name}
                          <input
                            name={`${itemone?.category}`}
                            type="radio"
                            id={`less${itemone?.id}`}
                          />
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}

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
  );
};

export default ChildDetails;
