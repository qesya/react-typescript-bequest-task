import React, { FC } from 'react'

interface Props {
    name: string;
    phone: string;
    email: string;
    town?: string;
    first_address?: string;
    second_address?: string;
    country?:string;
    post_code?:string;
}

const DetailCard: FC<Props> = ({
    name = '-',
    phone = '-',
    email = '-',
    town = '-',
    first_address = '-',
    second_address = '-',
    country = '-',
    post_code = '-',
}) => {
    return (
        <div className="flex p-4 bg-gray-50 w-3/12 rounded-lg mt-10 min-h-full">
            <div className="flex flex-col justify-center w-full px-10">
                <div className="w-24 h-24 bg-green-100 rounded-lg mx-auto mb-12 mt-4 items-center justify-center flex text-2xl">
                    {name.charAt(0).toUpperCase()}
                </div>

                <p className="font-bold mb-1 text-gray-600">{name}</p>
                <p className="text-gray-400">{email}</p>

                <hr className="my-8" />

                <div className="flex flex-col items-start mb-4">
                    <p className="text-gray-400">Phone :</p>
                    <p className="font-bold text-gray-600">{phone}</p>
                </div>

                <div className="flex flex-col items-start mb-4">
                    <p className="text-gray-400">Town :</p>
                    <p className="font-bold text-gray-600">{town}</p>
                </div>

                <div className="flex flex-col items-start mb-4">
                    <p className="text-gray-400">First Address :</p>
                    <p className="font-bold text-gray-600">{first_address}</p>
                </div>

                <div className="flex flex-col items-start mb-4">
                    <p className="text-gray-400">Second Address :</p>
                    <p className="font-bold text-gray-600">{second_address}</p>
                </div>

                <div className="flex flex-col items-start mb-4">
                    <p className="text-gray-400">Post Code :</p>
                    <p className="font-bold text-gray-600">{post_code}</p>
                </div>

                <div className="flex flex-col items-start mb-4">
                    <p className="text-gray-400">Country :</p>
                    <p className="font-bold text-gray-600">{country}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailCard;
