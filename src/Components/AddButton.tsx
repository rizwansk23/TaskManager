import { Plus } from 'lucide-react'
import React from 'react'

const AddButton:React.FC<{text:string , Function : VoidFunction }> = ({text , Function}) => {
    return (
        <button
            className="border-border border-2 text-text-h rounded-xl px-4 py-2 active:scale-95 active:border-white ease-in-out flex items-center justify-center gap-2"
            onClick={Function}
        >
            <Plus size={20} strokeWidth={3} /> <h1 className='font-bold'>{text}</h1>
        </button>
    )
}

export default AddButton

