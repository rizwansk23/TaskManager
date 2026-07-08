import { Plus,} from 'lucide-react'
import React from 'react'

const AddButton:React.FC<{text:string , Function : VoidFunction , icon ?: React.ReactNode }> = ({text , Function , icon = <Plus size={20} strokeWidth={3} />   }) => {
    return (
        <button
            className="border-border border-2 cursor-pointer text-text-h rounded-xl px-4 py-2 active:scale-95 active:border-white hover:border-gray-600 ease-in-out flex items-center justify-center gap-2"
            onClick={Function}
        >
             {icon } <h1 className='font-bold'>{text}</h1>
        </button>
    )
}

export default AddButton

