import Link from 'next/link'
import React from 'react'

const SidebarItem = ({href, Icon, active, label}) => {
  return (
    <div>
    {active ? (
            <Link
            href={href} 
            className='
              flex 
              flex-row 
              h-auto 
              items-center 
              w-full 
              gap-x-4 
              text-md 
              font-medium
              cursor-pointer
              hover:text-white
              transition
              py-1
              text-white
              '
          >
            <Icon size={26} />
            <p className="truncate w-100">{label}</p>
          </Link>
    ):(
        <Link
        href={href} 
        className='
          flex 
          flex-row 
          h-auto 
          items-center 
          w-full 
          gap-x-4 
          text-md 
          font-medium
          cursor-pointer
          hover:text-white
          transition
          text-neutral-400
          py-1
          '
      >
        <Icon size={26} />
        <p className="truncate w-100">{label}</p>
      </Link>
    )}

    </div>
  )
}

export default SidebarItem;