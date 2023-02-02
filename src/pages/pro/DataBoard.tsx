// @ts-nocheck
import {useLocation} from "react-router-dom";
import {css, StyleSheet} from "aphrodite";
import Button from "../../components/buttons/Button";
import themeVars from "../../util/themeVars";
import {Plus} from "phosphor-react";
import DataTable from 'react-data-table-component';
import {useEffect, useState} from "react";
import axios from "axios";
import {getPollutionDataApi} from "../../util/api/get-data-api";
import {getDataSourceAPi} from "../../util/api/get-datasources-api";
import {getNumRowsForASourceApi} from "../../util/api/get-num-rows-for-a-source";

const DataBoard = () => {

    // get id from last part of url
    const location = useLocation();
    const id = location.pathname.split("/").pop();


    // const data = [
    //     {
    //         id: 1,
    //         title: 'Beetlejuice',
    //         year: '1988',
    //     },
    //     {
    //         id: 2,
    //         title: 'Ghostbusters',
    //         year: '1984',
    //     },
    // ]


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState<number>(10000);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [columns, setColumns] = useState([
        {
            name: 'Time Stamp',
            selector: row => row.recordedAt,
            sortable: true,
        },

        {
            name: 'Type',
            selector: row => row.uploadedBy.type,
            sortable: true,
        },

        {
            name: 'Uploaded By',
            selector: row => row.uploadedBy.id,
        },

    ]);


    const fetchData = async (page, size= perPage) => {
        setLoading(true);
        // fetch data
        const data = await getPollutionDataApi(id, page, size);
        console.log("Line45: ",data.data);
        if (data.type === "success") {
            setData(data.data.data);
            console.log("Line 50: ",data.data.data)
        }
        setLoading(false);


    }

    const fetchTotalRows = async () => {
        setLoading(true);
        const totalRows = await getNumRowsForASourceApi(id);
        console.log("Line 50: ",totalRows)
        if (totalRows.type === "success") {
            setTotalRows(totalRows.data.numRows);
        }
        setLoading(false);
    }
    const fetchColumns = async () => {
        // get the data source
        setLoading(true);
        const dataSource = await getDataSourceAPi(id);
        console.log("Line 65: ",dataSource)
        const metrics = []
        if (dataSource.type === "success") {
            // check the metrics, whichever is true will be added to the columns
            dataSource.data.metrics.forEach(metric => {
                    metrics.push(metric)
            });
            console.log("Line 91: ",metrics)
        }
        const c = [
            {
                name: 'Time Recorded',
                selector: row => row.recordedAt,
                sortable: true,
            },

            {
                name: 'Type',
                selector: row => row.uploadedBy.type,
                sortable: true,
            },

            {
                name: 'Uploaded By',
                selector: row => row.uploadedBy.id,
            },

        ]

        metrics.forEach(metric => {
            c.push({
                name: metric,
                selector: row => row.data[metric] ? row.data[metric] : 'N/A',
                sortable: true,
            })
        })

        setColumns(c);
        setLoading(false);
    }




    useEffect(() => {
        fetchColumns()
        fetchTotalRows();
        fetchData(1);
    }
    , [])

    const handlePageChange = page => {
        fetchData(page);
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchData(page, newPerPage);
        setPerPage(newPerPage);
    };



    return (
        <div className={css(styles.boardDefault)}>
            <div className={css(styles.dsHeader)}>
                <Button
                    type={"short"}
                    color={themeVars.colors.accent.darkGreen}
                    onClick={() => {}}
                >
                    Add Data Manually
                    <Plus size={20} weight="bold" />
                </Button>
            </div>
            <div className={css(styles.dataCont)}>
                <DataTable
                    title="Recorded Data"
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    responsive={true}
                />

            </div>
            Data Board
        </div>
    )
}

export default DataBoard


const styles = StyleSheet.create(
    {
        boardDefault: {
            width: '100%',
            minHight: '100%',
            boxSizing: 'border-box',
        },

        dataSourceCont: {
            width: '100%',
            minHeight: '100%',
            boxSizing: 'border-box',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridGap: '1rem',
            padding: '0 3rem',

            gridAutoRows: 'minmax(32rem, 32rem)',

            '@media (max-width: 1600px)': {
                gridTemplateColumns: '1fr 1fr 1fr',
            },

            '@media (max-width: 1300px)': {
                gridTemplateColumns: '1fr 1fr',
            },

            '@media (max-width: 980px)': {
                gridTemplateColumns: '1fr',
            }
        },

        dsHeader: {
            width: '100%',
            padding: '2rem 6%',
            display: 'flex',
            justifyContent: 'flex-end',
            boxSizing: 'border-box',

        },

        dataCont: {

        }
    }
)
