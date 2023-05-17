import { Pool } from 'pg';
// SQL connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
const connectSQL = async (i: number, URI: string) => {
  try {
    const pool= new Pool({
      connectionString: URI,
    })
    const client = await pool.connect();
    client.release()
    return pool; 
  } catch (err) {
    console.log('Error connecting to SQL')
    return null;
   }
};

export default connectSQL;
