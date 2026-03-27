import { ReactNode } from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

type masonryProps = {
    children: ReactNode;
}

export function MasonryLayout({ children }: masonryProps) {
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{300: 1, 
                                    475: 2,
                                    900: 3,
                                    1200: 4,
                                    1500: 5,
                                    1800: 6,
                                    2100: 7,
                                    2400: 8,
                                    2700: 9,
                                    3000: 10}}>
            <Masonry>
                {children}
            </Masonry>
        </ResponsiveMasonry>     
    )
}