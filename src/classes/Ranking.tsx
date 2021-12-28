export class Ranking {
    name: string;
    revenue: number;

    constructor(name = '', revenue = 0) {
        this.name = name;
        this.revenue = revenue;
    }
}