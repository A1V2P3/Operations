
const db=require('../db');

module.exports. getAllProduct=async () =>{
    const [record]=await db.query("SELECT * FROM product_table")
    return record;
}


module.exports. getAllProductById=async (pr_id) =>{
    const [record]=await db.query("SELECT * FROM product_table WHERE pr_id = ?",[pr_id])
    return record;
}

module.exports. deleteProduct=async (pr_id) =>{
    const [{affectedRows}]=await db.query("DELETE FROM product_table WHERE pr_id = ?",[pr_id])
    return affectedRows;
}


module.exports. addOrEditProduct=async (obj) =>{
    const [{affectedRows}]=await db.query(" CALL usp_product_add_or_edit(?,?,?,?)",
    [obj.pr_id,obj.pr_name,obj.Cat_id,obj.Cat_name])
    return affectedRows;
}

module.exports. addOrEditProduct=async (obj,pr_id=0) =>{
    const [{data}]=await db.query(" CALL usp_product_add_or_edit(?,?,?,?)",[obj.pr_id,obj.pr_name,obj.Cat_id,obj.Cat_name])
    return data;
}

