import React, { useEffect, useState } from "react";
import MainSpinner from "../../SharedPages/Spinners/MainSpinner/MainSpinner";
import copy from "copy-to-clipboard";

const ServiceResult = () => {
  const [loading, setLoading] = useState(false);
  const [itemDb, setItemDb] = useState();
  const Identity = localStorage.getItem("Identity");
  const itemLs = JSON.parse(Identity);

  useEffect(() => {
    setLoading(true);
    fetch(`https://voting-server.vercel.app/saved/ownerItem`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setItemDb(data);
      });
  }, []);

  let remindeditem = [];
  itemLs?.forEach((itemls) => {
    const remine = itemDb?.filter(
      (itemdb) => itemdb.identity === itemls.identity
    );
    remindeditem = remindeditem.concat(remine);
  });

  const handledeleteowneritem = (e) => {
    setLoading(true);
    fetch(`https://voting-server.vercel.app/saved/ownerItem/single?id=${e}`)
      .then((res) => res.json())
      .then((data) => {
        const index = itemLs
          ?.map((item) => item.identity)
          .indexOf(data.identity);
        if (index > -1) {
          itemLs.splice(index, 1);
          localStorage.setItem("Identity", JSON.stringify(itemLs));
        }

        fetch(
          `https://voting-server.vercel.app/saved/ownerItem/single?id=${e}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => setLoading(false))
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
          });
      })
      .catch((err) => setLoading(false));
  };
  return (
    <div className="pt-24 min-h-[80vh] w-3/5 mx-auto">
      {loading ? (
        <MainSpinner></MainSpinner>
      ) : (
        <div>
          <h3>Check FriendShip</h3>
          <hr />
          {/* ---------- */}
          <div className="my-6">
            {remindeditem?.length > 0 ? (
              remindeditem?.map((item, idx) => (
                <div
                  key={idx}
                  className={`my-3 bg-slate-600 p-3 rounded flex justify-between`}
                >
                  <div>
                    <h3>
                      Name: <span>{item?.name}</span>
                    </h3>
                    <h3>
                      <span className="mr-2">
                        Total Score:{" "}
                        <span>{`${item?.serviceData?.length * 10}`}</span>
                      </span>
                    </h3>
                    <h3>
                      Selected Item |{" "}
                      {item?.serviceData?.map((itemtwo, idx) => (
                        <span key={idx} className="mr-2">
                          {itemtwo?.category}: {itemtwo?.name}
                        </span>
                      ))}
                    </h3>

                    <div className="mt-6">
                      <h3>Your Friend Choose: </h3>
                      <div>
                        {item?.result.length > 0 ? (
                          item?.result.map((it, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-500 p-3 my-2 rounded text-slate-100"
                            >
                              <h4>
                                Name: {it.name} Total Score: {it?.mark || 0}
                              </h4>
                              <div>
                                Your Friend Selected:{" "}
                                {it?.selected?.map((itemthree, idx) => (
                                  <span key={idx} className="mx-2 text-white">
                                    {itemthree.category}:{" "}
                                    <span
                                      className={`${
                                        item?.serviceData?.some(
                                          (itemfour) =>
                                            itemfour?.id === itemthree?.id
                                        )
                                          ? "text-green-400"
                                          : "text-red-400"
                                      }`}
                                    >
                                      {itemthree.name}
                                    </span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-red-500">Item Not found</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button
                      onClick={() =>
                        copy(`https://check-friends.web.app/child/${item._id}`)
                      }
                      className="btn btn-sm bg-slate-500 border-0 text-white hover:bg-slate-700 pt-1 my-2"
                    >
                      Copy-link
                    </button>
                    <button
                      onClick={() => handledeleteowneritem(item?._id)}
                      className="btn btn-sm bg-slate-500 border-0 text-white hover:bg-slate-700 pt-1 my-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-2xl text-red-400">Not Found</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceResult;
