'use client'

import Close from '@/assets/closing-window.svg'
import { cx } from 'class-variance-authority'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ReactElement, useState } from 'react'

export default function Window({ 
    title, children, size
}: { 
    title: string,
    children: ReactElement,
    size: { height: number, width: number }
}) {
    const [state, setState] = useState<boolean | "load">(true);
    const router = useRouter();

    function timeout() {
        setState('load');
        setTimeout(function () {
            setState(false);
            router.replace("/");
        }, 300)

    }

    if (!state) return;
    return (
            <div
                className={`bg-white border-4 border-black w-full pb-[37px] ${!state ? "hidden" : "visible"}`}
                style={{ height: size.height, maxWidth: size.width }}
            >
                <div className='relative w-full py-1 border-b-2 border-black'>
                    <div className='w-full handle'>
                        <hr className='h-[3px] my-[2px] bg-gray-800' />
                        <hr className='h-[3px] my-[2px] bg-gray-800' />
                        <hr className='h-[3px] my-[2px] bg-gray-800' />
                        <hr className='h-[3px] my-[2px] bg-gray-800' />
                        <hr className='h-[3px] my-[2px] bg-gray-800' />
                        <div className='absolute bg-white p-1 top-[2px] left-1/2 -translate-x-1/2 font-chicago'>
                            {title}
                        </div>
                        <div className='absolute bg-white p-1 top-[2px] left-4 cursor-default'>
                            <div
                                className='h-6 w-6 border-2 border-black'
                                onClick={() => timeout()}
                            >
                                <Image
                                    src={Close}
                                    alt=''
                                    className={cx(
                                        state != 'load' ? 'hidden' : 'visible',
                                        'bg-black',
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full overflow-auto">
                    {children}
                </div>
            </div>
    )
}
