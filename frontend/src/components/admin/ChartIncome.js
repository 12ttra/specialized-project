import Chart from "../../components/admin/Chart";
import { useEffect, useMemo, useState } from "react";
import axios from 'axios';


export default function ChartIncome() {
    const [userStats, setUserStats] = useState([]);


    const MONTHS = useMemo(
        () => [
            "January",
            "February",
            "March",
            "Arpil",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        []
    );


    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get('/api/v1/admin/orders/income')
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Revenue": item.total },
                    ])
                );

            } catch { }
        };
        getStats();
    }, [MONTHS]);

    return (
        <div>
            <Chart
                data={userStats}
                title="Renueve per Month"
                grid
                dataKey="Revenue"
            />
        </div>
    );
}