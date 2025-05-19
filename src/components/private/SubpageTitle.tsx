
interface Props { 
    title: string; 
    description?: string; 
    className?: string 
    children?: React.ReactNode
}

export default function SubpageTitle({ title, className, children }: Props) {
    return(
        <div className={`${className} flex items-center justify-between gap-4`}>
            <div className="flex flex-col">
                <span className="font-light leading-none">Administración</span>
                <h1 className="text-[32px] leading-tight font-bold font-raleway">{title}</h1>
            </div>
            {children}
        </div>
    )
}