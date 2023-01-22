interface IVerticalGapProps {
    gap: string;
}
const verticalGap = ({gap}:IVerticalGapProps) => {
    // add an element to give gap
    return (
        <div style={{height: gap}}/>
    )
}

export default verticalGap
