const MapFields = ({dataFieldMapping, setDataFieldMapping, headers, setDateFormat} : any) => {
    const fields = ["none", "dataSourceId", "timestamp", "metrics"]

    const handleSelect = (event:any, header:string) => {
        const value = event.target.value;
        if (value === "dataSourceId") {
            setDataFieldMapping({...dataFieldMapping, dataSourceId: header});
        }

        if (value === "timestamp") {
            setDataFieldMapping({...dataFieldMapping, timestamp: header});
        }

        if (value === "metrics") {
            setDataFieldMapping({...dataFieldMapping, metrics: [...dataFieldMapping.metrics, header]});
        }
    }
    return (
        <div>
            <h1>MapFields</h1>
            <div>
                {headers.map((header : any) => {
                    return (
                        <div key={header}>
                            <label>{header}</label>
                            <select onChange={(e) => {handleSelect(e, header)}}>
                                {fields.map((field : any) => {
                                    return (
                                        <option key={field} value={field}>{field}</option>
                                    );
                                })}
                            </select>
                        </div>
                    );
                })
                }
            </div>
            <input
                type="input"
                name="date-format"
                placeholder="Date Time Format eg. YYYY-MM-DD"
                onChange={(e) => {setDateFormat(e.target.value)}}
            />
        </div>
    );
}

export default MapFields;
