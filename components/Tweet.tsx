import Image from "next/image"


import img from '../public/avatar.png'

export const Tweet = () => {
    return (
        <div className="w-full flex">
            <div className="p-2">
                <Image src={img} alt="avatar" width={100} height={100} className='rounded-full' />
            </div>
            <div className="p-2">
                <p className="flex">
                    <span className="mr-1 font-bold">Carlos M. González</span>
                    <span className="font-light">@cmglezpdev</span>
                </p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione doloremque praesentium ut laborum non, quod labore architecto perspiciatis necessitatibus nesciunt eligendi deleniti nostrum. Voluptates, suscipit? Labore necessitatibus numquam rem quam.</p>
            </div>
        </div>
    )
}
