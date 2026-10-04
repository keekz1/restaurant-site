import info from "@/data/restaurant.json";

type BrandProps = {
    iconClass?: string;
    className?: string;
};

export default function Brand({ iconClass = "h-10 w-10", className = "" }: BrandProps) {
    return (
        <span className={`inline-flex items-center gap-3 ${className}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={info.logo} alt="" className={`${iconClass} object-contain`} />
            <span>{info.name}</span>
        </span>
    );
}