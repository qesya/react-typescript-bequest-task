import React, { useEffect, useState } from 'react';
import './App.css';

import { useForm } from "react-hook-form";
import Card from './components/card';
import Modal from 'react-modal';

import { FormData } from './types/formdata';
import { Country } from './types/country';

import dummy from './utils/dummy';
import getCountry from './api/getcountry';

function App() {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [listcountry, setListCountry] = useState<Country[]>([]);

  useEffect(() => {
    getCountry()
      .then((res) => {
        setListCountry(res.data);
      })
  }, [])

  const onSubmit = handleSubmit(({ postcode }) => {
    console.log(postcode);
  });

  const onSubmitAdd = handleSubmit(({ name, phone, email, town, country }) => {
    console.log(`${name} ${phone} ${email} ${town} ${country}`)
  });

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
            dummy.map((data, index) => (
              <Card
                key={index.toString()}
                name={data.name}
                email={data.email}
                phone={data.phone}
                job={data.job}
              />
            ))
          }


        </div>

        <div className="flex p-4 bg-red-100 w-3/12 rounded-lg mt-10">
          <div className="flex flex-col justify-center w-full">
            <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-12 mt-4"></div>

            <p>Rizky Bayu Oktavian</p>
            <p>Frontend & UI UX Designer</p>
          </div>
        </div>
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
          <hr className="mt-6 mb-10" />

          <form onSubmit={onSubmitAdd} className="flex flex-col">

            <div className="flex">
              <div className="flex flex-col w-full mr-6">
                <label htmlFor="" className="mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  ref={register({
                    required: true
                  })}
                  className="w-full py-3 px-6 border border-gray-200 rounded-lg mb-4 focus:outline-none"
                  placeholder="Eg: Johny"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="" className="mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  ref={register({
                    required: true
                  })}
                  className="w-full py-3 px-6 border border-gray-200 rounded-lg mb-4 focus:outline-none"
                  placeholder="Eg: +44 123 4455"
                />
              </div>
            </div>

            <div className="flex">
              <div className="flex flex-col w-full mr-6">
                <label htmlFor="" className="mb-2">Email</label>
                <input
                  type="text"
                  name="email"
                  ref={register({
                    required: true
                  })}
                  className="w-full py-3 px-6 border border-gray-200 rounded-lg mb-4 focus:outline-none"
                  placeholder="Eg: johny@gmail.com"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="" className="mb-2">Postcode</label>
                <input
                  type="text"
                  name="postcode"
                  ref={register({
                    required: true
                  })}
                  className="w-full py-3 px-6 border border-gray-200 rounded-lg mb-4 focus:outline-none"
                  placeholder="Eg: johny@gmail.com"
                />
              </div>
            </div>

            <label htmlFor="" className="mb-2">First Address Line</label>
            <input
              type="text"
              name="first_address"
              ref={register({
                required: true
              })}
              className="w-full py-3 px-6 border border-gray-200 rounded-lg mb-4 focus:outline-none"
              placeholder="Eg: johny@gmail.com"
            />

            <label htmlFor="" className="mb-2">Second Address Line</label>
            <input
              type="text"
              name="second_address"
              ref={register({
                required: true
              })}
              className="w-full py-3 px-6 border border-gray-200 rounded-lg mb-4 focus:outline-none"
              placeholder="Eg: Tw Associates"
            />


            <label htmlFor="" className="mb-2">Town</label>
            <input
              type="text"
              name="town"
              ref={register({
                required: true
              })}
              className="w-full py-3 px-6 border border-gray-200 rounded-lg mb-4 focus:outline-none"
              placeholder="Eg: Tw Associates"
            />

            <label htmlFor="" className="mb-2">Country</label>
            <select
              name="country"
              ref={register({
                required: true
              })}
              defaultValue={'DEFAULT'}
              className="w-full py-3 px-6 border border-gray-200 rounded-lg mb-4 focus:outline-none"
            >
              <option value={'DEFAULT'} disabled>-- select country --</option>
              {
                Object.values(listcountry).map((data, index) => (
                  <option value={data.country} key={index.toString()}>{data.country}</option>
                ))
              }
            </select>

            <div className="flex self-end">
              <button
                onClick={() => setModalOpen(!modalOpen)}
                className="py-3 px-8 bg-gray-200 rounded-lg text-gray-700 font-bold mt-4 mr-4"
                type="submit">
                Cancel
              </button>

              <button
                className="py-3 px-8 bg-green-400 rounded-lg text-white font-bold mt-4"
                type="submit">
                Submit
            </button>
            </div>
          </form>
        </div>
      </Modal>
    </div >
  );
}

export default App;
