// const getIndicatorsForCountry = async (country: string | string[]) => {
//     try {
//       await te.login("bdc47ca7d4134d0:s9ec8qqlsd8rp9t");
  
//       // Get an indicators list by country/countries, you can pass group to get more specific data
//       const data = await te.getIndicatorData((country = [`${country}`]));
  
//       console.log("ffffffffffffffffffffffffffffff", data);
//     } catch (e) {
//       console.log(`Error: ${e}`);
//     }
//   };

export async function GET(req){
const body = req.body;
console.log(body)

    return new Response('')
}