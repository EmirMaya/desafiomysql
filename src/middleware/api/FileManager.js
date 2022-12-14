import fs from 'fs';
import __dirname from '../../utils.js';


export class Contenedor {
    constructor(nombreArchivo) {
        this.path = __dirname + '/database/' + nombreArchivo + '.json';
    }

    save = async (object) => {
        const data = await this.getAll();
        if (data.length) {
            const oProducto = await { ...object, id: data[data.length - 1].id + 1 };
            data.push(oProducto);
        } else {
            const oProducto = await { ...object, id: 1 };
            data.push(oProducto);
        }
        return await this.saveData(data)
    }
    getById = async (idNumber) => {
        const data = await this.getAll();
        return data.find((element) => element.id == idNumber);
    }
    getAll = async () => {
        return await this.getData();
    }
    deleteById = async (idNumber) => {
        const data = await this.getAll();
        const nuevoArray = data.filter(oProduto => oProduto.id != idNumber);
        await this.saveData(nuevoArray);
    }
    deleteAll = async () => {
        const arrayVacio = []
        await this.saveData(arrayVacio);
    }

    getCount = async () => {
        return data = await this.getAll().count();
    }


    getData = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(data)
            } else {
                return [];
            }
        }
        catch (e) {
            console.warn(`Fix : ${e}`)
            return [];
        }
    }
    saveData = async (data) => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'));
        }
        catch (e) {
            console.warn(`Fix : ${e}`)
        }
    }

    update = async (id, title, price, thumbnail) => {
        const data = await this.getAll();
        console.log('data: ', data)
        console.log('id: ', id)
        let item = data.find(producto => producto.id == id);


        console.log(item)
        if (item) {
            item.title = title;
            item.price = price;
            item.thumbnail = thumbnail;
        }
        let itemidex = data.findIndex(producto => parseInt(producto.id) === parseInt(item.id));
        console.log(itemidex)
        data.splice(itemidex, 1, item);
        console.log('NEW data: ', data)
        await this.deleteAll();
        await this.save(data);
    }
}