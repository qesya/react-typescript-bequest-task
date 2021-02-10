import React, { FC } from 'react'

interface Props {
    label1: string,
    label2: string,
    state: string,
    onChangeLabel1: (e:React.FormEvent<HTMLInputElement>) => void,
    onChangeLabel2: (e:React.FormEvent<HTMLInputElement>) => void,
}

const index:FC<Props> =({
    label1,
    label2,
    state,
    onChangeLabel1,
    onChangeLabel2
}) => {
    return (
        <div className="flex items-center space-x-6 mb-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio"
                name="mode"
                value="manual"
                checked={state === "manual" ? true : false}
                onChange={onChangeLabel1}
              />
              <p className="text-md text-gray-500 ml-2">{label1}</p>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="mode"
                value="autocomplete"
                checked={state === "autocomplete" ? true : false}
                onChange={onChangeLabel2}
              />
              <p className="text-md text-gray-500 ml-2">{label2}</p>
            </label>
          </div>
    )
}

export default index
