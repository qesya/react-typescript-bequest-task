import React from 'react';
import Input from '../Input';


interface FormTypes {
    inputs: object[],
    state: any,
    autocomplete ?: boolean,
    onCancel: () => void,
    onSubmit: (e: React.FormEvent) => void
}

const Form: React.FunctionComponent<FormTypes> = React.memo(({
    state,
    inputs,
    autocomplete = true,
    onCancel,
    onSubmit, }) => {

    const [form, setForm] = state

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm((oldState: Object) => ({ ...oldState, [e.target.name]: e.target.value }))

    let inputFloor: any = []
    inputs.map(x => {
        if (!Array.isArray(x)) {
            inputFloor = [...inputFloor, x]
        } else {            
            inputFloor = [...inputFloor, ...x]
        }
    })

    const disabled = inputFloor.filter((x: any) => x?.required && (form[x.name] === '' || form[x.name] === null)).length > 0

    return (
        <form onSubmit={onSubmit} className="flex flex-col">
            {inputs.map((x: any, i: number) => (
                Array.isArray(x) ?
                    <div key={i} className="flex space-x-6">
                        {x.map((y: any, ii: number) => (
                            <div key={ii} className="relative w-full">
                                <Input value={form[y.name]} onChange={onChange} {...y} />
                                {autocomplete &&
                                    <>
                                        {y.autocomplete?.list && y.autocomplete?.list.length > 0 &&
                                            <div className="absolute py-4 bg-white -mt-4 shadow-lg w-full rounded-b-lg max-h-80 overflow-y-auto z-10">
                                                {y.autocomplete.list && y.autocomplete.list.map((data: any, index: number) => (
                                                    <p key={index} className="cursor-pointer hover:bg-gray-100 p-2" onClick={() => {
                                                        y.autocomplete.onClick(data, index)
                                                        y.autocomplete.setList(null);
                                                    }
                                                    }>{data[y.autocomplete.label]}</p>
                                                ))}
                                            </div>}
                                    </>
                                }
                            </div>
                        ))}
                    </div> :
                    <div key={i} className="relative w-full">
                        <Input value={form[x.name]} onChange={onChange} {...x} />
                        {x.autocomplete?.list && x.autocomplete?.list.length > 0 &&
                            <div className="absolute py-4 bg-white -mt-4 shadow-lg w-full rounded-b-lg max-h-80 overflow-y-auto z-10">
                                {x.autocomplete.list && x.autocomplete.list.map((data: any, index: number) => (
                                    <p key={index} className="cursor-pointer hover:bg-gray-100 p-2" onClick={() => {
                                        x.autocomplete.onClick(data, index)
                                        x.autocomplete.setList(null);
                                    }
                                    }>{data[x.autocomplete.label]}</p>
                                ))}
                            </div>}
                    </div>
            ))}

            <div className="flex self-end">
                <button
                    onClick={onCancel}
                    className="py-3 px-8 bg-gray-200 rounded-lg text-gray-700 font-bold mt-4 mr-4 focus:outline-none"
                    type="submit">
                    Cancel
              </button>

                <button
                    className={`py-3 px-8 bg-green-400 rounded-lg text-white font-bold mt-4 focus:outline-none ${disabled ? "opacity-50" : ""}`}
                    disabled={disabled}
                    type="submit">
                    Submit
            </button>
            </div>
        </form>
    )
})

export default Form