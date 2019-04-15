export interface Forecast {
    dt: number;
    main: {
        temp: number,
        pressure: number,
        humidity: number
    };
}
