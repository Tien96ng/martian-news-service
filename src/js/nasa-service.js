export default class NasaService {
    static async aPod() { // async apod()
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`);
            if(!response.ok) {
                throw Error(response);
            }
            return response.json();
        } catch(error) {
            return error.message;
        }
    }

    static async getMarsWeather() {
        try {
            const response = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`);
            if(!response.ok) {
                throw Error(response);
            }
            return response.json();
        } catch(error) {
            return error.message;
        }
    }

    static async getMarsRoverPictures(earthDate) {
        try {
            const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=${process.env.API_KEY}&page=10`);
            if(!response.ok) {
                throw Error(response);
            }
            return response.json();
        } catch(error) {
            return error.message;
        }
    }
}