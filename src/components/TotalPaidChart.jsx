import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import RefreshIcon from '@material-ui/icons/Refresh';
import { DatePicker, Space } from 'antd';


import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import Title from './Title';
import Grid from '@material-ui/core/Grid';
import {
    Button,
    Container,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { round } from 'lodash'
import { useSelector } from 'react-redux';
import { endpoint } from '../config/endpoints';
import { axiosRequest } from '../http/axiosRequest';
import dayjs from 'dayjs';


const useStyles = makeStyles((theme) => ({
    tooltip: {
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.25)',
        padding: theme.spacing(1.5),
    },
    tooltipHeader: {
        marginBottom: theme.spacing(0.5),
        fontWeight: 500,
    },
    tooltipText: {
        color: theme.palette.primary.main,
    },
    btbs: {
        marginBottom: 'unset',
    },
    [theme.breakpoints.down('xs')]: {
        btbs: {
            marginBottom: '20px',
        },
    },
}));

function formattedDate(d = new Date()) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
}

function createData(principal, semesters = 2) {
    // The semesters for the dashed line
    const extraSemesters = 3 + semesters * 0.25;

    const data = [{ euro: principal, date: formattedDate() }];
    const prevDate = new Date();
    let Data;
    const db = principal;
    for (let i = 0; i < semesters; i++) {
        prevDate.setMonth(prevDate.getMonth() + 6);
        let amount = data[i].euro + db * (1 * 0.3);
        Data = round(principal, 2);

        if (i >= semesters - 1) {
            data.push({
                euro: round(amount, 2),
                data: round(principal, 2),
                futureEuro: round(amount, 2),
                date: formattedDate(prevDate),
            });
        } else {
            data.push({
                euro: round(amount, 2),
                data: round(principal, 2),
                date: formattedDate(prevDate),
            });
        }
    }

    //=========================Compund interest logic =====================//
    for (let j = 0; j < extraSemesters; j++) {
        prevDate.setMonth(prevDate.getMonth() + 6);
        const amount =
            data[data.length - 1].futureEuro +
            data[data.length - 1].futureEuro * (1 * 0.3);

        data.push({
            futureEuro: round(amount, 2),
            date: formattedDate(prevDate),
        });
    }

    //=========================Compund interest logic end =====================//

    // for (let j = 0; j < extraSemesters; j++) {
    //   prevDate.setMonth(prevDate.getMonth() + 6);

    //   //
    //   //
    //   const amount =
    //     data[data.length - 1].futureEuro + db * (1 * 0.3);
    //   //
    //   //
    //   data.push({
    //     futureEuro: round(amount, 2),
    //     date: formattedDate(prevDate),
    //   });
    // }
    return data;
}

const CustomTooltip = ({ active, payload, label }) => {
    const classes = useStyles();

    if (active && payload && payload.length) {
        return (
            <div className={classes.tooltip}>
                <Typography variant="subtitle1" className={classes.tooltipHeader}>
                    {label}
                </Typography>
                <Typography
                    variant="body1"
                    className={classes.tooltipText}
                >{`€${payload[0].value}`}</Typography>
            </div>
        );
    }

    return null;
};

export default function TotalPaidChart() {
    const { t } = useTranslation();

    const theme = useTheme();

    const [years, setYears] = useState(2);
    const [currentChartYear, setCurrentChartYear] = useState(2);

    const [principal, setPrincipal] = useState(1000);

    const [data, setData] = useState([]);

    const classes = useStyles();

    const updateChart = () => {
        let newData = createData(principal, years * 2);

        setData(newData);
        setCurrentChartYear(years);
    };

    const handlePrincipalChange = (event) => {
        const value = event.target.value?.replace(/\+|-/gi, '');

        if (value.length) {
            const number = parseFloat(value);
            setPrincipal(number);

        }
    };

    useEffect(() => {
        let defaultData = createData(principal, years * 2);
        setData(defaultData);
    }, []);

    const profitLabel = () => {
        if (data.length > 0) {
            return data[currentChartYear * 2].euro;
        }

        return '0';
    };
    const dataTest = [
        { name: 'Jan', investment: 4000,  },
        { name: 'Feb', investment: 7000 },
        { name: 'Mar', investment: 3000 },
        { name: 'Apr', investment: 9000 },
        { name: 'May', investment: 6000 },
        { name: 'Jun', investment: 8000 },
        { name: 'Jul', investment: 10000 },
        { name: 'Aug', investment: 5000 },
        { name: 'Sep', investment: 7500 },
        { name: 'Oct', investment: 8500 },
        { name: 'Nov', investment: 4000 },
        { name: 'Dec', investment: 9500 },
    ];

    const [totalPaidYear, setTotalPaidYear] = useState(dayjs());
    const [dataset, setdata] = useState([])
    const { contract } = useSelector((state) => state.global)
    const getData = async () => {
        const { data } = await axiosRequest.post(endpoint.chart.getTotalPaid, {
            year: totalPaidYear, contract
        })
        console.log(data);
        const formattedData = data?.map((curElem) => ({

            name: dayjs(curElem?.month).format('MMM'),
            totalPaid: curElem?.totalPaid
        }))

        console.log(formattedData);
        setdata(formattedData)
    }

    useEffect(() => {
        getData()
    }, [contract, totalPaidYear])
    return (
        <React.Fragment>
            <div style={{
                display: 'flex',

    // justifyContent: 'space-between'
            }}>

            <Title>
                {t('Payments_trend')}
           
                </Title>
                <span style={{
                    marginLeft: '20px'
                }}>
                  
                    <DatePicker defaultValue={totalPaidYear} onChange={(date) => setTotalPaidYear(date)} picker="year" />
                </span>
            </div>

            <ResponsiveContainer height={300}>
                <LineChart
                    data={dataset}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        stroke={theme.palette.text.secondary}

                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}

                    />
                    <Tooltip
                        content={<CustomTooltip />}
                    />

                    <Line type="monotone" dataKey="totalPaid" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

        </React.Fragment>
    );
}


// Create a year picker select box using @material-ui