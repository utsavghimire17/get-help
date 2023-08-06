import Radar from "radar-sdk-js";

const geoLocationApi = async () => {
    await Radar.initialize("prj_test_pk_3295ef805cc2dd50d26b3fe06896dd5960cc6f08");
    
    try {
        const location = await new Promise( (resolve, reject) => {
            Radar.ipGeocode((err, result) => {
                if (err) {
                    console.log(err);
                    reject(new Error("Failed to get location"));
                } else {
                    resolve(result)
                }
            });
        });
        return location.address;

    } catch (err) {
        console.log(err);
        alert(err.message);
    }
}

export default geoLocationApi;