import React from 'react';


type InputTypes = {
    type: string
    value: string | number | readonly string[] | undefined
    label: string
    autocomplete: object
    onChange: () => void
    autoComplete: string
    autoCorrect: string
    props: string | number | boolean
}

const Input: React.MemoExoticComponent<React.FunctionComponent<InputTypes>> = React.memo(({ label, autocomplete, ...props }: InputTypes) => {

    return (
        <div className="flex flex-col w-full">
            <label htmlFor="" className="mb-2">{label}</label>
            <input
                className={`w-full py-3 px-6 border ${false ? 'border-red-500' : 'border-gray-200'} rounded-lg mb-4 focus:outline-none`}                
                {...props}  
                autoComplete="off"
                autoCorrect="none"              
            />
        </div>
    )
})

export default Input