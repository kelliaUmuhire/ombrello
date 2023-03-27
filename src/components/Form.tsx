import React, { useEffect, useState } from "react";
import u4 from "../assets/umbrella 1.png";
import u2 from "../assets/umbrella 2.png";
import u5 from "../assets/umbrella 3.png";
import u1 from "../assets/umbrella 4.png";
import u3 from "../assets/umbrella 5.png";
import Modal from "react-modal";
import { UmbreObj, Umbrella } from "../types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
    // width: "60%",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
  },
};

const _UMBRELLAS: Umbrella[] = [
  {
    id: 1,
    picture: u1,
  },
  {
    id: 2,
    picture: u2,
  },
  {
    id: 3,
    picture: u3,
  },
  {
    id: 4,
    picture: u4,
  },
  // {
  //   id: 5,
  //   picture: u5,
  // },
];

export default function Form() {
  const [umbrellas, setUmbrellas] = useState([] as any);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [umbrella, setUmbrella] = useState("" as any);
  const [order, setOrder] = useState([] as any);
  const [price, setPrice] = useState(0);

  const closeModal = () => setIsOpen(false);

  const openModal = (u: Umbrella) => {
    setUmbrella(u);
    setIsOpen(true);
  };

  const editUmbrellas = (id: number, quantity?: number, selected?: boolean) => {
    let _umbrellas: any[] = [...umbrellas];
    let _ui = _umbrellas.findIndex((x) => x.id === id);
    _umbrellas[_ui].quantity = quantity;
    if (selected !== null || undefined) _umbrellas[_ui].selected = selected;
    console.log(_umbrellas);

    setUmbrellas(_umbrellas);
  };

  const addUmbrella = (data: UmbreObj) => {
    let temp: any[] = [...order];
    temp.push(data);
    setOrder(temp);
    editUmbrellas(data.id, data.quantity, true);
    closeModal();
  };

  const updateUmbrella = (id: number, quantity: number) => {
    let temp: any[] = [...order];
    let _index = temp.findIndex((x) => x.id === id);
    if (_index > -1) {
      temp[_index].quantity = quantity;
      setOrder(temp);
      editUmbrellas(id, quantity);
    }
  };

  const removeUmbrella = (id: number) => {
    let temp: any[] = [...order];
    let _index = temp.findIndex((x) => x.id === id);
    if (_index > -1) {
      temp.splice(_index, 1);
      setOrder(temp);
      editUmbrellas(id, 1, false);
    }
    closeModal();
  };

  useEffect(() => {
    let temp: UmbreObj[] = _UMBRELLAS.map((u) => {
      return {
        ...u,
        selected: false,
        quantity: 1,
      };
    });
    setUmbrellas(temp);
  }, []);

  useEffect(() => {
    let _sum: number = 0;
    order.forEach((obj: UmbreObj) => {
      _sum += obj.quantity * 1000;
    });
    setPrice(_sum);
  }, [order]);

  return (
    <div className="bg-white rounded-lg p-6 md:w-2/3 w-full mt-3">
      <div className="flex flex-col justify-center items-center">
        <div className="font-old text-xl font-bold text-black">
          Place Your Order
        </div>
        <div className="text-gray-400 text-sm">
          Have your umbrellas delivered to you in a jiff ⚡
        </div>
      </div>
      <div className="form mt-10">
        <div className="input">
          <div className="text-black text-sm">Name</div>
          <input
            type="text"
            name=""
            placeholder="Enter your name"
            className="text-sm border border-gray-400 px-3 py-2 w-full mt-1 text-black rounded"
          />
        </div>
        <div className="input mt-5">
          <div className="text-black text-sm">Phone Number</div>
          <input
            type="text"
            name=""
            placeholder="Enter your phone number"
            className="text-sm border border-gray-400 px-3 py-2 w-full mt-1 text-black rounded"
          />
        </div>
        <div className="input mt-5 relative">
          <div className="text-black text-sm">Location</div>
          <input
            type="text"
            name=""
            placeholder="Enter your street address"
            className="text-sm border border-gray-400 px-3 py-2 w-full mt-1 text-black rounded"
          />
        </div>
        <div className="input my-5">
          <div className="text-black text-sm font-semibold">
            Select Umbrellas
          </div>
          <div className="flex space-x-5 mt-2">
            {umbrellas.map((u: any) => (
              <div
                key={u.id}
                className={`${
                  u.selected ? "shadow px-1 pt-1 pb-4" : null
                } relative w-10`}
                onClick={() => openModal(u)}
              >
                <img
                  src={u.picture}
                  alt={`Umbrella %{u.id}`}
                  className=" cursor-pointer"
                />
                {u.selected && (
                  <div className="text-black text-center absolute bottom-0 right-1 font-karla font-semibold text-sm">
                    {u.quantity}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="font-semibold text-right w-full text-blue-900">
          {price > 0 && `${price} RWF`}
        </div>
        <div
          className="font-bold px-3 py-2 w-full text-center rounded cursor-pointer"
          style={{ background: "#D04E4A" }}
        >
          Order
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <UDetails
          umbrella={umbrella}
          addUmbrella={addUmbrella}
          updateUmbrella={updateUmbrella}
          removeUmbrella={removeUmbrella}
        />
      </Modal>
    </div>
  );
}

const UDetails = ({
  umbrella,
  removeUmbrella,
  addUmbrella,
  updateUmbrella,
}: any) => {
  const [quantity, setQuantity] = useState(umbrella.quantity);

  const changeQuantity = (n: number) => {
    if (n === -1) {
      if (quantity > 1) setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
    updateUmbrella(umbrella.id, quantity);
  };

  return (
    <div className="flex justify-between">
      <img src={umbrella.picture} className="w-1/2" />
      <div className="w-2/5 flex flex-col justify-center items-center font-karla">
        <div className="text-lg font-bold">Number</div>
        <div className="flex space-x-3 shadow py-1 px-3 mt-1">
          <div className="cursor-pointer" onClick={() => changeQuantity(-1)}>
            -
          </div>
          <div>{quantity}</div>
          <div className="cursor-pointer" onClick={() => changeQuantity(1)}>
            +
          </div>
        </div>
        <div className="text-lg font-bold mt-5">Price</div>
        <div className="text-center font-semibold text-blue-900 shadow py-1 px-3">
          {quantity * 1000} RWF
        </div>
        <div
          className={`px-3 py-2 w-2/3 mt-10 text-center rounded-sm cursor-pointer border  ${
            umbrella.selected
              ? "bg-black text-white"
              : "border-black text-black"
          }`}
          onClick={() =>
            umbrella.selected
              ? removeUmbrella(umbrella.id)
              : addUmbrella({ id: umbrella.id, quantity })
          }
        >
          {umbrella.selected ? "Unselect" : "Select"}
        </div>
      </div>
    </div>
  );
};
