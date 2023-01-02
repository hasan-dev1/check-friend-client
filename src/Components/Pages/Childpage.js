import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainSpinner from "../SharedPages/Spinners/MainSpinner/MainSpinner";

const Childpage = () => {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [serviceitem, setServiceItem] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const storeditem = localStorage.getItem("validLink");
  const stored = JSON.parse(storeditem);
  let validlink = [];
  validlink = stored || [];

  const newlocation = location.pathname.split("/child/")[1];

  const [selected, setSelected] = useState([]);

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
    setLoading(true);
    fetch(`https://voting-server.vercel.app/service/showService/${newlocation}`)
      .then((res) => res.json())
      .then((data) => {
        setServiceItem(data);
        setLoading(false);
      });
  }, [newlocation]);

  const array = serviceitem?.serviceData
    .concat(selected)
    .map((item) => item?.id);

  const one = array?.filter((e, i, a) => a.indexOf(e) !== i);

  const handleresult = (e) => {
    e.preventDefault();

    const result = {
      mark: one.length * 10,
      selected,
      name: e.target.name.value || 'unknown',
    };

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
      .then((data) => {
        const totalid = [...validlink, newlocation];
        localStorage.setItem("validLink", JSON.stringify(totalid));
        navigate(`/result/${result.mark}`);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="min-h-[80vh] lg:w-3/5 md:w-3/5  lg:mx-auto md:mx-auto mx-[20px] lg:py-32 pt-16">
      {!validlink?.includes(newlocation) ? (
        loading ? (
          <MainSpinner></MainSpinner>
        ) : (
          pages?.map((item, idx) => (
            <div key={idx}>
              <p className="font-semibold">
                What is {serviceitem?.name}'s favorite {`${item[0].category}?`}
              </p>
              <div className="my-6" key={idx}>
                <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-6">
                  {item?.map((itemone, idx) => (
                    <div
                      key={idx}
                      onClick={(e) => {
                        if (selected.length > 0) {
                          const one = selected.some(
                            (item) => item.category === itemone.category
                          );
                          if (one) {
                            toast.error("You can select twice");
                          } else {
                            setSelected([
                              ...selected,
                              {
                                category: itemone.category,
                                name: itemone.name,
                                id: itemone.id,
                              },
                            ]);
                          }
                        } else {
                          setSelected([
                            ...selected,
                            {
                              category: itemone.category,
                              name: itemone.name,
                              id: itemone.id,
                            },
                          ]);
                        }
                      }}
                      className={`hovrimg ${
                        selected.some(
                          (itemfive) => itemfive.id === itemone.id
                        ) && "bothcls"
                      }  ease-in duration-100 bg-[#51557E] p-1 rounded text-white`}
                    >
                      <img
                        className="w-full h-[6rem]   rounded"
                        src={itemone.image}
                        alt=""
                      />
                      <h4>{itemone.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <>
          <div className="flex justify-center items-center flex-col h-[60vh]">
            <h4 className="text-2xl mb-2">You have already submitted once</h4>
            <Link
              to={"/"}
              className={`btn btn-sm pt-1 bg-slate-600 hover:bg-slate-500`}
            >
              Back to Home
            </Link>
          </div>
        </>
      )}

      {!validlink?.includes(newlocation) ? (
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
            <button className="btn btn-primary mt-6 px-12 pt-1">Submit</button>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Childpage;
