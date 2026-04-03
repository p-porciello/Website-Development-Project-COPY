interface Props {
    bgcolor: string;
}

export const Footer = ({ bgcolor }: Props) => {
    return (
    <div className="footer" style={{backgroundColor: bgcolor}}>
            <h2>UCVTS Lost & Found</h2>
            <p>A website developed by Paige Porciello and Caitlin Sayah.</p>
            <p>All icons from Font Awesome, all images taken by Paige and Caitlin.</p>

        </div>
    )
}