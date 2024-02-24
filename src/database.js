import pg from 'pg'

export const pool=new pg.Pool({
    user: 'admin',
    host: 'postgresDB',
    database: 'develop',
    password: '123456789',
    port: 5432,
})

pool.on('connect',()=>{
    console.log("Database connected");
})
