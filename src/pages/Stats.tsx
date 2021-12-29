import React, {useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import axios from 'axios';
import constants from "../constants";

const Stats = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('stats');

                setStats(response.data);
            }
        )();
    }, []);

    return (
        <Wrapper>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Revenue</th>
                            </tr>
                            </thead>
                            <tbody>
                            {stats.length === 0 && <tr><td colSpan={3}>No data available</td></tr>}
                            {stats.map((stat: { code: string, revenue: number }, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{`${constants.CHECKOUT_URL}/${stat.code}`}</td>
                                        <td>{stat.code}</td>
                                        <td>{stat.revenue}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Stats;