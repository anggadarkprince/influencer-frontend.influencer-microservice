import React, {useEffect, useState} from 'react';
import Wrapper from "./Wrapper";
import axios from 'axios';
import {Ranking} from "../classes/Ranking";

const Rankings = () => {
    const [rankings, setRankings]: [Ranking[], any] = useState([]);

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('rankings');

                const data = [];
                for (const property in response.data) {
                    if (response.data.hasOwnProperty(property)) {
                        data.push({
                            name: property,
                            revenue: response.data[property]
                        });
                    }
                }
                setRankings(data);
            }
        )();
    }, []);

    return (
        <Wrapper>
            <div className="album py-5 bg-light">
                <div className="container">
                    <h1 className="h3">Influencer Rankings</h1>
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
                            {rankings.map((ranking: Ranking, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{ranking.name}</td>
                                        <td>{ranking.revenue}</td>
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

export default Rankings;