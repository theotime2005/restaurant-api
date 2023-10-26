function insert_into(tableName, relations, values) {
    let text = "INSERT INTO " + tableName + "(" + relations + ") VALUES (";
    for (let i = 0; i < values.length; i++) {
        text += "'" + values[i] + "'";
        if (i + 1 < values.length) {
            text += ",";
        }
    }
    text += ");";
    return text;
}

console.log(insert_into("Items", "name, description, price, id_category"), ["salade", "une salade", 6.5, 1]);