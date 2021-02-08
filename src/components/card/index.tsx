import React,
{ FC } from 'react'

interface Props{
    name: string;
    job: string;
    phone: string;
    email: string
}

const Card:FC<Props> = ({
    name,
    job,
    phone,
    email,
}) => {
    return (
        <div className="flex p-4 w-full border border-gray-200 rounded-lg justify-between items-center mb-4">
            <div className="flex">
                <div className="w-12 h-12 bg-yellow-300 rounded-lg mr-4 items-center justify-center font-bold text-white flex">
                    {name.charAt(0)}
                </div>
                <div className="flex flex-col items-start">
                    <p className="font-bold">{name}</p>
                    <p className="text-gray-400">{job}</p>
                </div>
            </div>

            <p className="font-bold">{phone}</p>

            <p className="text-gray-700">{email}</p>
        </div>
    )
}

export default Card;
