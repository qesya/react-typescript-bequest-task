import React, { useEffect, useState } from 'react';
import './App.css';

import { useForm } from "react-hook-form";
import Modal from 'react-modal';

import { FormData } from './types/formdata';
import { People } from './types/people';
import { Addresses, PostcodeResponse } from './types/response';
import { findPostcode } from './api/getAddress';

import dummy from './utils/dummy';

import Card from './shared/components/Card';
import DetailCard from './shared/components/DetailCard';
import Form from './shared/components/Form';
import RadioButton from './shared/components/RadioButton';

function App() {
  const { register, handleSubmit } = useForm<FormData>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<People | null>(null);
  const [dataUser, setDataUser] = useState<People[]>(dummy);
  const [selectedAddress, setSelectedAddress] = useState<PostcodeResponse | null>(null);
  const [mode, setMode] = useState<string>("manual");
  const [error, setError] = useState<string>("");

  const [form, setForm] = useState<People>({
    name: "",
    phone: "",
    email: "",
    postcode: "",
    first_address: "",
    second_address: "",
    town: "",
    country: "",
  })

  const onSubmitPostCode = async (data: string) => {
    try {
      const response = await findPostcode(data);
      console.log(response)
      const res = response.data;
      if (typeof res !== 'undefined' && res !== null) {
        setSelectedAddress(res);
        console.log("data api", selectedAddress)
      }
    } catch (err) {
      if (err.message == 'Request failed with status code 400') {
        setError('You entered wrong postcode.')
        setTimeout(() => setError(''), 5000)
      }
    }
    
  };

  const chooseAddress = (data: Addresses,) => {
    setForm((oldState: any) => ({
      ...oldState,
      first_address: data.line_1,
      second_address: data.line_2,
      town: data.town_or_city,
      country: data.country,
    }))
  }

  const onSubmit = handleSubmit(({ postcode }) => {
    const selected = dummy.filter((data) => data.postcode.includes(postcode));
    setDataUser(selected);
  });

  const onSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    dataUser.push(form);
    console.log("[onSubmitAdd]", form)
    setForm({ //reset
      name: "",
      phone: "",
      email: "",
      postcode: "",
      first_address: "",
      second_address: "",
      town: "",
      country: "",
    });

    setModalOpen(false);
  };

  const inputs_autocomplete = [
    [
      {
        label: "Enter Postcode", type: "text", name: "postcode", placeholder: "Eg: PO16 7GZ", required: true,
        autocomplete: {
          label: "line_1",
          list: selectedAddress?.addresses,
          setList: setSelectedAddress,
          onClick: chooseAddress,
        },
        onBlur: (e: React.ChangeEvent<HTMLInputElement>) => onSubmitPostCode(e.target.value)
      },
    ],
    [
      { label: "Name", type: "text", name: "name", placeholder: "Eg: Johny", required: true },
    ],
    [
      { label: "Phone Number", type: "number", name: "phone", placeholder: "Eg: 44 123 4455", required: true },
      { label: "Email", type: "email", name: "email", placeholder: "Eg: johny@gmail.com", required: true },
    ],
    { label: "First Address Line", type: "text", name: "first_address", placeholder: "Eg: Tw Associates", required: true },
    { label: "Second Address Line", type: "text", name: "second_address", placeholder: "Eg: Tw Associates" },
    [
      { label: "Town", type: "text", name: "town", placeholder: "Eg: Tw Associates", required: true },
      { label: "Country", type: "text", name: "country", placeholder: "Eg: England", required: true },
    ],
  ];

  const inputs = [
    [
      { label: "Name", type: "text", name: "name", placeholder: "Eg: Johny", required: true },
      { label: "Phone Number", type: "number", name: "phone", placeholder: "Eg: 44 123 4455", required: true },
    ],
    [
      { label: "Email", type: "email", name: "email", placeholder: "Eg: johny@gmail.com", required: true },
      {
        label: "Enter Postcode", type: "text", name: "postcode", placeholder: "Eg: PO16 7GZ", required: true
      },
    ],
    { label: "First Address Line", type: "text", name: "first_address", placeholder: "Eg: Tw Associates", required: true },
    { label: "Second Address Line", type: "text", name: "second_address", placeholder: "Eg: Tw Associates" },
    { label: "Town", type: "text", name: "town", placeholder: "Eg: Tw Associates", required: true},
    { label: "Country", type: "text", name: "country", placeholder: "Eg: England", required: true },
  ];

  return (
    <div className="App">
      <div className="flex">
        <div className="flex w-full justify-between p-4 items-center px-10">
          <p className="font-bold text-xl text-gray-600">Address Book</p>

          <button
            className="px-4 py-2 bg-green-400 text-white rounded-lg focus:outline-none"
            onClick={() => setModalOpen(!modalOpen)}
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="flex mt-6 mx-10">
        <div className="flex flex-col h-full w-9/12 mr-8">
          <form onSubmit={onSubmit} className="mb-8 flex flex-col items-start">
            <label htmlFor="" className="mb-4">Search by postcode :</label>
            <input type="text"
              className="border border-gray-200 rounded-lg py-3 w-full px-6 focus:outline-none"
              name="postcode"
              id="search"
              ref={register}
              placeholder="eg: TX123" />
          </form>

          {
            dataUser.map((data, index) => (
              <Card
                key={index.toString()}
                name={data.name}
                email={data.email}
                phone={data.phone}
                onClick={() => setSelectedUser(data)}
              />
            ))
          }


        </div>

        {
          (selectedUser !== null) &&
          <DetailCard
            name={selectedUser.name}
            email={selectedUser.email}
            phone={selectedUser.phone}
            country={selectedUser.country}
            first_address={selectedUser.first_address}
            second_address={selectedUser.second_address}
            town={selectedUser.town}
            post_code={selectedUser?.postcode}
          />
        }

      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(!modalOpen)}
        contentLabel="Example Modal"
        className="absolute modal bg-white rounded-lg focus:outline-none w-10/12 md:w-4/12"
        overlayClassName="bg-overlay"
        ariaHideApp={false}
      >
        <div className="flex flex-col px-10 py-8">
          <h2 className="font-bold text-xl text-gray-600">Add People</h2>
          <hr className="mt-6 mb-4" />

          <RadioButton
            label1="Manual Entry"
            label2="Lookup by Postcode"
            state={mode}
            onChangeLabel1={(e: React.FormEvent<HTMLInputElement>) => setMode(e.currentTarget.value)}
            onChangeLabel2={(e: React.FormEvent<HTMLInputElement>) => setMode(e.currentTarget.value)}
          />

          <span className="h-6 text-red-500 text-sm text-normal italic font-normal">{mode === 'autocomplete' ? error : ''}</span>

          {
            (mode === "autocomplete") ?
              <Form
                state={[form, setForm]}
                inputs={inputs_autocomplete}
                onCancel={() => setModalOpen(!modalOpen)}
                onSubmit={(e) => onSubmitAdd(e)}
              />
              :
              <Form
                state={[form, setForm]}
                inputs={inputs}
                onCancel={() => setModalOpen(!modalOpen)}
                onSubmit={(e) => onSubmitAdd(e)}
                autocomplete={false}
              />
          }

        </div>
      </Modal>
    </div >
  );
}

export default App;
