export function Checkbox({ label }: {label: string}) {
    return (
        <div className="check-selector">
            <input type="checkbox" className="filter-option"/> <label>{label}</label>
        </div>
    ) 
}