import { pool } from '../database.js';
import { Readable } from 'stream';
import csv from 'csv-parser';



const uploadController = async (req, res) => {
  try {
    const results = [];
    const dataToInsert = [];


    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No se proporcionó ningún archivo' });
    }

    const fileBuffer = req.file.buffer;
    const bufferString = fileBuffer.toString();
    const stream = Readable.from([bufferString]);

    stream
      .pipe(csv())
      .on('data', (data) => {
        dataToInsert.push(data);
        results.push(data);
      })
      .on('end', async () => {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          for (const data of dataToInsert) {
            const insertQuery = `
              INSERT INTO upload (Subject_id, Target, GENDER, AGE, SMOKING, YELLOW_FINGERS, ANXIETY, PEER_PRESSURE, CHRONIC_DISEASE, FATIGUE_, ALLERGY_, WHEEZING, ALCOHOL_CONSUMING, COUGHING, BREATH_SHORTNESS, SWALLOWING_DIFFICULTY, CHEST_PAIN)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            `;
            const values = [
              data.Subject_id,
              data.Target,
              data.GENDER,
              data.AGE,
              data.SMOKING,
              data.YELLOW_FINGERS,
              data.ANXIETY,
              data.PEER_PRESSURE,
              data.CHRONIC_DISEASE,
              data.FATIGUE_,
              data.ALLERGY_,
              data.WHEEZING,
              data.ALCOHOL_CONSUMING,
              data.COUGHING,
              data.BREATH_SHORTNESS,
              data.SWALLOWING_DIFFICULTY,
              data.CHEST_PAIN,
            ];
          
            await client.query(insertQuery, values);
          }
          await client.query('COMMIT');
        } catch (error) {
          await client.query('ROLLBACK');
          console.error(error);
          return res.status(500).json({ success: false, message: 'Error al ejecutar la transacción de base de datos', error: error.message });
        } finally {
          client.release();
        }

        console.log(results);
        res.json({ success: true, message: 'Archivo CSV leído exitosamente', data: results });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al leer el archivo CSV', error: error.message });
  }
};




const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM upload');
        console.log(result.rows);
        return res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al obtener los datos', error: error.message });
    }
};




const getOne = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM upload WHERE subject_id = $1', [
            req.params.id,
        ]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al obtener la tarea única', error: error.message });
    }
};





const updateUpload = async (req, res) => {
    try {
        const { Target, GENDER, AGE, SMOKING, YELLOW_FINGERS, ANXIETY, PEER_PRESSURE, CHRONIC_DISEASE, FATIGUE_, ALLERGY_, WHEEZING, ALCOHOL_CONSUMING, COUGHING, BREATH_SHORTNESS, SWALLOWING_DIFFICULTY, CHEST_PAIN } = req.body;

        const result = await pool.query(`
            UPDATE upload
            SET Target = $1,
                GENDER = $2,
                AGE = $3,
                SMOKING = $4,
                YELLOW_FINGERS = $5,
                ANXIETY = $6,
                PEER_PRESSURE = $7,
                CHRONIC_DISEASE = $8,
                FATIGUE_ = $9,
                ALLERGY_ = $10,
                WHEEZING = $11,
                ALCOHOL_CONSUMING = $12,
                COUGHING = $13,
                BREATH_SHORTNESS = $14,
                SWALLOWING_DIFFICULTY = $15,
                CHEST_PAIN = $16
            WHERE subject_id = $17
        `, [Target, GENDER, AGE, SMOKING, YELLOW_FINGERS, ANXIETY, PEER_PRESSURE, CHRONIC_DISEASE, FATIGUE_, ALLERGY_, WHEEZING, ALCOHOL_CONSUMING, COUGHING, BREATH_SHORTNESS, SWALLOWING_DIFFICULTY, CHEST_PAIN, req.params.id]);

        return res.json({ success: true, message: 'Archivo modificado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al modificar el archivo', error: error.message });
    }
};


const deleteUpload = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM upload WHERE subject_id = $1', [
            req.params.id,
        ]);
        return res.json({ success: true, message: 'Archivo eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al eliminar el archivo', error: error.message });
    }
};

const deleteAll = async (req, res) => {
  try {
      
      await pool.query('DELETE FROM upload');
      return res.json({ success: true, message: 'Todos los registros eliminados exitosamente' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error al eliminar todos los registros', error: error.message });
  }
};

export  {uploadController,deleteUpload,getAll,getOne,updateUpload,deleteAll }
