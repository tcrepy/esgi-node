const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {

    console.log(process.env.MONGODB_USER, process.env.MONGODB_PASS, process.env.MONGODB_DBNAME)
    connection = await mongoose.connect('mongodb://mongo', {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
      dbName: process.env.MONGODB_DBNAME,
      useNewUrlParser: true
    });
    db = await connection.db(process.env.MONGODB_DBNAME);

    //connection = await MongoClient.connect("mongodb://localhost:27017/", {
    //  useNewUrlParser: true,
    //});
    //db = await connection.db("SampleCollection");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);

    const deletedUser = await users.remove({_id: 'some-user-id'});
    expect(deletedUser).toBeDefined();
  });
});
