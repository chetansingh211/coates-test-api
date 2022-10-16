import fs from 'fs';

export class AbstractDatabase {
  filename: string;
  constructor(filename: string) {
    if(!filename) {
      throw new Error('Database filename is required');
    }
    this.filename = filename;

    try {
      fs.accessSync(this.filename)
    } catch (error) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async findAll() {
    // read all file content from the file
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: 'utf8',
    });

    const objRecords = JSON.parse(jsonRecords);
    return objRecords;
  }

  async findById(id: number) {
    // read one record from the file
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: 'utf8',
    });

    const objRecords = JSON.parse(jsonRecords);
    const record = objRecords.find((item: any) => item.id = id);
    return record;
  }

  async create(data: Record<string, any>) {
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: 'utf8',
    });

    const objRecords = JSON.parse(jsonRecords);
    data.id = await this.generateUniqueID(objRecords);

    objRecords.push(data);

    await fs.promises.writeFile(this.filename,
      JSON.stringify(objRecords, null, 2)
    );

    return data;
  }

  async delete(id: number) {
    // read one record from the file
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: 'utf8',
    });

    const objRecords = JSON.parse(jsonRecords);

    const newObject = objRecords.filter((obj: any) => {
      return obj.id !== id;
    });

    await fs.promises.writeFile(this.filename,
      JSON.stringify(newObject, null, 2)
    );
    return newObject;
  }

 async generateUniqueID(arrayObject: Record<string, any>[]) {
    let highestValue = Math.max(...arrayObject.map((o:any) => o.id));
    highestValue++;
    return highestValue;
 }
}

const Database = new AbstractDatabase('datastore.json');

export { Database };

